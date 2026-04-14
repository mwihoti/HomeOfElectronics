import Payment from '@/models/Payment';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const payment = await Payment.create(req.body);
      res.status(200).json({ success: true, payment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to store payment.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
