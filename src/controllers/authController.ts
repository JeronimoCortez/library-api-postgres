import { Request, Response } from "express";
import prisma from "../models/User";
import { hashPassword, verifyPass } from "../services/password.services";
import { generatedToken } from "../services/auth.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      res
        .status(204)
        .json({ message: "Debe completar todos los campos requeridos" });
    }

    const existEmailUser = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (existEmailUser) {
      res
        .status(409)
        .json({ message: "Ya hay un usuario registrado con ese email" });
    }

    const passwordHashed = hashPassword(password);
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: await passwordHashed,
      },
    });
    const token = generatedToken(newUser);
    res.status(201).json({ token, message: "Usuario creado con exito" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ message: "El email es obligatorio" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "El password es obligatorio" });
      return;
    }

    const userData = await prisma.usuario.findUnique({ where: { email } });

    if (!userData) {
      res.status(400).json({ message: "No existe un usuario con ese email" });
      return;
    }

    const passCorrect = await verifyPass(password, userData.password);

    if (!passCorrect) {
      res.status(401).json({ message: "La contraseña es incorrecta" });
      return;
    }

    const token = generatedToken(userData);

    res.status(200).json({ token, message: "Se logeo correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrarse ", error });
  }
};
