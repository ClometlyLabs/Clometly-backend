import { JwtService } from '@nestjs/jwt';

export function generateToken(
  jwtService: JwtService,
  userId: string,
  profileId: string,
): string {
  return jwtService.sign({ userId, profileId });
}
