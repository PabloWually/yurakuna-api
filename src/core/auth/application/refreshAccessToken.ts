import type { IUserRepository } from "@core/user/domain/repositories/IUserRepository";
import type { IRefreshTokenRepository } from "@core/auth/domain/repositories/IRefreshTokenRepository";
import { UnauthorizedError } from "@shared/errors";
import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiration,
  verifyRefreshToken,
  type TokenPayload,
} from "@shared/infrastructure/security/auth";

export class RefreshAccessToken {
  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  refreshAccessToken = async (
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    // Verificar refresh token
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new UnauthorizedError("Refresh token inválido");
    }

    // Verificar que exista en la base de datos
    const storedToken =
      await this.refreshTokenRepository.findByToken(refreshToken);
    if (!storedToken) {
      throw new UnauthorizedError("Refresh token inválido");
    }

    // Verificar que no haya expirado
    if (storedToken.expiresAt < new Date()) {
      await this.refreshTokenRepository.deleteByToken(refreshToken);
      throw new UnauthorizedError("Refresh token expirado");
    }

    // Obtener usuario
    const user = await this.userRepository.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedError("Usuario no encontrado");
    }

    // Generar nuevo access token
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await generateAccessToken(tokenPayload);

    // Rotar refresh token (eliminar el viejo y crear uno nuevo)
    await this.refreshTokenRepository.deleteById(storedToken.id);

    const newRefreshTokenValue = await generateRefreshToken({
      userId: user.id,
      tokenId: crypto.randomUUID(),
    });

    const expiresAt = getRefreshTokenExpiration();
    await this.refreshTokenRepository.create(
      user.id,
      newRefreshTokenValue,
      expiresAt,
    );

    return {
      accessToken,
      refreshToken: newRefreshTokenValue,
    };
  };
}
