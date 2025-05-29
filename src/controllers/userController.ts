import { Request, Response } from "express";
import { User } from "../models/User.interface";
import prisma from "../models/User";
import { hashPassword, verifyPass } from "../services/password.services";

export const users = async (req: Request, res: Response): Promise<void> => {
  try {
    const usersDb: User[] = await prisma.usuario.findMany();
    if (usersDb.length === 0) {
      res.status(204).json({ message: "No hay usuarios en la base de datos" });
      return;
    }
    res.status(200).json(usersDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const user = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const userDb: User | null = await prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });

    if (!userDb) {
      res.status(201).json({
        message: `No hay  un usuario con el id ${id} en la base de datos`,
      });
    }

    res.status(200).json(userDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const userUdpated = await prisma.usuario.update({
      where: { id: id },
      data: updatedData,
    });

    res.status(200).json(userUdpated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = prisma.usuario.delete({
      where: { id: id },
    });

    res
      .status(200)
      .json({ deletedUser, message: "Usuario eliminado con exito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario ", error });
  }
};
