import Database from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

import { DB } from "./types";

const dialect = new SqliteDialect({
  database: new Database("./prisma/dev.db"),
});

export const kysely = new Kysely<DB>({
  dialect,
});
