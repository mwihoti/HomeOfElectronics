import nextConnect from 'next-connect';
import { connectToDatabase } from '@/lib/mongodb';
import jwt from 'jsonwebtoken'
import UserModel from '@/models/UserModel';

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error);
        res.status(501).json({ error: `Sorry something happened ${error.message}` })
    },
    onNoMatch(req, res) {
        res.status(500).json({})
    }
})

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { username, password } = req.body;

    await connectToDatabase();

    try {
        const user = await user.findOne({ username })

        if (user && (await user.matchPassword(password))){
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }); 
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            token
        });
        } else {
            return res.status(401).json({message: 'Invalid username or password' })
        } }catch (error) {
            return res.status(500).json({message: 'Server Error'})

        }


}