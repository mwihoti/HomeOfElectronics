import nextConnect from 'next-connect';
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
    const { firstname, lastname, username, email, password } = req.body;

    try {
        const userExists = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await UserModel.create({ firstname, lastname, username, email, password });

        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            return res.status(201).json({
                _id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token,
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default handler;
