export interface CreateProviderDTO {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UpdateProviderDTO {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}
