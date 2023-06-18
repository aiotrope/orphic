import config from './utils/config'
import express from 'express'
require('express-async-errors')
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import MongoDatabase from './utils/db'
import middlewares from './utils/middlewares'
import logger from './utils/logger'

import userRouter from './routes/user'

const app = express()

app.set('views', path.join(__dirname, '../views'))

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '../public')))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(cors())

app.use(helmet())

app.use(middlewares.loggingMiddleware)

MongoDatabase()

app.use('/api', userRouter)

app.use(middlewares.endPoint404)

app.use(middlewares.errorHandler)

app.listen(config.port, () => {
  logger.http(`Server is running on port ${config.port}`)
})
