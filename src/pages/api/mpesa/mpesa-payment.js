import axios from 'axios';

export default async function handler(req, res) {
    const { name, phone, location, totalPrice, cart } = req.body;

    const auth = Buffer.from(`${process.env.MPESA_API_KEY}:${process.env.MPESA_API_SECRET}`).toString('base64');

    try {
        // Get access token
        const tokenResponse = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });

        const accessToken = tokenResponse.data.access_token;

        // Current timestamp in the format required by M-Pesa
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, -3);
        const shortCode = '174379'; // Replace with your actual short code
        const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; // Replace with your actual passkey
        const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

        const paymentRequestPayload = {
            "BusinessShortCode": shortCode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": totalPrice,
            "PartyA": phone,
            "PartyB": shortCode,
            "PhoneNumber": phone,
            "CallBackURL": "https://a5a7-102-219-208-45.ngrok-free.app/callback", // Replace with your actual ngrok URL
            "AccountReference": "HomeOfElectronics", // Replace with your actual account reference
            "TransactionDesc": "Payment for order"
        };

        const paymentResponse = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', paymentRequestPayload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json({ paymentUrl: 'https://your-success-page-url.com' });
    } catch (error) {
        console.error('Payment Request Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: error.message });
    }
}
