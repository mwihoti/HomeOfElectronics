import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserModel = new mongoose.Schema({
    firstname: {
        name: String,
        required: true,
        unique: true
    },
    lastname: {
        name: String,
        required: true,
        unique: true
    },
    username: {
        name: String,
        required: true,
        unique: true
    },
    email: {
        name: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..}/, 'Please enter a valid email address']
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


