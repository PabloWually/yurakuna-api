import type { IRefreshTokenRepository } from "@core/auth/domain/repositories/IRefreshTokenRepository";

export class RefreshAccessToken {
  constructor(
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  logOut = async (refreshToken: string): Promise<void> => {
    await this.refreshTokenRepository.deleteByToken(refreshToken);
  }

  logOutAll = async (userId: string): Promise<void> => {
    await this.refreshTokenRepository.deleteByUserId(userId);
  }
}
