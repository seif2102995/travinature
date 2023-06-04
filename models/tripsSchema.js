import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomTypeSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const hotelSchema = new Schema({
  name: { type: String, required: true },
  roomTypes: [roomTypeSchema],
});

const tripSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    hotels: [hotelSchema],
  },
  { timestamps: true }
);

const Tripss = mongoose.model('Tripss', tripSchema);

export {Tripss} ;
