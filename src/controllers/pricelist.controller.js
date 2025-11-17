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
}

