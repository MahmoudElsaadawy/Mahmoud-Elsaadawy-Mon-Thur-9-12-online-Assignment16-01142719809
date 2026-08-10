import mongoose from "mongoose";

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
        console.log("connected to database successfully");
      })
      .catch(console.log);
  }
};
