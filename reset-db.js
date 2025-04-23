require("dotenv").config();
const path = require("path");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: path.join(__dirname, "src", "db", "migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "src", "db", "seeds"),
  },
});

async function resetAndSetup() {
  try {
    console.log("🧹 Dropping existing tables...");

    // drop in correct order to handle foreign key constraints
    await db.schema.hasTable("movies_theaters").then((exists) => exists && db.schema.dropTable("movies_theaters"));
    await db.schema.hasTable("reviews").then((exists) => exists && db.schema.dropTable("reviews"));
    await db.schema.hasTable("critics").then((exists) => exists && db.schema.dropTable("critics"));
    await db.schema.hasTable("theaters").then((exists) => exists && db.schema.dropTable("theaters"));
    await db.schema.hasTable("movies").then((exists) => exists && db.schema.dropTable("movies"));

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
