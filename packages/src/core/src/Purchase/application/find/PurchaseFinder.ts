import { Purchase, PurchaseRepository } from "../../domain";
import { PurchaseId } from "../../domain/Purchase";
import { NotFoundError } from "../../../shared/domain/NotFoundError";

export class PurchaseFinder {
  constructor(private repository: PurchaseRepository){}
  async run(purchaseId: string): Promise<Purchase>{
    const response = await this.repository.find(new PurchaseId(purchaseId));
    if (response) {
      return response;
    }

    throw new NotFoundError("Compra no encontrado");
  }
}
