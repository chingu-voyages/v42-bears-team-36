import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./constants.js";

const passwordEncrypter = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
}

export default passwordEncrypter;
