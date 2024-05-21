import { Response, NextFunction } from "express"
import { decodeJWT, verifyJWT } from "../helpers/jwt"
import { UserAuthRequest } from "../helpers/types";

const authMiddleware = (req:UserAuthRequest, res:Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            error: "Invalid token/format",
        });
    }

    const token = authHeader.split(' ')[1];

    const isValid = verifyJWT(token);
    if (!isValid) {
        return res.status(403).json({
            error: "Invalid token/format",
        });
    }

    const decodedValue:any = decodeJWT(token);
    if (!decodedValue || !decodedValue.id) {
        return res.status(403).json({
            error: "Invalid token/format",
        });
    }

    req.userId = decodedValue.id;
    next();
}

export default authMiddleware;