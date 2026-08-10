import mongoose from "mongoose";
import chalk from "chalk";

export const connectDB = async () => {
  const dbUri = process.env.DB_LOCAL_URI;
  const dbVersion = process.env.DB_LOCAL_VERSION;

  if (dbUri) {
    await mongoose
      .connect(dbUri, {
        dbName: `Assignment${dbVersion}`,
        serverSelectionTimeoutMS: 3000,
      })
      .then(() => {
        console.log(chalk.bgGreen("Connected to database successfully"));
      })
      .catch((err) => {
        console.log(chalk.bgRed(err.message));
      });
  }
};
