import nextConnect from 'next-connect';
import { connectToDatabase } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import UserModel from '@/models/UserModel';
import bcrypt from 'bcryptjs/dist/bcrypt';

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error(error);
    res.status(501).json({ error: `Sorry something happened: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: 'Method not allowed' });
  },
});

apiRoute.post(async (req, res) => {
  const { username, password } = req.body;

 

  try {
    await connectToDatabase();
    const user = await UserModel.findOne({ $or:[ 
   //   { email: email.toLowerCase()},
      { username: username.toLowerCase() }
    ]});
    if (!user) {
      return res.status(401).json({message: "User not found"})
    }

     const isMatch = await bcrypt.compare(password, user.password);
     if (isMatch) {
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });

      // set token in cookie from server side
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Strict`);
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid  password' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default apiRoute;
