import express from "express"
import chalk from "chalk"
import morgan from "morgan"
import { connectDB } from "./DB/mongoose.connection"
import { globalErrorHandler, NotFoundException } from "./utils/error.exceptions"
import authRouter from "./modules/auth/auth.controller"
import { redisClient } from "./DB/redis.connection"

export const bootstrap = async()=> {
  const app = express()
  const port = process.env.PORT
  
  await connectDB()
  await redisClient.connect()

  app.use(express.json())
  app.use(morgan("dev"))
  
  app.use("/auth", authRouter)
  
  app.use(globalErrorHandler)
  app.listen(port, ()=> {
    console.log(chalk.bgGreen(`Server is running on port ${port}`))
  })
}