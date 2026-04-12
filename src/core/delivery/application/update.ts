import type { IDeliveryRepository } from '@core/delivery/domain/repositories/IDeliveryRepository';
import type { IStockRepository } from '@core/stock/domain/repositories/IStockRepository';
import type { IProductRepository } from '@core/product/domain/repositories/IProductRepository';
import type { UpdateDeliveryDTO } from '@core/delivery/domain/DTOs/deliveryDTO';
import type { Delivery } from '@core/delivery/domain/entity/delivery';

export class Update {
  constructor(
    private deliveryRepository: IDeliveryRepository,
    private stockRepository: IStockRepository,
    private productRepository: IProductRepository,
  ) {}

  update = async (id: string, data: UpdateDeliveryDTO): Promise<Delivery | null> => {
    const delivery = await this.deliveryRepository.update(id, data);
    if (!delivery) return null;

    if (data.status === 'completed') {
      const deliveryWithItems = await this.deliveryRepository.findByIdWithItems(id);
      if (deliveryWithItems?.items && deliveryWithItems.items.length > 0) {
        for (const item of deliveryWithItems.items) {
          await this.stockRepository.createMovement({
            productId: item.productId,
            type: 'out',
            quantity: Number(item.quantity),
            reason: `Entrega #${id} completada`,
            deliveryId: id,
          });
          await this.productRepository.updateStock(item.productId, -Number(item.quantity));
        }
      }
    }

    return delivery;
  };
}
