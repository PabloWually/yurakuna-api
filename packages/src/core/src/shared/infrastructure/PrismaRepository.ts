import { PrismaClient } from "@prisma/client";

export abstract class PrismaRepository {
  protected prisma: PrismaClient;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }
}
