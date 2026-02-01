import "dotenv/config";
import mysql from "mysql2/promise";

async function testConnection() {
    const url = process.env.DATABASE_URL;
    console.log("Testing connection to:", url);
    try {
        const connection = await mysql.createConnection(url!);
        console.log("✅ Connection successful!");
        await connection.end();
    } catch (error) {
        console.error("❌ Connection failed:", error);
    }
}

testConnection();
