import axios from 'axios';

export default async function handler(req, res) {
    const {name, phone, location, totalPrice, cart} = req.body;

    const auth = Buffer.from(`${process.env.MPESA_API_KEY}:${process.env.MPESA_API_SECRET}`).toString('base64');

    try {
      // Get access token
      const tokenResponse = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
          Authorization: `Basic ${auth}`
        }
      });

      const accessToken = tokenResponse.data.access_token;
      const paymentRequestPayload =  {
        // Your M-Pesa payment request payload goes here
        "BusinessShortCode": "your_business_shortcode",
        "Password": "your_encoded_password",
        "Timestamp": "your_timestamp",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": totalPrice,
        "PartyA": phone,
        "PartyB": "your_business_shortcode",
        "PhoneNumber": phone,
        "CallBackURL": "your_callback_url",
        "AccountReference": "account_reference",
        "TransactionDesc": "Payment for order"
      };
      const paymentResponse = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', paymentRequestPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'    
        }
      });
  
      res.status(200).json({ paymentUrl: 'https://your-success-page-url.com' });
    } catch (error) {
      res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: error.message });
    }
  }
