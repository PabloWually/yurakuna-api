import { PurchaseDetailRepository } from "../../domain";
import { PurchaseDetailId } from "../../domain/PurchaseDetail";

export class PurchaseDetailDeleter {
  constructor(private repository: PurchaseDetailRepository){}
  async run (purchaseDetailId: string) {
    await this.repository.delete(new PurchaseDetailId(purchaseDetailId));
  }
}
