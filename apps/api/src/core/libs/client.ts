import { Create } from "@core/client/application/create";
import { Find } from "@core/client/application/find";
import { Search } from "@core/client/application/search";
import { Update } from "@core/client/application/update";
import { ClientDrizzleRepository } from "@core/client/infrastructure/clientDrizzleRepository";
import { getDatabase } from "@database/connection";

export const clientManager = {
  get findClient() {
    const db = getDatabase();
    return new Find(new ClientDrizzleRepository(db));
  },
  get searchClient() {
    const db = getDatabase();
    return new Search(new ClientDrizzleRepository(db));
  },
  get createClient() {
    const db = getDatabase();
    return new Create(new ClientDrizzleRepository(db));
  },
  get updateClient() {
    const db = getDatabase();
    return new Update(new ClientDrizzleRepository(db));
  },
}
