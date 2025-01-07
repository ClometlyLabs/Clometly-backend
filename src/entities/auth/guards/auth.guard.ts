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
      // Decodifica y verifica el token
      const payload = this.jwtService.verify(token);

      // Agrega los datos decodificados al objeto request
      request.user = {
        userId: payload.userId,
        profileId: payload.profileId,
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
    // Permite el acceso si todo está en orden
    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    // Extrae el token después de 'Bearer'
    return authHeader.split(' ')[1];
  }
}
