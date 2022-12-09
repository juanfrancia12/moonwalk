import app from "./app";
import { sequelize } from "./database";

import "./models/Food.model";
import "./models/User.model";
import "./models/Reserve.model";

async function main() {
  try {
    //   await sequelize.authenticate();
    //   console.log("success connection");

    await sequelize.sync({ force: true });
    app.listen(app.get("PORT"), () => {
      console.log(`Server running on port ${app.get("PORT")}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
