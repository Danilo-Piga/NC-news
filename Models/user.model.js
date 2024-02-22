const db = require("../db/connection");

exports.getAllTheUsers = async () => {
    try {
      const users = await db.query("SELECT username, name, avatar_url FROM users");
      return users.rows;
    } catch (error) {
      throw error;
    }
  };