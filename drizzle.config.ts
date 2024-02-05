import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
      url: env.DB_URL
  },
  out: "./drizzle",
} satisfies Config;
