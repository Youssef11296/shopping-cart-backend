import {model, Schema} from 'mongoose';

const userSchema = new Schema ({
  avatar: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  contact: {
    phoneNumber: String,
    whatsApp: String,
    telegram: String,
  },
  address: {
    location: String,
    country: String,
    city: String,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  token: String,
});

const User = model ('User', userSchema);
export default User;
