import type { IClientRepository } from "@core/client/domain/repositories/IClientRepository";
import type { Client } from "@core/client/domain/entity/client";
import { clients } from "@database/schemas";
import type { Database } from "@database/connection";
import { count, desc, eq } from "drizzle-orm";
import type {
  CreateClientDTO,
  UpdateClientDTO,
} from "@core/client/domain/DTOs/clientDTO";
import type { Criteria } from "@core/shared/criteria";
import { extractFilters } from "@core/shared/criteria";

export class ClientRepository implements IClientRepository {
  private readonly columnMap = {
    id: clients.id,
    name: clients.name,
    email: clients.email,
    phone: clients.phone,
    address: clients.address,
    isActive: clients.isActive,
    userId: clients.userId,
    createdAt: clients.createdAt,
    updatedAt: clients.updatedAt,
  };

  constructor(private db: Database) {}

  findById = async (id: string): Promise<Client | null> => {
    const result = await this.db
      .select()
      .from(clients)
      .where(eq(clients.id, id))
      .limit(1);

    return result[0] || null;
  };

  findByEmail = async (email: string): Promise<Client | null> => {
    const result = await this.db
      .select()
      .from(clients)
      .where(eq(clients.email, email))
      .limit(1);

    return result[0] || null;
  };

  findByUserId = async (userId: string): Promise<Client | null> => {
    const result = await this.db
      .select()
      .from(clients)
      .where(eq(clients.userId, userId))
      .limit(1);

    return result[0] || null;
  };

  create = async (data: CreateClientDTO): Promise<Client> => {
    const result = await this.db
      .insert(clients)
      .values({
        userId: data.userId || null,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        address: data.address || null,
      })
      .returning();

    if (!result[0]) {
      throw new Error("Failed to create client");
    }

    return result[0];
  };

  update = async (
    id: string,
    data: UpdateClientDTO,
  ): Promise<Client | null> => {
    const result = await this.db
      .update(clients)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();

    return result[0] || null;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await this.db
      .delete(clients)
      .where(eq(clients.id, id))
      .returning();

    return result.length > 0;
  };

  search = async (criteria: Criteria): Promise<Client[]> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);

    const clientsList = await this.db
      .select()
      .from(clients)
      .where(whereCondition)
      .orderBy(desc(clients.createdAt))
      .limit(criteria.limit)
      .offset(criteria.offset);

    return clientsList;
  };

  count = async(criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);

    const totalCount = await this.db
      .select({ count: count() })
      .from(clients)
      .where(whereCondition);

    return totalCount[0]?.count || 0;
  }
}
