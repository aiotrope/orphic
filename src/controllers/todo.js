require('express-async-errors')
import mongoose from 'mongoose'

import Todo from '../models/todo'

const createTodo = async (req, res) => {
  let { items } = req.body

  const currentUser = req.user

  let currentUserTodos = await Todo.findOne({ user: currentUser.id })
  try {
    let str = JSON.stringify(items)
    if (!currentUserTodos) {
      const newItem = new Todo({
        items: str,
        user: mongoose.Types.ObjectId(currentUser.id),
      })

      await Todo.create(newItem)

      return res.status(200).send('ok')
    } else {
      currentUserTodos.items = currentUserTodos.items.concat(str)

      await currentUserTodos.save()
    }

    return res.status(200).send('ok')
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
}

const fetchAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({}).populate('user', { email: 1 })

    res.status(200).json(allTodos)
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
}

export default {
  createTodo,
  fetchAllTodos,
}
