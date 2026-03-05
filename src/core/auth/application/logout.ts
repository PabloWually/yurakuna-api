import type { IRefreshTokenRepository } from "@core/auth/domain/repositories/IRefreshTokenRepository";

export class RefreshAccessToken {
  constructor(
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async logout(refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.deleteByToken(refreshToken);
  }

  async logoutAll(userId: string): Promise<void> {
    await this.refreshTokenRepository.deleteByUserId(userId);
  }
}
