import { createClient } from "redis";
import chalk from "chalk";

export const redisClient = createClient({
  url: process.env.REDIS_URI || "redis://127.0.0.1:6379",
})

redisClient.on("connect", () => console.log(chalk.bgGreen("Redis connected successfully")));
redisClient.on("error", (e) => console.log(chalk.bgRed("Redis connection failed: ", e)));