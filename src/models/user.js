import { Schema, model } from 'mongoose'

const Users = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    bcrypted: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'users',
  }
)

Users.virtual('id').get(function () {
  return this._id.toHexString()
})

const User = model('User', Users)

export default User
