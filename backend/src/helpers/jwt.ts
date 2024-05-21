import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const createJWT = (payload:any) => {
    return jwt.sign(payload, JWT_SECRET,  {
        expiresIn: "7d",
    })
};

const verifyJWT = (token: string) => {
    try {
        jwt.verify(token,JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

const decodeJWT = (token: string) => {
    return jwt.decode(token);
}

export {
    createJWT,
    verifyJWT,
    decodeJWT
}