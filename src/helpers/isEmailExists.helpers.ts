import { UserModel } from "../models/User.model";

export async function getEmailExists(email: string) {
  const user = await UserModel.findOne({
    where: { email },
  });

  return user;
}
