import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';

type HyperdriveEnv = {
  HYPERDRIVE?: {
    connectionString?: string | null;
  };
};

function createDatabase(connectionString: string) {
  const client = postgres(connectionString);
  return drizzle(client, { schema });
}

export type Database = ReturnType<typeof createDatabase>;

let database: Database | undefined;
let activeConnectionString: string | undefined;

export function initializeDatabase(env: HyperdriveEnv): Database {
  const connectionString = env.HYPERDRIVE?.connectionString;

  if (!connectionString) {
    throw new Error('HYPERDRIVE connection string is not set');
  }

  if (!database || activeConnectionString !== connectionString) {
    database = createDatabase(connectionString);
    activeConnectionString = connectionString;
  }

  return database;
}

export function getDatabase(): Database {
  if (!database) {
    throw new Error('Database has not been initialized');
  }

  return database;
}
