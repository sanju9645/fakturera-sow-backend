import { query } from '../../config/db.js';

export class Product {
  /**
   * Get all products for a specific user
   */
  static async findByUserId(userId) {
    const result = await query(
      `SELECT id, article_no, name, in_price, price, unit, in_stock, description, created_at, updated_at
        FROM products
        WHERE user_id = $1
        ORDER BY created_at DESC`,
      [userId]
    );
    
    return result.rows;
  }

  /**
   * Get a product by ID and user ID
   */
  static async findByIdAndUserId(productId, userId) {
    const result = await query(
      `SELECT id, article_no, name, in_price, price, unit, in_stock, description, created_at, updated_at
        FROM products
        WHERE id = $1 AND user_id = $2`,
      [productId, userId]
    );
    
    return result.rows[0] || null;
  }

  /**
   * Create a new product
   * @param {Object} productData - Product data
   * @param {number} productData.userId - User ID
   * @param {string} productData.articleNo - Article number
   * @param {string} productData.name - Product name
   * @param {number} productData.inPrice - Incoming price
   * @param {number} productData.price - Selling price
   * @param {string} productData.unit - Unit of measurement
   * @param {number} productData.inStock - Stock quantity
   * @param {string} productData.description - Product description
   * @returns {Promise<Object>} Created product
   */
  static async create(productData) {
    const {
      userId,
      articleNo,
      name,
      inPrice,
      price,
      unit,
      inStock,
      description
    } = productData;

    const result = await query(
      `INSERT INTO products (user_id, article_no, name, in_price, price, unit, in_stock, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, article_no, name, in_price, price, unit, in_stock, description, created_at, updated_at`,
      [userId, articleNo, name, inPrice, price, unit, inStock || 0, description || null]
    );
    
    return result.rows[0];
  }

  /**
   * Update a product
   */
  static async update(productId, userId, productData) {
    const {
      articleNo,
      name,
      inPrice,
      price,
      unit,
      inStock,
      description
    } = productData;

    const result = await query(
      `UPDATE products
        SET article_no = $1, name = $2, in_price = $3, price = $4, unit = $5, in_stock = $6, description = $7, updated_at = CURRENT_TIMESTAMP
        WHERE id = $8 AND user_id = $9
        RETURNING id, article_no, name, in_price, price, unit, in_stock, description, created_at, updated_at`,
      [articleNo, name, inPrice, price, unit, inStock, description, productId, userId]
    );
    
    return result.rows[0] || null;
  }

  /**
   * Delete a product
   */
  static async delete(productId, userId) {
    const result = await query(
      `DELETE FROM products
        WHERE id = $1 AND user_id = $2`,
      [productId, userId]
    );
    
    return result.rowCount > 0;
  }
}

