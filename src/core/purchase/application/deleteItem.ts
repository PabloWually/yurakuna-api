import type { IPurchaseRepository } from "@core/purchase/domain/repositories/IPurchaseRepository";

export class DeleteItem {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  delete = async (purchaseId: string, itemId: string): Promise<void> => {
    // Verify the purchase exists
    const purchase = await this.purchaseRepository.findById(purchaseId);
    if (!purchase) {
      throw new Error("Purchase not found");
    }

    // Verify purchase is in draft status
    if (purchase.status !== "draft") {
      throw new Error("Only purchases with draft status can have their items deleted");
    }

    // Delete the item
    const deleted = await this.purchaseRepository.deletePurchaseItem(itemId);
    if (!deleted) {
      throw new Error("Purchase item not found");
    }
  };
}
