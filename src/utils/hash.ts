import { hash, compare, genSalt } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

export const comparePassword = (password: string, hash: string) => {
  try {
    return compare(password, hash);
  } catch (e) {
    return false;
  }
};
