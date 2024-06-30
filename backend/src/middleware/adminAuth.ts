import { Response, NextFunction } from 'express';
import prisma from '../db';
import { decodeJWT } from '../helpers/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { UserAuthRequest } from '../helpers/types';

export const isAdmin = async (req: UserAuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = decodeJWT(token);

    if (!decoded || typeof decoded === 'string' || !('id' in decoded)) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await prisma.user.findFirst({
      where: { id: (decoded as JwtPayload).id },
    });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    req.userId = user?.id;
    next();
  } catch (error) {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};