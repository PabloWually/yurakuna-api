import { PurchaseDetail, PurchaseDetailRepository } from "../../domain";
import { PurchaseDetailId } from "../../domain/PurchaseDetail";
import { NotFoundError } from "../../../shared/domain/NotFoundError";

export class PurchaseDetailFinder {
  constructor(private repository: PurchaseDetailRepository){}
  async run(purchaseDetailId: string): Promise<PurchaseDetail>{
    const response = await this.repository.find(new PurchaseDetailId(purchaseDetailId));
    if (response) {
      return response;
    }

    throw new NotFoundError("PD no encontrado");
  }
}
