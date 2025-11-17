export class PricelistController {
  static async getPricelist(req, res) {
    try {
      const userId = req.user.userId;
      
      const products = [
        { 
          id: 1, 
          articleNo: '1234567890', 
          name: 'This is a test product with fifty characters this!', 
          inPrice: '900500', 
          price: '1500800', 
          unit: 'kilometers/hour', 
          inStock: '2500600', 
          description: 'This is the description with fifty characters this' 
        },
        { 
          id: 2, 
          articleNo: '2345678901', 
          name: 'Sony DSLR 12345', 
          inPrice: '12000', 
          price: '15000', 
          unit: 'piece', 
          inStock: '50', 
          description: 'Professional camera' 
        },
        { 
          id: 3, 
          articleNo: '3456789012', 
          name: 'Random product', 
          inPrice: '1000', 
          price: '1234', 
          unit: 'piece', 
          inStock: '100', 
          description: 'Random product description' 
        },
        { 
          id: 4, 
          articleNo: '4567890123', 
          name: 'Product Four', 
          inPrice: '5000', 
          price: '7500', 
          unit: 'piece', 
          inStock: '200', 
          description: 'Product four description' 
        },
        { 
          id: 5, 
          articleNo: '5678901234', 
          name: 'Product Five', 
          inPrice: '3000', 
          price: '4500', 
          unit: 'piece', 
          inStock: '150', 
          description: 'Product five description' 
        },
      ];
      
      res.json({
        success: true,
        message: 'Pricelist retrieved successfully',
        data: {
          products: products
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

