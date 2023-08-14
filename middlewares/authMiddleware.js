import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith ('Bearer')) {
    try {
      token = auth.split (' ')[1];
      const decoded = jwt.verify (token, process.env.JWT_SECRET_KEY);
      if (!decoded || decoded == {}) res.status (401).send ('Not authorized.');
      const user = await User.findById (decoded.userId);
      if (!user) throw new Error ('User not found, try register.');
      req.user = user;
      next ();
    } catch (error) {
      res.status (401).json ({success: false, message: error.message});
    }
  } else {
    res.status (401).send ('Not authorized, no token.');
  }
};
