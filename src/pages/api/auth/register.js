import nextConnect from 'next-connect';
import { connectToDatabase } from '@/lib/mongodb';
import jwt from 'jsonwebtoken'
import UserModel from '@/models/UserModel';


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }


const {firstname, lastname, username, email, password} = req.body;

await connectToDatabase();
try {
    const UserExists = await User.findOne({firstname, email, username})
if (UserExists) {
    return res.status(400).json('User Already exists')
}

const user = await UserModel.create({
    firstname,
    lastname,
    username,
    email,
    password
});

if (user) {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    return res.status(201).json({
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        token
    });
} else {
    return res.status(400).json({message: 'Invalid user data'});

}
} catch (error) {
    return res.status(500).json({message: 'Server error'})
}

}

