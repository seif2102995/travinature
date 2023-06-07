import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'signup_model',
    required: true,
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: 'Tripss',
    required: true,
  },
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: 'Tripss.hotels',
    required: true,
  },
  roomTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'Tripss.hotels.roomTypes',
    required: true,
  },
  activityId: {
    type: Schema.Types.ObjectId,
    ref: 'Tripss.hotels.activities',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

export  {Order};