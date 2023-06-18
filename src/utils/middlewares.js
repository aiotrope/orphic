import config from './config'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import logger from './logger'

import User from '../models/user'

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else {
    next(createHttpError(401))
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const token = req.token

  const decoded = jwt.decode(token, config.jwt_key)

  const currentUser = await User.findById(decoded.id)

  if (!currentUser || !token || !decoded) {
    next(createHttpError(401))
  } else if (currentUser || token || decoded) {
    req.currentUser = currentUser

    req.name = currentUser.name

    req.user = decoded
  } else {
    next(createHttpError(401))
  }

  next()
}

const stream = {
  write: (message) => logger.http(message),
}

const skip = () => {
  const env = process.env.NODE_ENV || 'development'

  return env !== 'development'
}

const loggingMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)

const endPoint404 = (req, res, next) => {
  next(createHttpError(404))
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({
      error: `${error.name}: invalid ${error.path} using ${error.value}`,
    })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  if (error.name === 'NotFoundError') {
    return res.status(404).json({ error: error.message })
  }
  if (error.name === 'MongoServerError') {
    return res.status(400).json({
      error: `duplicate username ${req.body.username} cannot be registered!`,
    })
  }

  if (error.name === 'TypeError') {
    return res.status(400).json({ error: error.message })
  }

  if (
    error.name === 'JsonWebTokenError' ||
    error.name === 'UnauthorizedError'
  ) {
    return res
      .status(401)
      .json({ error: 'unauthorize: token maybe incorrect or missing!' })
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired!' })
  }

  if (error.message === 'Email already in use.') {
    return res.status(403).json({ email: error.message })
  }

  if (error.message === 'invalid login credentials!') {
    return res.status(403).json({ email: error.message })
  }

  next(error)
}

const middlewares = {
  loggingMiddleware,
  endPoint404,
  errorHandler,
  tokenExtractor,
  userExtractor,
}

export default middlewares
