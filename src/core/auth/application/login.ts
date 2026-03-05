import type { IUserRepository } from "@core/user/domain/repositories/IUserRepository";
import type { IRefreshTokenRepository } from "@core/auth/domain/repositories/IRefreshTokenRepository";
import { UnauthorizedError } from "@shared/errors";
import type { AuthResponse, LoginDTO } from "@core/user/domain/DTOs/authDTO";
import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiration,
  verifyPassword,
  type TokenPayload,
} from "@shared/infrastructure/security/auth";

export class Login {
  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async login(data: LoginDTO): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError("Credenciales inválidas");
    }

    const isPasswordValid = await verifyPassword(
      data.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Credenciales inválidas");
    }

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await generateAccessToken(tokenPayload);

    // Crear refresh token
    const refreshTokenValue = await generateRefreshToken({
      userId: user.id,
      tokenId: crypto.randomUUID(),
    });

    const expiresAt = getRefreshTokenExpiration();
    await this.refreshTokenRepository.create(
      user.id,
      refreshTokenValue,
      expiresAt,
    );

    const { passwordHash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken: refreshTokenValue,
    };
  }
}
