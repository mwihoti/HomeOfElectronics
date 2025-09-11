import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Testing MongoDB connection...');
    const connection = await connectToDatabase();
    
    if (connection.readyState === 1) {
      return res.status(200).json({ 
        message: 'MongoDB connection successful',
        readyState: connection.readyState,
        host: connection.host,
        name: connection.name
      });
    } else {
      return res.status(500).json({ 
        message: 'MongoDB connection failed',
        readyState: connection.readyState 
      });
    }
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    const payload = { message: 'MongoDB connection failed' };
    if (process.env.NODE_ENV !== 'production') {
      payload.error = error?.message;
      payload.code = error?.code;
      payload.hostname = error?.hostname;
    }
    return res.status(500).json(payload);
  }
}
