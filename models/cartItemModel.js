import {Schema, model} from 'mongoose';

const cartItemSchema = new Schema (
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      unique: true,
    },
    quantity: {
      value: Number,
      measureUnit: String,
    },
  },
  {
    timestamps: true,
  }
);

const CartItem = model ('CartItem', cartItemSchema);
export default CartItem;
