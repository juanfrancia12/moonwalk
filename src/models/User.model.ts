import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import { ReserveModel } from "./Reserve.model";

export const UserModel: any = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    uri: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
  },
  {
    timestamps: true, // para crear el create_up y update_up
  }
);

// ? RELACION CON RESERVA

UserModel.hasMany(ReserveModel, {
  foreignKey: "userId",
  sourceKey: "id",
});

ReserveModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "id",
});
