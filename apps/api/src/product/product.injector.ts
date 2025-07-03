import { PrismaPriceRepository } from '../../../core/src/Price';
import { PrismaProductRepository, ProductByCriteriaSearher, ProductCreator, ProductDeleter, ProductFinder } from '../../../core/src/Product';
import { dbClient } from '../globalInjector';
export const injector = {
  get productCreator() {
    return new ProductCreator(new PrismaProductRepository(dbClient));
  },
  get productDeleter() {
    return new ProductDeleter( 
      new PrismaProductRepository(dbClient),
      new PrismaPriceRepository(dbClient)
    );
  },
  get productFinder() {
    return new ProductFinder( new PrismaProductRepository(dbClient));
  },
  get productByCriteriaSearcher () {
    return new ProductByCriteriaSearher( new PrismaProductRepository(dbClient));
  },
}
