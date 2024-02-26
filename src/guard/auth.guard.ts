import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifyToken } from 'src/utils/Token';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const token = request.headers.authorization.split(' ')[1];
    let token: string;
    if (request.cookies && request.cookies.user) {
      token = request.cookies.user;
    } else if (request.headers.authorization) {
      const authHeader = request.headers.authorization;
      const [bearer, tokenValue] = authHeader.split(' ');
      if (bearer === 'Bearer' && tokenValue) {
        token = tokenValue;
      }
    }
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = verifyToken(token, this.configService);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
