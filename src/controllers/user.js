import config from '../utils/config'
require('express-async-errors')
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user'
//import logger from '../utils/logger'

const signup = async (req, res) => {
  const { email, password } = req.body

  const foundUser = await User.findOne({ email })

  if (foundUser) throw Error('Email already in use.')

  //logger.debug(JSON.stringify(body, null, 2))

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    email: email,
    passwordHash: passwordHash,
  })

  await User.create(newUser)

  return res.status(200).send('ok')
}

const signin = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const correctPassword =
    user !== null ? bcrypt.compare(password, user.passwordHash) : false

  if (!(user && correctPassword)) throw Error('Invalid login credentials!')

  const payload = {
    email: user.email,
    id: user.id,
  }

  const token = jwt.sign(payload, config.secret, { expiresIn: '1h' })

  res.status(200).json({ success: true, token: token })
}

const privateRoute = async (req, res) => {
  try {
    //logger.debug(req.user)
    const currentUser = req.user

    res.status(200).json({ email: currentUser.email })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
}

export default {
  signup,
  signin,
  privateRoute,
}
