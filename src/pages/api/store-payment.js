import { connectToDatabase } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import mongoose from "mongoose";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
          await connectToDatabase();
          const paymentData = req.body;
          const payment = new Payment(paymentData);
          await payment.save();
          res.status(200).json({ success: true, payment });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: 'Failed to store payment.' });
        }
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    }