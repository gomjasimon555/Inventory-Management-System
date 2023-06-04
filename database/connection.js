//Requiring mongoose to connect with mongodb
const mongoose=require("mongoose");



const connectDatabase = async()=>{
    try{
        //process.env.CONNECTION_STRING is coming from .env
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected successfully for inventory management system")

    }
    catch(err){
        console.log(err)
    }
};
module.exports =connectDatabase;


