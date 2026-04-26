import type { IPurchaseRepository } from "@core/purchase/domain/repositories/IPurchaseRepository";
import type { PurchaseItem } from "@core/purchase/domain/entity/purchase";

export class UpdateItem {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  update = async (
    purchaseId: string,
    itemId: string,
    quantity: string,
    pricePerUnit: string,
  ): Promise<PurchaseItem | null> => {
    // Verify the purchase exists
    const purchase = await this.purchaseRepository.findById(purchaseId);
    if (!purchase) {
      throw new Error("Purchase not found");
    }

    // Verify purchase is in draft status
    if (purchase.status !== "draft") {
      throw new Error("Only purchases with draft status can have their items edited");
    }

    // Update the item
    const updatedItem = await this.purchaseRepository.updatePurchaseItem(
      itemId,
      quantity,
      pricePerUnit,
    );
    if (!updatedItem) {
      throw new Error("Purchase item not found");
    }

    return updatedItem;
  };
}
