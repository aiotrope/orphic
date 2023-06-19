require('express-async-errors')
import mongoose from 'mongoose'

import Todo from '../models/todo'

const createTodo = async (req, res) => {
  const { item } = req.body
  try {
    const currentUser = req.user

    const newItem = new Todo({
      items: item,
      user: mongoose.Types.ObjectId(currentUser.id),
    })

    await Todo.create(newItem)

    return res.status(200).send('ok')
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
}

export default {
  createTodo,
}
