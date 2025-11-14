import { query } from '../../config/db.js';

import bcrypt from 'bcryptjs';

export class User {
  static async findByEmail(email) {
    const result = await query(
      `SELECT id, email, password_hash, first_name, last_name, is_active, created_at
        FROM users
        WHERE email = $1`,
      [email]
    );
    
    return result.rows[0] || null;
  }
  
  static async findById(id) {
    const result = await query(
      `SELECT id, email, first_name, last_name, is_active, created_at
        FROM users
        WHERE id = $1 AND is_active = true`,
      [id]
    );
    
    return result.rows[0] || null;
  }
  
  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}