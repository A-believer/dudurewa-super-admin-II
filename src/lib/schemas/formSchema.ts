// src/schemas/formSchema.ts

import * as yup from "yup"

export const loginFormSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().min(6).required(),
  })
  .required()


  export const signUpformSchema = yup
    .object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().min(6).required(),
  })
  .required()

  export const todoFormSchema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required()