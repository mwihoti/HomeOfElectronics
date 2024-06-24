import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
       
    },
    lastname: {
        type: String,
        required: true,
       
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
    }

},
{ timestamps: true

});

UserModel.pre('save', async function(next) {
    if (!this.isModified('password')){
        next();

    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next ();



})

UserModel.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.models.User || mongoose.model('User', UserModel);


