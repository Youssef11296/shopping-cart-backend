import {connect, set} from 'mongoose';

export const connectDb = async () => {
  try {
    set ('strictQuery', false);
    const conn = await connect (
      process.env.NODE_ENV === 'production'
        ? process.env.MONGO_PROD_URI
        : process.env.MONGO_URI
    );
  } catch (error) {
    console.log (`DB CONNECTION ERROR: ${error}`);
  }
};
