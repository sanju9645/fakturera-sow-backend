export class PricelistController {
  static async getPricelist(req, res) {
    try {
      // TODO: Fetch pricelist data from database
      // For now, return mock data
      const pricelist = {
        items: [
          { id: 1, name: 'Item 1', price: 100 },
          { id: 2, name: 'Item 2', price: 200 },
          { id: 3, name: 'Item 3', price: 300 },
        ]
      };

      res.json({
        success: true,
        data: pricelist
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

