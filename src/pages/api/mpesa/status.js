function getBaseUrl() {
  return process.env.DARAJA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';
}

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

  const { checkoutRequestId } = req.body;
  if (!checkoutRequestId) {
    return res.status(400).json({ message: 'checkoutRequestId is required.' });
  }

  const { key: consumerKey, secret: consumerSecret } = getCredentials();
  const baseUrl = getBaseUrl();

  try {
    // Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await fetch(
      `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const { access_token } = await tokenRes.json();

    // STK Query
    const shortCode = process.env.DARAJA_SHORTCODE || '174379';
    const passkey =
      process.env.DARAJA_PASSKEY ||
      'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
    const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

    const queryRes = await fetch(`${baseUrl}/mpesa/stkpushquery/v1/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      }),
    });

    const data = await queryRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('[Daraja] Status query error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
}
