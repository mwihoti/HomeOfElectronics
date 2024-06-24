import nextConnect from 'next-connect';
import { connectToDatabase } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import UserModel from '@/models/UserModel';

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
    const user = await UserModel.findOne({ username });
    
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id, username:user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });

      return res.status(200).json({
        _id: user._id,
        username: user.username,
        token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default apiRoute;
