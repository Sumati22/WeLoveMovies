require("dotenv").config();
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

async function resetAndSetup() {
  try {
    console.log("🧹 Dropping and recreating public schema...");
    await db.raw("DROP SCHEMA public CASCADE;");
    await db.raw("CREATE SCHEMA public;");

    console.log("📦 Running migrations...");
    await db.migrate.latest();

    console.log("🌱 Seeding database...");
    await db.seed.run();

    console.log("✅ Reset, migration, and seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

resetAndSetup();
