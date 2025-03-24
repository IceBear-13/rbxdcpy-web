import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const hashPassword = async (plainPassword: string) => {
    try{
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
        return hashedPassword;
    } catch(error){
        console.error(error);
        throw error;
    }
}

export const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
    try{
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch(error){
        console.error(error);
        throw error;
    }

}

export interface AuthRequest extends Request {
    user?: any;
}
  

export const authToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(!token) {
    res.sendStatus(401).json({
      success: false,
      message: 'Access denied, authentication required.'
    })
    return;
  }

  try{
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch(error){
    console.error(error);
    throw error;
  }

  
}
