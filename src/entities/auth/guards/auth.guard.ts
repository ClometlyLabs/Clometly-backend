import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Token no proporcionado');

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    // Si el token es válido, permite el acceso
    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

    return authHeader.split(' ')[1]; // Extrae el token después de 'Bearer'
  }
}
