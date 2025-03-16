
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONSTANTS } from '../config/constants';


const {JWT_SECRET} = CONSTANTS;

declare module 'express' {
    export interface Request {
      user?: {
        userId: number;
      };
    }
}
/**
 * Middleware to verify the authentication token from the request header.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 * 
 * @returns If the token is valid, it attaches the userId to the request object and calls the next middleware.
 *          If the token is not provided or invalid, it sends an appropriate error response.
 * 
 * @throws {401} If no token is provided in the request header.
 * @throws {400} If the provided token is invalid.
 */
const verifyAuth = (req: Request, res: Response, next: NextFunction):void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default verifyAuth;