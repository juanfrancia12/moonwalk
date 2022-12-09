import { compareSync, hashSync } from "bcrypt";
import { UserModel } from "../models/User.model";
import jwt from "jsonwebtoken";
import { SECRET_KEY, expiresIn, JWT_ROUNDS, ID_ROLE_GENERAL } from "../config";

export const registerUser = async (res: any, req: any) => {
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
};

export const loginUser = async (email: string, password: string, res: any) => {
  // Buscar usuario
  UserModel.findOne({
    where: {
      email,
    },
  })
    .then((user: any) => {
      if (!user) {
        res.status(404).json({ msg: "Usuario con este correo no encontrado" });
      } else {
        if (compareSync(password, user.password)) {
          // Creamos el token
          const token = jwt.sign({ user }, SECRET_KEY as string, {
            expiresIn: expiresIn,
          });

          res.json({
            user,
            token,
          });
        } else {
          // Unauthorized Access
          res.status(401).json({ msg: "Contraseña incorrecta" });
        }
      }
    })
    .catch((err: any) => {
      res.status(500).json(err);
    });
};
