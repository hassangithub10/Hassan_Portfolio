import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

async function updateAdmin() {
    const host = "127.0.0.1";
    const user = "root";
    const password = "dks$Next321"; // The working one
    const database = "hassanport_db";

    const email = "admin@hassanport.com";
    const adminPassword = "hassanport_admin";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    console.log("Connecting to database...");
    let connection;
    try {
        connection = await mysql.createConnection({
            host,
            user,
            password,
            database,
        });
        console.log("✅ Connected!");

        // Check if admin exists
        const [rows]: any = await connection.execute("SELECT * FROM admins WHERE email = ?", [email]);

        if (rows.length > 0) {
            console.log("Admin exists. Updating credentials...");
            await connection.execute(
                "UPDATE admins SET password_hash = ?, username = ? WHERE email = ?",
                [hashedPassword, "admin", email]
            );
        } else {
            console.log("Creating new admin...");
            await connection.execute(
                "INSERT INTO admins (username, email, password_hash, permissions) VALUES (?, ?, ?, ?)",
                ["admin", email, hashedPassword, JSON.stringify(["all"])]
            );
        }

        console.log("✅ Admin Credentials Updated!");
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${adminPassword}`);

    } catch (error: any) {
        console.error("❌ Error:", error.message);
    } finally {
        if (connection) await connection.end();
    }
}

updateAdmin();
