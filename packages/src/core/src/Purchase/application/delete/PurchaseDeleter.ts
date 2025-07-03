import { PurchaseRepository } from "../../domain";
import { PurchaseId } from "../../domain/Purchase";

export class PurchaseDeleter {
  constructor(private repository: PurchaseRepository){}
  async run (purchaseId: string) {
    await this.repository.delete(new PurchaseId(purchaseId));
  }
}
