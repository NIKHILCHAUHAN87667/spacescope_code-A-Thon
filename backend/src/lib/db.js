import mongoose from "mongoose"
import {ENV} from "./env.js"

export const connectDB =async()=>{
  try {
    const {MONGO_URI}=ENV;
    if(!MONGO_URI) throw new Error("MONGO_URI is not set")
    const conn = await mongoose.connect(ENV.MONGO_URI)
    console.log("MongoDB connected succesfully:",conn.connection.host)
      } catch (error) {
    console.log("Error occured",error)
    process.exit(1) //1 statuscode means fail and 0 means success
  }

}