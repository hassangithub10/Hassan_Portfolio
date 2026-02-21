// Script to add missing DB columns
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'hassanport_db',
    });

    console.log('Connected to database...');

    const migrations = [
        // Check if collaborators column exists, add if not
        `ALTER TABLE projects ADD COLUMN IF NOT EXISTS collaborators json;`,
    ];

    for (const sql of migrations) {
        try {
            console.log('Running:', sql);
            await connection.execute(sql);
            console.log('✓ Done');
        } catch (err) {
            // MYSQL 5.x doesnt support IF NOT EXISTS in ALTER TABLE
            // Try fallback
            try {
                const colName = sql.match(/ADD COLUMN IF NOT EXISTS (\w+)/)?.[1];
                if (colName) {
                    const [rows] = await connection.execute(
                        `SELECT COUNT(*) as cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='projects' AND COLUMN_NAME='${colName}'`
                    );
                    if (rows[0].cnt === 0) {
                        const fallback = sql.replace('ADD COLUMN IF NOT EXISTS', 'ADD COLUMN');
                        await connection.execute(fallback);
                        console.log('✓ Done (fallback)');
                    } else {
                        console.log(`✓ Column '${colName}' already exists, skipping.`);
                    }
                }
            } catch (e2) {
                console.error('Error:', e2);
            }
        }
    }

    await connection.end();
    console.log('Migration complete!');
}

migrate().catch(console.error);
