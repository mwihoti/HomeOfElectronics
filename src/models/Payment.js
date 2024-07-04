import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    account: { type: String, required: true },
  api_ref: { type: String, required: false },
  charges: { type: Number, required: true },
  created_at: { type: Date, required: true },
  currency: { type: String, required: true },
  failed_code: { type: String, required: false },
  failed_reason: { type: String, required: false },
  host: { type: String, required: true },
  identitier: { type: String, required: true },
  meta: { type: Object, required: true },
  net_amount: { type: Number, required: true },
  provider: { type: String, required: true },
  state: { type: String, required: true },
  tracking_id: { type: String, required: true },
  updated_at: { type: Date, required: true },
  value: { type: Number, required: true },
}, { timestamps: true });


export default  mongoose.models.Payment || mongoose.model('Payment', paymentSchema)