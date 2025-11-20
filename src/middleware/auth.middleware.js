import jwt from 'jsonwebtoken';

class AuthMiddleware {
  static async authenticate(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: 'No token provided'
        });
      }
      
      const token = authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : authHeader;
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No token provided'
        });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Token verification failed'
      });
    }
  }
}

export default AuthMiddleware;