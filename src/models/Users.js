import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    firstName: {
        type: String
    },
    telNumber: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true

    },
    images: {
      type: [String], // Array of base64 encoded strings
      required: true,
    },

})
export default mongoose.models.Users || mongoose.model('Users', userSchema);

