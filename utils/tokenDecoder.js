import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from './constants';

export const tokenDecoder = (token) => {
  const dataStoredOnToken = Jwt.verify(token, JWT_SECRET);
  return dataStoredOnToken;
}
