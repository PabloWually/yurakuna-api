import { 
  PrismaPriceRepository,
  PriceByCriteriaSearher, 
  PriceCreator,
  PriceDeleter,
  PriceFinder
} from '../../../core/src/Price';
import { dbClient } from '../globalInjector';
export const injector = {
  get priceCreator() {
    return new PriceCreator(new PrismaPriceRepository(dbClient));
  },
  get priceDeleter() {
    return new PriceDeleter( new PrismaPriceRepository(dbClient));
  },
  get priceFinder() {
    return new PriceFinder( new PrismaPriceRepository(dbClient));
  },
  get priceByCriteriaSearcher () {
    return new PriceByCriteriaSearher( new PrismaPriceRepository(dbClient));
  },
}
