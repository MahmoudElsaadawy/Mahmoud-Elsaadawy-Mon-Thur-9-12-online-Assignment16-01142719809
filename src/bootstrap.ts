import express from "express"
import chalk from "chalk"
import morgan from "morgan"
import { connectDB } from "./DB/mongoose.connection"
import { globalErrorHandler, NotFoundException } from "./utils/error.exceptions"
import authRouter, { routes as authRoutes} from "./modules/auth/auth.controller"
import userRouter, { routes as userRoutes} from "./modules/user/user.controller"
import postRouter, { routes as postRoutes} from "./modules/post/post.controller"
import { redisClient } from "./DB/redis.connection"

export const bootstrap = async()=> {
  const app = express()
  const port = process.env.PORT
  
  await connectDB()
  await redisClient.connect()

  app.use(express.json())
  app.use(morgan("dev"))
  
  app.use(authRoutes.base, authRouter)
  app.use(userRoutes.base, userRouter)
  app.use(postRoutes.base, postRouter)

  app.use(globalErrorHandler)
  app.listen(port, ()=> {
    console.log(chalk.bgGreen(`Server is running on port ${port}`))
  })
}