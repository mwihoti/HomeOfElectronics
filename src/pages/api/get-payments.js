import { connectToDatabase } from "@/lib/mongodb";

export default async function handler (req, res) {
    if (req.method === 'GET') {
        const {db} = await connectToDatabase();

    
    try {
        const payments = await db.collection('payments').find().toArray();
        res.status(200).json({ success: true, payments });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch payments.' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
}