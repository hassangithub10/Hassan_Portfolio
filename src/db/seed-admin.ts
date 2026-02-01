import "dotenv/config";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";
import { admins } from "./schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seedAdmin() {
    console.log("🔐 Seeding Admin User...");
    console.log("--------------------------------");
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("--------------------------------");

    const email = "admin@hassanport.com";
    const password = "hassanport_admin"; // Default strong password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if exists
        const existing = await db.select().from(admins).where(eq(admins.email, email));

        if (existing.length > 0) {
            console.log("Admin already exists. Updating password...");
            await db.update(admins).set({
                passwordHash: hashedPassword,
                username: "admin"
            }).where(eq(admins.email, email));
        } else {
            console.log("Creating new admin...");
            await db.insert(admins).values({
                username: "admin",
                email: email,
                passwordHash: hashedPassword,
                permissions: ["all"],
            });
        }

        console.log("✅ Admin Credentials Updated:");
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);

    } catch (error) {
        console.error("❌ Failed to seed admin:", error);
    } finally {
        process.exit();
    }
}

seedAdmin();
