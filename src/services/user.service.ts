import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "default-secret";

export const authenticationToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error en la autenticacion: ", err);
      return res.status(403).json({ message: "Acceso restringido" });
    }

    next();
  });
};
