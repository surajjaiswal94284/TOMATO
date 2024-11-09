const mongoose=require("mongoose");

const connectDB=()=>{
    const dbURI = process.env.MONGODB_URI; 
     mongoose.connect(dbURI)
    .then(()=>console.log("Database connected"));
}

module.exports=connectDB;