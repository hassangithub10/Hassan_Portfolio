import "dotenv/config";
import * as dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Loading env from:", envPath);
dotenv.config({ path: envPath });

console.log("DB_PASSWORD from process.env:", process.env.DB_PASSWORD);
console.log("DB_PASSWORD length:", process.env.DB_PASSWORD?.length);
