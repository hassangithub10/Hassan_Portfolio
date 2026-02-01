import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function run() {
    const { db } = await import("./index");
    const { sql } = await import("drizzle-orm");

    console.log("Updating schema...");

    // Create admins table
    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS admins (
            id int AUTO_INCREMENT NOT NULL,
            username varchar(50) NOT NULL,
            password_hash varchar(255) NOT NULL,
            created_at timestamp DEFAULT (now()),
            CONSTRAINT admins_id PRIMARY KEY(id),
            CONSTRAINT admins_username_unique UNIQUE(username)
        );
    `);

    // Create seo_defaults table
    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS seo_defaults (
            route varchar(100) NOT NULL,
            title varchar(255) NOT NULL,
            description text,
            keywords text,
            og_image varchar(255),
            updated_at timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT seo_defaults_route PRIMARY KEY(route)
        );
    `);

    // Add columns to existing tables
    const tables = ['projects', 'services', 'blog_posts'];

    for (const table of tables) {
        try {
            await db.execute(sql.raw(`ALTER TABLE ${table} ADD COLUMN meta_title varchar(255)`));
            console.log(`Added meta_title to ${table}`);
        } catch (e: any) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.error(e.message);
        }

        try {
            await db.execute(sql.raw(`ALTER TABLE ${table} ADD COLUMN meta_description text`));
            console.log(`Added meta_description to ${table}`);
        } catch (e: any) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.error(e.message);
        }

        try {
            await db.execute(sql.raw(`ALTER TABLE ${table} ADD COLUMN keywords text`));
            console.log(`Added keywords to ${table}`);
        } catch (e: any) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.error(e.message);
        }
    }

    console.log("Schema update complete.");
    process.exit(0);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
