import config from '../utils/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { authSchema } from '../utils/validatorSchema'

import User from '../models/user'

const signup = async (req, res) => {
  const { body } = req

  const foundUser = await User.findOne({ email: req.body.email })

  if (foundUser) {
    throw Error('Email already in use.')
  }

  try {
    const data = authSchema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (data) {
      const saltRounds = 10

      const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

      const user = new User({
        email: req.body.email,
        passwordHash: passwordHash,
      })

      await User.create(user)

      return res.status(200).send(res.status.message)
    }
  } catch (err) {
    return res.status(422).json({ errors: err.message })
  }
}

const signin = async (req, res) => {
  const { body } = req

  const user = await User.findOne({ email: req.body.email })

  const verifyPassword = bcrypt.compare(req.body.password, user.passwordHash)

  if (!verifyPassword) throw Error('invalid login credentials!')

  try {
    const data = authSchema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (data) {
      const payload = {
        username: user.email,
        id: user.id,
      }

      const token = jwt.sign(payload, config.secret, { expiresIn: '1h' })

      res.status(200).json({ success: true, token: token })
    }
  } catch (err) {
    return res.status(422).json({ errors: err.message })
  }
}

export default {
  signup,
  signin,
}
