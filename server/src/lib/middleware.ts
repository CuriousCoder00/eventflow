import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

interface JwtPayload {
    id: string;
    email: string;
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.event_plat_token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized: Token missing" });
            return
        }
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = {
            id: decoded.id,
            email: decoded.email
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return
    }
};