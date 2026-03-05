import type { Role } from "@shared/types";

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role: Role;
}

export interface UpdateUserDTO {
  email?: string;
  name?: string;
  role?: Role;
}
