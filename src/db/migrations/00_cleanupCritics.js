exports.up = async function(knex) {
    // Drop the critics table manually if it exists
    await knex.raw("DROP TABLE IF EXISTS critics CASCADE");
    
    // Remove this migration record from the tracking table if it exists
    await knex("knex_migrations").where("name", "03_createCritics.js").del();
  };
  
  exports.down = function(knex) {
    // No rollback needed
    return Promise.resolve();
  };
  