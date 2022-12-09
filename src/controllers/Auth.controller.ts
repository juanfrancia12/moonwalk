import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { JWT_ROUNDS, ID_ROLE_GENERAL, SECRET_KEY, expiresIn } from "../config";
import { UserModel } from "../models/User.model";
import jwt from "jsonwebtoken";

// TODO: INICIAR SESION

export async function LoginUserAuth(req: Request, res: Response) {
  const { email, password } = req.body;
  // Buscar usuario
  UserModel.findOne({
    where: {
      email,
    },
  })
    .then((user: any) => {
      if (!user) {
        res.status(404).json({ msg: "Usuario con este correo no encontrado" });
        return;
      }

      console.log({ user });

      if (!compareSync(password, user.password)) {
        res.status(401).json({ msg: "Contraseña incorrecta" });
        return;
      }

      // Creamos el token
      const token = jwt.sign({ user }, SECRET_KEY as string, {
        expiresIn: expiresIn,
      });

      res.json({
        user,
        token,
      });
      return;
    })
    .catch((err: any) => {
      res.status(500).json({ msg: "error", err });
      return;
    });
}

export async function RegisterUserAuth(req: Request, res: Response) {
  const { name, lastname, email, password } = req.body;
  // Encriptamos la contraseña
  const passwordHash = hashSync(
    password,
    Number.parseInt(JWT_ROUNDS as string)
  );

  const URI_REX = email.match(/^([^@]*)@/);
  const URI = URI_REX ? "@" + URI_REX[1] : null;

  // Crear un usuario
  UserModel.create({
    name,
    lastname,
    email,
    password: passwordHash,
    uri: URI,
    role: ID_ROLE_GENERAL,
  })
    .then((user: any) => {
      // Creamos el token
      const token = jwt.sign({ user: user }, SECRET_KEY as string, {
        expiresIn: expiresIn,
      });

      res.json({
        user: user,
        token: token,
      });
    })
    .catch((err: any) => {
      res.status(500).json(err);
    });
}

// const newFood = await FoodModel.create({
//   name,
//   description,
//   type,
//   date: DATE,
// });

// res.json(newFood);
