import { Request, Response } from "express";
import { FoodModel } from "../models/Food.model";

export async function getFoods(_req: Request, res: Response) {
  try {
    const foods = await FoodModel.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "type",
        "date",
        "createdAt",
        "updatedAt",
      ],
      order: [["id", "DESC"]],
    });
    res.json(foods);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createFood(req: Request, res: Response) {
  const { name, description, type } = req.body;

  const DATE = new Date().toLocaleDateString();

  const newFood = await FoodModel.create({
    name,
    description,
    type,
    date: DATE,
  });

  res.json(newFood);
}

export async function getFood(_req: Request, res: Response) {
  res.send("data getFood");
}

export const updateFood = async (_req: Request, res: Response) => {
  res.send("data updateFood");
};

export async function deleteFood(_req: Request, res: Response) {
  res.send("data deleteFood");
}

export async function getFoodUser(_req: Request, res: Response) {
  res.send("data getFoodUser");
}
