import { Schema, model } from 'mongoose'

const Users = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      minLength: 8,
      required: true,
      validate: {
        validator: (val) => {
          /* eslint-disable-next-line no-useless-escape */
          return /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm.test(
            val
          )
          /* eslint-enable-next-line no-useless-escape */
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    passwordHash: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'users',
  }
)

Users.virtual('id', {
  id: this.id,
})

const User = model('User', Users)

export default User
