const config = require('config');
const { v4: generateUuid } = require('uuid');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config');

class User {
  constructor(user) {
    this.user = user;

    if (!this.user.id) this.user.id = generateUuid();
  }

  // Save user to the DB.
  async addUser() {
    const query = `INSERT INTO users SET ?;`;
    this.user.password = await this.generateHashedPassword();

    return db.query(query, this.user);
  }

  // Update user in the DB.
  async updateUser() {
    const query = `
      UPDATE users SET ?
      WHERE id = ?;`;

    if (this.user.password) {
      this.user.password = await this.generateHashedPassword();
    }

    return db.query(query, [this.user, this.user.id]);
  }

  // Create an auth token for client.
  generateAuthToken() {
    const { id, email, role } = this.user;
    const privileges = role || 1;
    const payload = {
      id,
      email,
      privileges, // By default every registered user has customer privileges i.e = 1.
    };
    const secret = config.get('SECRET_KEY');

    return jwt.sign(payload, secret);
  }

  // Create hash for a password (private method).
  async generateHashedPassword() {
    const salt = await bcryptjs.genSalt(Number(config.get('SALT')));

    return bcryptjs.hash(this.user.password, salt);
  }

  // Asynchronously match the password.
  async matchPassword(password) {
    return bcryptjs.compare(password, this.user.password);
  }

  // Find a user by user_id.
  static async getUserById(userId) {
    const query = `SELECT * FROM users WHERE id = ?;`;
    return db.execute(query, [userId]);
  }

  // Find a user by email.
  static async getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;

    return db.execute(query, [email]);
  }

  // Find a user by phone.
  static async getUserByPhone(phone) {
    const query = `SELECT * FROM users WHERE phone = ?`;

    return db.query(query, [phone]);
  }
}

module.exports = User;
