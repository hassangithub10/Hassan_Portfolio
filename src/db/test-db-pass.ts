import mysql from "mysql2/promise";

async function testConnection() {
    const passwords = ["dks$Next321", "dks\\$Next321"];
    const host = "127.0.0.1";
    const user = "root";
    const database = "hassanport_db";

    for (const password of passwords) {
        console.log(`Testing with password: ${password}`);
        try {
            const connection = await mysql.createConnection({
                host,
                user,
                password,
                database,
            });
            console.log("✅ Connection successful!");
            await connection.end();
            return;
        } catch (error: any) {
            console.error(`❌ Connection failed: ${error.message}`);
        }
    }
}

testConnection();
