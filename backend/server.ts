import { configDotenv } from "dotenv";

import mongoose from "mongoose";
import app from "./app";

configDotenv();

const connectToDb = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL!);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
  }
};
connectToDb();

app.listen(process.env.PORT, () => {
  console.log("Server is running of PORT", process.env.PORT);
});
