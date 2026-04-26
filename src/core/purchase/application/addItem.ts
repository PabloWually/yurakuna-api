import type { IPurchaseRepository } from "@core/purchase/domain/repositories/IPurchaseRepository";
import type { PurchaseItem } from "@core/purchase/domain/entity/purchase";

export class AddItem {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  add = async (
    purchaseId: string,
    productId: string,
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
      throw new Error("Only purchases with draft status can have items added");
    }

    // Add the item
    const newItem = await this.purchaseRepository.addPurchaseItem(
      purchaseId,
      productId,
      quantity,
      pricePerUnit,
    );
    if (!newItem) {
      throw new Error("Failed to add item to purchase");
    }

    return newItem;
  };
}
