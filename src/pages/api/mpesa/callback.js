import Payment from '@/models/Payment';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const body = req.body;
  console.log('Daraja callback:', JSON.stringify(body));

  const callback = body?.Body?.stkCallback;
  if (!callback) return res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });

  if (callback.ResultCode === 0) {
    const items = callback.CallbackMetadata?.Item || [];
    const get = (name) => items.find((i) => i.Name === name)?.Value;

    try {
      await Payment.create({
        account: String(get('PhoneNumber') || ''),
        api_ref: callback.MerchantRequestID,
        charges: 0,
        created_at: new Date(),
        currency: 'KES',
        host: 'safaricom',
        identitier: callback.CheckoutRequestID,
        meta: body,
        net_amount: get('Amount') || 0,
        provider: 'mpesa-daraja',
        state: 'COMPLETE',
        tracking_id: get('MpesaReceiptNumber') || '',
        updated_at: new Date(),
        value: get('Amount') || 0,
      });
    } catch (err) {
      console.error('Failed to store Daraja payment:', err);
    }
  }

  return res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
}
