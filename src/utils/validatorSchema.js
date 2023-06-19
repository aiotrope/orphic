import * as yup from 'yup'

/* eslint-disable-next-line no-useless-escape */
const password_regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%^&*()-_+={}[]|\;:"<>,.\]).{8,}$/gm
/* eslint-enable-next-line no-useless-escape */

export const authSchema = yup
  .object({
    email: yup.string().required().email(),
    password: yup
      .string()
      .matches(
        password_regex,
        'letters, numbers and special characters with a minimum of 8 characters'
      ),
  })
  .required()
