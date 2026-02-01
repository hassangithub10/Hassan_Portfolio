
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const { expand } = require('dotenv-expand');
const path = require('path');

async function test() {
    const myEnv = dotenv.config({ path: path.join(__dirname, '../.env.local') });
    expand(myEnv);

    const config = {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_NAME || "hassanport_db",
    };

    try {
        const connection = await mysql.createConnection(config);
        const sql = 'select `id`, `title`, `slug`, `short_description`, `long_description`, `tech_stack`, `live_url`, `github_url`, `image_url`, `featured`, `category`, `sort_order`, `is_visible`, `created_at`, `meta_title`, `meta_description`, `keywords`, `gallery`, `collaborator_name`, `collaborator_linkedin` from `projects` where `projects`.`is_visible` = true order by `projects`.`sort_order` asc';
        const [rows] = await connection.query(sql);
        console.log('Query successful! Rows:', rows.length);
        await connection.end();
    } catch (error) {
        console.error('Query failed:', error);
    }
}

test();
