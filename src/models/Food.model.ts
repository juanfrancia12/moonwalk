import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import { ReserveModel } from "./Reserve.model";

export const FoodModel = sequelize.define(
  "food",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    timestamps: true, // para crear el create_up y update_up
  }
);

// ? RELACION CON RESERVA

FoodModel.hasMany(ReserveModel, {
  foreignKey: "foodId",
  sourceKey: "id",
});

ReserveModel.belongsTo(FoodModel, {
  foreignKey: "foodId",
  targetKey: "id",
});
