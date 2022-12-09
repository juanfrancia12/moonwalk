import { Request, Response } from "express";
import { FoodModel } from "../models/Food.model";
import { ReserveModel } from "../models/Reserve.model";
import { UserModel } from "../models/User.model";

export async function getReserves(_req: Request, res: Response) {
  try {
    const foods = await ReserveModel.findAll({
      attributes: ["id", "type", "foodId", "userId", "createdAt", "updatedAt"],
      include: [
        {
          model: UserModel,
          as: "user",
        },
        {
          model: FoodModel,
          as: "food",
        },
      ],
    });
    res.json(foods);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createReserve(req: Request, res: Response) {
  const { type, foodId, userId } = req.body;

  const newReserve = await ReserveModel.create({
    type,
    foodId,
    userId,
  });

  res.json(newReserve);
}

export async function getReserve(_req: Request, res: Response) {
  res.send("data getReserve");
}

export const updateReserve = async (_req: Request, res: Response) => {
  res.send("data updateReserve");
};

export async function deleteReserve(_req: Request, res: Response) {
  res.send("data deleteReserve");
}

export async function getReserveUser(_req: Request, res: Response) {
  res.send("data getReserveUser");
}
