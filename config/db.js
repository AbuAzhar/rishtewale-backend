import mongoose from "mongoose";
export const dbConnectivity=()=>{try{mongoose.connect(process.env.DB_URL),console.log("database Connected Successfull")}catch(o){console.log(o)}};