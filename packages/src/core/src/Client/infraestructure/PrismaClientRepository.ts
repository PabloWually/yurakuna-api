import { PrismaRepository } from "../../shared/infrastructure/PrismaRepository";
import { Client, ClientRepository } from "../domain";
import { ClientId } from "../domain/Client";
import { Nullable } from "../../shared/domain/Nullable";
import { Criteria } from "../../shared/domain/Criteria";
import { PrismaCriteriaConverter } from "../../shared/infrastructure/PrismaCriteriaConverter";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { PrismaFiltersConverter } from "../../shared/infrastructure/PrismaFilterConverter";
import { Primitives } from "../../shared/domain/Primitives";

export class PrismaClientRepository extends PrismaRepository
  implements ClientRepository {
  async save(client: Client): Promise<void> {
    const data = client.toPrimitives();
    await this.prisma.client.upsert({
      create: { ...data },
      update: { ...data },
      where: { id: data.id }
    });
  }

  async delete(clientId: ClientId): Promise<void> {
    await this.prisma.client.update({
      where: { id: clientId.value },
      data: {
        isActive: false,
      }
    });
  }

  async find(clientId: ClientId): Promise<Nullable<Client>> {
    const response = await this.prisma.client.findUnique({
      where: {
        id: clientId.value,
        isActive: true,
      }
    });
    if (response) {
      return Client.fromPrimitives(response);
    }
    return null;
  }

  async matching(criteria: Criteria): Promise<Client[]> {
    const response = await this.prisma.client.findMany({
      ...PrismaCriteriaConverter(criteria),
      orderBy: { name: "asc" },
    });
    const data = response.map((client: Primitives<Client>) => {
      return Client.fromPrimitives(client);
    });
    return data;
  }

  async count(filters: Filter[]): Promise<number> {
    return await this.prisma.client.count({
      where: PrismaFiltersConverter(filters),
    });
  }
}
