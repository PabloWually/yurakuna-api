import type { Database } from '@database/connection';
import type { IProviderRepository } from '@core/provider/domain/repositories/IProviderRepository';
import { eq, and, count } from 'drizzle-orm';
import { providers } from '@database/schemas';
import type { CreateProviderDTO, UpdateProviderDTO } from '@core/provider/domain/DTOs/providerDTO';
import type { Provider } from '@core/provider/domain/entity/provider';
import { extractFilters, type Criteria } from '@shared/criteria';

export class ProviderDrizzleRepository implements IProviderRepository {
  private readonly columnMap = {
    id: providers.id,
    name: providers.name,
    email: providers.email,
    phone: providers.phone,
    address: providers.address,
    isActive: providers.isActive,
    createdAt: providers.createdAt,
    updatedAt: providers.updatedAt,
  };

  constructor(private db: Database) {}

  findById = async (id: string): Promise<Provider | null> => {
    const result = await this.db
      .select()
      .from(providers)
      .where(and(eq(providers.id, id), eq(providers.isActive, true)))
      .limit(1);
    return result[0] || null;
  };

  findByName = async (name: string): Promise<Provider | null> => {
    const result = await this.db
      .select()
      .from(providers)
      .where(and(eq(providers.name, name), eq(providers.isActive, true)))
      .limit(1);
    return result[0] || null;
  };

  create = async (data: CreateProviderDTO): Promise<Provider> => {
    const result = await this.db
      .insert(providers)
      .values({
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
      })
      .returning();

    if (!result[0]) {
      throw new Error('Failed to create provider');
    }

    return result[0];
  };

  update = async (id: string, data: UpdateProviderDTO): Promise<Provider | null> => {
    const updateData: any = { updatedAt: new Date() };

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const result = await this.db
      .update(providers)
      .set(updateData)
      .where(eq(providers.id, id))
      .returning();

    return result[0] || null;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await this.db
      .update(providers)
      .set({ isActive: false })
      .where(eq(providers.id, id))
      .returning();
    return result.length > 0;
  };

  search = async (criteria: Criteria): Promise<Provider[]> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    return await this.db
      .select()
      .from(providers)
      .where(whereCondition)
      .limit(criteria.limit)
      .offset(criteria.offset);
  };

  count = async (criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    const totalCount = await this.db
      .select({ count: count() })
      .from(providers)
      .where(whereCondition);
    return totalCount[0]?.count || 0;
  };
}
