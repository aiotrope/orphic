import express from 'express'
import passport from 'passport'

import userController from '../controllers/user'
import todoController from '../controllers/todo'
import middlewares from '../utils/middlewares'
import {
  signupSchema,
  signinSchema,
  createTodoSchema,
} from '../utils/validators'

const router = express.Router()

router.post(
  '/user/register',
  middlewares.validateAuthObject(signupSchema),
  userController.signup
)

router.post(
  '/user/login',
  middlewares.validateAuthObject(signinSchema),
  userController.signin
)

router.get(
  '/private',
  passport.authenticate('jwt', { session: false }),
  userController.privateRoute
)

router.post(
  '/todos',
  middlewares.validateAuthObject(createTodoSchema),
  passport.authenticate('jwt', { session: false }),
  todoController.createTodo
)

router.get(
  '/todos',
  passport.authenticate('jwt', { session: false }),
  todoController.fetchAllTodos
)

export default router
