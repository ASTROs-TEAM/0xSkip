import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL as string

const connecttodb = async() => {
    try{
        await mongoose.connect(MONGODB_URL);
        console.log('Connected to database');
    }catch(err){
        console.log(err);
    }
}

export default connecttodb;