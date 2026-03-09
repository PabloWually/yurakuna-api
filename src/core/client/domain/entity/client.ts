export interface Client {
  id: string;
  userId?: string | null;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
}
