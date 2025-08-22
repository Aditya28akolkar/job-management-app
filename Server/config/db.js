import mongoose from "mongoose"
//function to connect database
const connectDB=async()=>{
    mongoose.connection.on('connected',()=>console.log("database is connected"))

await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)


}
export default connectDB