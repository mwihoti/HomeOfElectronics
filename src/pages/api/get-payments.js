import Payment from '@/models/Payment';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const payments = await Payment.find();
      res.status(200).json({ success: true, payments });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch payments.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
