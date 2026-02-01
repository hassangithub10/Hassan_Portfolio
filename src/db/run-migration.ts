import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";

async function run() {
    const { db } = await import("./index");

    const sqlPath = path.resolve(__dirname, "../../drizzle/0000_puzzling_rocket_racer.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    // Split statements
    const statements = sqlContent.split("--> statement-breakpoint");

    console.log(`Found ${statements.length} statements.`);

    for (const statement of statements) {
        if (statement.trim()) {
            try {
                // Using db.execute is safer if available, but drizzle instance wrapping mysql2 pool 
                // might not expose raw execute directly easily without SQL template tag.
                // easier to skip drizzle and use mysql2 pool directly or use sql template.

                // Hack: Using sql template tag from drizzle-orm
                const { sql } = await import("drizzle-orm");
                console.log("Executing:", statement.substring(0, 50) + "...");
                await db.execute(sql.raw(statement));
                console.log("Executed statement.");
            } catch (e: any) {
                if (e.code === 'ER_TABLE_EXISTS_ERROR') {
                    console.log("Table exists, skipping.");
                } else {
                    console.error("Error executing statement:", e.message);
                }
            }
        }
    }

    console.log("Migration done.");
    process.exit(0);
}

run().catch(console.error);
