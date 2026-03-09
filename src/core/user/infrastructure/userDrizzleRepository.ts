import { eq, desc, count } from "drizzle-orm";
import type { IUserRepository } from "@core/user/domain/repositories/IUserRepository";
import type { Database } from "@database/connection";
import type { User } from "@core/user/domain/entity/user";
import type {
  CreateUserDTO,
  UpdateUserDTO,
} from "@core/user/domain/DTOs/userDTO";
import { users } from "@database/schemas";
import { extractFilters, type Criteria } from "@shared/criteria";

export class UserRepository implements IUserRepository {
  private readonly columnMap = {
    id: users.id,
    email: users.email,
    name: users.name,
    role: users.role,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  };
  constructor(private db: Database) {}

  findById = async (id: string): Promise<User | null> => {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] || null;
  };

  findByEmail = async (email: string): Promise<User | null> => {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] || null;
  };

  create = async (
    data: CreateUserDTO & { passwordHash: string },
  ): Promise<User> => {
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
      throw new Error("Failed to create user");
    }

    return result[0];
  };

  update = async (id: string, data: UpdateUserDTO): Promise<User | null> => {
    const result = await this.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return result[0] || null;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return result.length > 0;
  };

  search = async (criteria: Criteria): Promise<User[]> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);

    const usersList = await this.db
      .select()
      .from(users)
      .where(whereCondition)
      .orderBy(desc(users.createdAt))
      .limit(criteria.limit)
      .offset(criteria.offset);

    return usersList;
  };

  count = async (criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);

    const totalCount = await this.db
      .select({ count: count() })
      .from(users)
      .where(whereCondition);

    return totalCount[0]?.count || 0;
  };
}
