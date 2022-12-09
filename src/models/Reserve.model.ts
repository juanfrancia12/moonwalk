import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const ReserveModel = sequelize.define(
  "reserve",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // para crear el create_up y update_up
  }
);
