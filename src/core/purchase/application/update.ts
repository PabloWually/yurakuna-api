import type { IPurchaseRepository } from '@core/purchase/domain/repositories/IPurchaseRepository';
import type { IStockRepository } from '@core/stock/domain/repositories/IStockRepository';
import type { IProductRepository } from '@core/product/domain/repositories/IProductRepository';
import type { UpdatePurchaseDTO } from '@core/purchase/domain/DTOs/purchaseDTO';
import type { Purchase } from '@core/purchase/domain/entity/purchase';

export class Update {
  constructor(
    private purchaseRepository: IPurchaseRepository,
    private stockRepository: IStockRepository,
    private productRepository: IProductRepository,
  ) {}

  update = async (id: string, data: UpdatePurchaseDTO): Promise<Purchase | null> => {
    const purchase = await this.purchaseRepository.update(id, data);
    if (!purchase) return null;

    if (data.status === 'confirmed') {
      const purchaseWithItems = await this.purchaseRepository.findByIdWithItems(id);
      if (purchaseWithItems?.items && purchaseWithItems.items.length > 0) {
        for (const item of purchaseWithItems.items) {
          const product = await this.productRepository.findById(item.productId);
          const quantityBefore = Number(product?.currentStock ?? 0);
          const quantityAfter = quantityBefore + Number(item.quantity);
          await this.stockRepository.createMovement({
            productId: item.productId,
            type: 'in',
            quantity: Number(item.quantity),
            reason: `Compra #${id} confirmada`,
            purchaseId: id,
            quantityBefore,
            quantityAfter,
          });
          await this.productRepository.updateStock(item.productId, Number(item.quantity));
        }
      }
    }

    return purchase;
  };
}
