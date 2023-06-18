import express from 'express'

import userController from '../controllers/user'

const router = express.Router()

router.post('/user/register', userController.signup)

router.post('/user/login', userController.sigin)

export default router
