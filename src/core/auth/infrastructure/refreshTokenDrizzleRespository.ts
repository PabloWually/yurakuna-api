import { eq } from 'drizzle-orm';
import type { IRefreshTokenRepository } from '@core/auth/domain/repositories/IRefreshTokenRepository';
import type { Database } from '@database/connection';
import { refreshTokens } from '@database/schemas';
import type { RefreshToken } from '@core/auth/domain/entity/refreshToken';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private db: Database) {}

  create = async (
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<RefreshToken> => {
    const result = await this.db
      .insert(refreshTokens)
      .values({
        userId,
        token,
        expiresAt,
      })
      .returning();

    if (!result[0]) {
      throw new Error('Failed to create refresh token');
    }

    return result[0];
  }

  findByToken = async(token: string): Promise<RefreshToken | null> => {
    const result = await this.db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .limit(1);

    return result[0] || null;
  }

  deleteByToken = async(token: string): Promise<boolean> => {
    const result = await this.db
      .delete(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .returning();

    return result.length > 0;
  }

  deleteByUserId = async(userId: string): Promise<boolean> => {
    const result = await this.db
      .delete(refreshTokens)
      .where(eq(refreshTokens.userId, userId))
      .returning();

    return result.length > 0;
  }

  deleteById = async(id: string): Promise<boolean> => {
    const result = await this.db
      .delete(refreshTokens)
      .where(eq(refreshTokens.id, id))
      .returning();

    return result.length > 0;
  }
}
