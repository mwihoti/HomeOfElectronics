// Daraja base URL driven by DARAJA_ENV (sandbox | production)
function getBaseUrl() {
  return process.env.DARAJA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';
}

// Accept multiple env var naming conventions
function getCredentials() {
  const key =
    process.env.DARAJA_CONSUMER_KEY ||
    process.env.MPESA_CONSUMER_KEY ||
    process.env.MPESA_API_KEY;
  const secret =
    process.env.DARAJA_CONSUMER_SECRET ||
    process.env.MPESA_CONSUMER_SECRET ||
    process.env.MPESA_API_SECRET;
  return { key, secret };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { phone, amount, accountRef = 'HomeOfElectronics' } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ success: false, message: 'Phone and amount are required.' });
  }

  const { key: consumerKey, secret: consumerSecret } = getCredentials();

  if (!consumerKey || !consumerSecret) {
    return res.status(500).json({
      success: false,
      message:
        'Daraja credentials missing. Add DARAJA_CONSUMER_KEY and DARAJA_CONSUMER_SECRET to .env.local.',
    });
  }

  const baseUrl = getBaseUrl();
  const env = process.env.DARAJA_ENV || 'sandbox';
  console.log(`[Daraja ${env}] Initiating STK push → ${phone}, KES ${amount}`);

  try {
    // 1. OAuth token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await fetch(
      `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error('[Daraja] Token fetch failed:', tokenData);
      return res.status(502).json({
        success: false,
        message: 'Could not authenticate with Daraja. Verify your consumer key and secret.',
      });
    }

    // 2. STK push
    const shortCode = process.env.DARAJA_SHORTCODE || '174379';
    const passkey =
      process.env.DARAJA_PASSKEY ||
      'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
    const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');
    const callbackUrl =
      process.env.DARAJA_CALLBACK_URL ||
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://placeholder.ngrok.io'}/api/mpesa/callback`;

    const stkRes = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(Number(amount)),
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: accountRef,
        TransactionDesc: 'Payment for order',
      }),
    });

    const stkData = await stkRes.json();
    console.log(`[Daraja ${env}] STK response:`, stkData);

    if (stkData.ResponseCode === '0') {
      return res.status(200).json({
        success: true,
        checkoutRequestId: stkData.CheckoutRequestID,
        merchantRequestId: stkData.MerchantRequestID,
        message: stkData.CustomerMessage,
        env,
      });
    }

    return res.status(400).json({
      success: false,
      message: stkData.errorMessage || stkData.ResponseDescription || 'STK push failed.',
    });
  } catch (err) {
    console.error('[Daraja] STK push error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
}
