import jwt from 'jsonwebtoken';

const generateToken = userId => {
  return jwt.sign ({userId}, process.env.JWT_SECRET_KEY, {expiresIn: '1w'});
};

export default generateToken;
