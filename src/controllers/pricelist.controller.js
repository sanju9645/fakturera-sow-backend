import { Product } from '../lib/ops/product.js';

export class PricelistController {
  static async getPricelist(req, res) {
    try {
      const userId = req.user.userId;
      const products = await Product.findByUserId(userId);
      
      const formattedProducts = products.map(product => ({
        id: product.id,
        articleNo: product.article_no,
        name: product.name,
        inPrice: product.in_price.toString(),
        price: product.price.toString(),
        unit: product.unit,
        inStock: product.in_stock.toString(),
        description: product.description || ''
      }));
      
      res.json({
        success: true,
        message: 'Pricelist retrieved successfully',
        data: {
          products: formattedProducts
        }
      });
    } catch (error) {
      console.error('Get pricelist error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  static async updateProduct(req, res) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const { articleNo, name, inPrice, price, unit, inStock, description } = req.body;

      if (!articleNo || !name || inPrice === undefined || price === undefined || !unit || inStock === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      const existingProduct = await Product.findByIdAndUserId(id, userId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      const updateData = {
        articleNo,
        name,
        inPrice: parseFloat(inPrice),
        price: parseFloat(price),
        unit,
        inStock: parseFloat(inStock),
        description: description || null
      };

      const updatedProduct = await Product.update(id, userId, updateData);

      if (!updatedProduct) {
        return res.status(500).json({
          success: false,
          message: 'Failed to update product'
        });
      }

      res.json({
        success: true,
        message: 'Product updated successfully',
        data: {
          id: updatedProduct.id,
          articleNo: updatedProduct.article_no,
          name: updatedProduct.name,
          inPrice: updatedProduct.in_price.toString(),
          price: updatedProduct.price.toString(),
          unit: updatedProduct.unit,
          inStock: updatedProduct.in_stock.toString(),
          description: updatedProduct.description || ''
        }
      });
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

