import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

interface JwtInterface {
    sub: string,
    email: string
}


const authUser = async (req: Request & {user? : {id: string; email: string}}, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const bearer = header?.startsWith('Bearer ') ? header.slice(7): undefined;
    const token = req.cookies?.token || bearer;

    if(!token) return res.status(401).json({message: "Not authenticated"});

    try {
     const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtInterface;
     req.user = {id: payload.sub, email: payload.email};
     next();
    } catch (error) {
        res.status(401).json({ message: error instanceof Error ? error.message : "Invalid token" });
    }
}

export default authUser;