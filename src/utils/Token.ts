import { sign, verify } from 'jsonwebtoken';
export const generateToken = (payload: object): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not found');
  }
  return sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): string | object => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not found');
    }
    return verify(token, process.env.JWT_SECRET);
  } catch {
    throw new Error('Invalid token');
  }
};
