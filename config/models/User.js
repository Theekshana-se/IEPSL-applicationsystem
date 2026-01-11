
import mongoose from "mongoose";
export default mongoose.model("User", new mongoose.Schema({
 name:String,email:String,password:String,role:{type:String,default:"member"}
}));
