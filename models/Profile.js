import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        unique: true,  
    },

    timezone:{
        type:String,
        default:"IST",
    }
},
{timestamps:true}
);

export default mongoose.model("Profile", profileSchema);
