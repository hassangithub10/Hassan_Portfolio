import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// Database configuration
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const dbName = process.env.DB_NAME;
const pass = process.env.DB_PASSWORD;

const connectionOptions = (host && user && dbName)
    ? {
        host,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        user,
        password: pass,
        database: dbName,
    }
    : process.env.DATABASE_URL
        ? { uri: process.env.DATABASE_URL }
        : null;

if (!connectionOptions) {
    throw new Error("Missing database configuration. Please check .env.local");
}

// Singleton pattern for database connection
const globalForDb = globalThis as unknown as {
    conn: mysql.Pool | undefined;
};

const poolConnection = globalForDb.conn ?? mysql.createPool({
    ...connectionOptions,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
});

if (process.env.NODE_ENV !== "production") globalForDb.conn = poolConnection;

// Create Drizzle instance
export const db = drizzle(poolConnection, { schema, mode: "default" });

export default db;
