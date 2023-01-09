import { sign } from 'jsonwebtoken';
import { JWT_SECRET, SECONDS_OF_A_DAY } from './constants';

const tokenGenerator = (dataStoredOnToken) => {
  const token = sign({ payload: dataStoredOnToken }, JWT_SECRET, { expiresIn: SECONDS_OF_A_DAY });
  return token;
}

export default tokenGenerator;