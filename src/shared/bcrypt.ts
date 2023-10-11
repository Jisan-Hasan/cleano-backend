import bcrypt from 'bcrypt';
import config from '../config';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = Number(config.bycrypt_salt_rounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, hashedPassword);

  return result;
};
