export interface CreateClientDTO {
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface UpdateClientDTO {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}
