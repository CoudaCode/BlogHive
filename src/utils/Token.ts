// import { sign, verify } from 'jsonwebtoken';

// export const generateToken = (payload: object): string => {
//   if (!process.env.JWT_SECRET) {
//     throw new Error('JWT_SECRET not found');
//   }
//   return sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// export const verifyToken = (token: string): string | object => {
//   try {
//     if (!process.env.JWT_SECRET) {
//       throw new Error('JWT_SECRET not found');
//     }
//     return verify(token, process.env.JWT_SECRET);
//   } catch {
//     throw new Error('Invalid token');
//   }
// };

// token.ts
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// Initialisation du service JWT
const jwtService = new JwtService();

// Fonction pour générer un token JWT
export const generateToken = (
  payload: object,
  configService: ConfigService,
): string => {
  const secret = configService.get<string>('JWT_SECRET');
  return jwtService.sign({ payload }, { secret, expiresIn: '1h'});
};

// Fonction pour vérifier un token JWT
export const verifyToken = (
  token: string,
  configService: ConfigService,
): string | object => {
  try {
    const secret = configService.get<string>('JWT_SECRET');
    return jwtService.verify(token, { secret });
  } catch {
    throw new Error('Invalid token');
  }
};
