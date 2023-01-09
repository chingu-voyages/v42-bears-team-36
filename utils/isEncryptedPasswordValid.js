import bcrypt from 'bcrypt';

const isEncryptedPasswordValid = (password, hashedPassword) => {
  const validPassword = bcrypt.compare(password, hashedPassword);
  return validPassword;
}

export default isEncryptedPasswordValid;