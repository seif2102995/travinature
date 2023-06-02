import mongoose from "mongoose";
const schema = mongoose.Schema;

const ChatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    Fuser_id:
    {
        type:String,
        required:true,
    },
    Tuser_id:
    {
        type:String,
        required:true,
    },

   
  },
  { timestamps: true }
);


const chatt = mongoose.model("chatt", ChatSchema);

export  {chatt};
