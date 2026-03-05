import type { User } from "@core/user/domain/entitie/user";
import type { CreateUserDTO, UpdateUserDTO } from "@core/user/domain/DTOs/userDTO";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO & { passwordHash: string }): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  list(page: number, limit: number): Promise<{ users: User[]; total: number }>;
}
