import { Request, Response } from "express";
import { UserModel } from "../models/User.model";

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await UserModel.findAll({
      attributes: [
        "id",
        "name",
        "lastname",
        "email",
        "password",
        "uri",
        "role",
        "createdAt",
        "updatedAt",
      ],
      order: [["id", "DESC"]],
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// function emailIsValid (email:string) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
// }

export async function createUser(req: Request, res: Response) {
  const { name, lastname, email, password } = req.body;

  // const isValue = await emailIsValid(email)

  const URI_REX = email.match(/^([^@]*)@/);
  const URI = URI_REX ? "@" + URI_REX[1] : null;

  const ROLE = 50;

  const newUser = await UserModel.create({
    name,
    lastname,
    email,
    password,
    uri: URI,
    role: ROLE,
  });

  res.json(newUser);
}

export async function getUser(_req: Request, res: Response) {
  res.send("data getUser");
}

export const updateUser = async (_req: Request, res: Response) => {
  res.send("data updateUser");
};

export async function deleteUser(_req: Request, res: Response) {
  res.send("data deleteUser");
}

export async function getUserTasks(_req: Request, res: Response) {
  res.send("data getUserTasks");
}
