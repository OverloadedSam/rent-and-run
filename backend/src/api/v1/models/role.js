const { db } = require('../config');

class Role {
  constructor(role) {
    this.role = role;
  }

  // Add a new role for users.
  async addRole() {
    const query = `
      INSERT INTO roles
      VALUES (DEFAULT, ?);`;

    return db.execute(query, [this.role.description]);
  }

  // Update the role description.
  async updateRole() {
    const query = `
      UPDATE roles
      SET role = ?
      WHERE id = ?;`;

    return db.execute(query, [this.role.description, this.role.id]);
  }

  // Get all roles.
  static async getRoles() {
    const query = `SELECT * FROM roles;`;

    return db.execute(query);
  }
}

module.exports = Role;
