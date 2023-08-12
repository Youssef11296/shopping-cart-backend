import {Schema, model} from 'mongoose';

const cartSchema = new Schema (
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model ('Cart', cartSchema);
export default Cart;
