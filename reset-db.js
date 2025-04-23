require("dotenv").config();
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

async function resetDB() {
  try {
    console.log("🧹 Dropping and recreating public schema...");
    await db.raw("DROP SCHEMA public CASCADE;");
    await db.raw("CREATE SCHEMA public;");
    console.log("✅ Database reset complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Reset failed:", err);
    process.exit(1);
  }
}

resetDB();
