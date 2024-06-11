import mongoose from "mongoose";

const MONGODB_URI = process.env.

if (!MONGODB_URI) {
    throw new Error(
        'Please define the mongdb uri variable'
    );
}

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null, promise:null
    }
}
async function connectToDatabase (){
    if(cached.conn) {
    return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands = false,
        }
    }

}