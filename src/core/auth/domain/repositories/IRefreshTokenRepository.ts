import type { RefreshToken } from "@core/auth/domain/entity/refreshToken";

export interface IRefreshTokenRepository {
  create(userId: string, token: string, expiresAt: Date): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  deleteByToken(token: string): Promise<boolean>;
  deleteByUserId(userId: string): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
}
