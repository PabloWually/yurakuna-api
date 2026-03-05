import { eq, desc, count } from 'drizzle-orm';
import type { IUserRepository } from '@core/user/domain/repositories/IUserRepository';
import type { Database } from '@database/connection';
import type { User } from '@core/user/domain/entity/user';
import type { CreateUserDTO, UpdateUserDTO } from '@core/user/domain/DTOs/userDTO';
import { users } from '@database/schemas';

export class UserRepository implements IUserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] || null;
  }

  async create(data: CreateUserDTO & { passwordHash: string }): Promise<User> {
    const result = await this.db
      .insert(users)
      .values({
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name,
        role: data.role,
      })
      .returning();

    if (!result[0]) {
      throw new Error('Failed to create user');
    }

    return result[0];
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    const result = await this.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return result[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return result.length > 0;
  }

  async list(page: number, limit: number): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit;

    const [usersList, totalCount] = await Promise.all([
      this.db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ count: count() }).from(users),
    ]);

    return {
      users: usersList,
      total: totalCount[0]?.count || 0,
    };
  }
}
