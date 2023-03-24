const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI)

mongoose.set('strictQuery', true);

mongoose.connection.on('connected',()=>{
    console.log("connected to mongoDB");
})
mongoose.connection.on('error',()=>{
    console.log("Failed to connect to mongoDB");
})