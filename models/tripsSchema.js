import mongoose from "mongoose";
const schema = mongoose.Schema;

const tripsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);


const Tripss = mongoose.model("Tripss", tripsSchema);

export  {Tripss};
