import * as yup from 'yup'

const password_regex = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-{}€"'ÄöäÖØÆ`~_]{8,}$/gm

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
