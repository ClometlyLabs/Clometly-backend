import { JwtService } from '@nestjs/jwt';

export function generateToken(
  jwtService: JwtService,
  userId: string,
  email: string,
): string {
  return jwtService.sign({ id: userId, email });
}
