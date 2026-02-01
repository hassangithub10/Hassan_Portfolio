import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function run() {
    const { db } = await import("./index");
    const { sql } = await import("drizzle-orm");

    // Using raw query to check tables
    // Drizzle doesn't have listTables easily on mysql2 adapter directly without query
    const result = await db.execute(sql`SHOW TABLES`);
    console.log("Tables:", result[0]);
    process.exit(0);
}

run().catch(console.error);
