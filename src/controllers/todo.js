require('express-async-errors')
import mongoose from 'mongoose'

import Todo from '../models/todo'

const createTodo = async (req, res) => {
  const { items } = req.body

  const currentUser = req.user

  let currentUserTodos = await Todo.findOne({ user: currentUser.id })
  try {
    if (!currentUserTodos) {
      const newItem = new Todo({
        items: [items],
        user: mongoose.Types.ObjectId(currentUser.id),
      })

      await Todo.create(newItem)

      return res.status(200).send('ok')
    } else {
      currentUserTodos.items = currentUserTodos.items.concat(items)

      await currentUserTodos.save()

      return res.status(200).send('ok')
    }
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
}

const updateTodo = async (req, res) => {
  const { items } = req.body
  const { id } = req.params

  const updates = { items: items }
  try {
    const filter = { user: id }

    const updateUserTodo = await Todo.findByIdAndUpdate(filter, updates, {
      new: false,
      upsert: true,
    })

    if (updateUserTodo) res.status(200).send('ok')
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
}

export default {
  createTodo,
  updateTodo,
}
