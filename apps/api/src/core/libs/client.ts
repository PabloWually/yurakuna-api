import { Create } from "@core/client/application/create";
import { Find } from "@core/client/application/find";
import { Search } from "@core/client/application/search";
import { Update } from "@core/client/application/update";
import { ClientDrizzleRepository } from "@core/client/infrastructure/clientDrizzleRepository";
import { db } from "@database/connection";

export const clientManager = {
  findClient: new Find(new ClientDrizzleRepository(db)),
  searchClient: new Search(new ClientDrizzleRepository(db)),
  createClient: new Create(new ClientDrizzleRepository(db)),
  updateClient: new Update(new ClientDrizzleRepository(db)),
}
