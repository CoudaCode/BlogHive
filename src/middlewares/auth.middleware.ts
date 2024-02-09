import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from 'src/utils/Token';
import { ConfigService } from '@nestjs/config'; // Import du ConfigService

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {} // Injection du ConfigService

  use(req: Request, res: Response, next: NextFunction) {
    try {
      let token: string;
      if (req.cookies && req.cookies.user) {
        token = req.cookies.user;
      } else if (req.headers.authorization) {
        const authHeader = req.headers.authorization;
        const [bearer, tokenValue] = authHeader.split(' ');
        if (bearer === 'Bearer' && tokenValue) {
          token = tokenValue;
        }
      }

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const decoded = verifyToken(token, this.configService); // Utilisation du ConfigService
      if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req['user'] = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }
}
