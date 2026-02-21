import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { expand } from "dotenv-expand";

const myEnv = dotenv.config({ path: ".env.local" });
expand(myEnv);
// If not in .env.local, check .env
if (!process.env.DB_PASSWORD) {
    const mainEnv = dotenv.config({ path: ".env" });
    expand(mainEnv);
}


export default defineConfig({
    dialect: "mysql",
    schema: "./src/db/schema.ts",
    out: "./migrations",
    dbCredentials: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || undefined,
        database: process.env.DB_NAME || "hassanport_db",
    },
});
