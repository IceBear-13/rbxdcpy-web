import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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

export const verifyToken = async (token: string) => {
    try{
        const verified = jwt.verify(token, JWT_SECRET_KEY);
        return verified
    } catch(error){
        console.error(error);
        throw error;
    }
}

