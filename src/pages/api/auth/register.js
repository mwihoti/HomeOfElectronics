import nextConnect from 'next-connect';
import { connectToDatabase } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import UserModel from '@/models/UserModel';

const handler = nextConnect({
    onError(error, req, res) {
        console.error(error);
        res.status(501).json({ error: `Sorry, something happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: 'Method not allowed' });
    },
});

handler.post(async (req, res) => {
    const { firstname, lastname, username, email, password, password2 } = req.body;

    await connectToDatabase();

    try {
        // Check if the user already exists by email or username
        const userExists = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await UserModel.create({
            firstname,
            lastname,
            username,
            email,
            password,
            password2
        });

        if (user) {
            // Create a token for the user
          //  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          //      expiresIn: '30d',
       //     });

            // Return the user data and token
            return res.status(201).json({
                _id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Server error:', error); // Add this line for detailed error logging
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default handler;
