// src/schemas/formSchema.ts
import { z } from "zod"

export const loginFormSchema = z
  .object({
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "enter a valid email",
  }).email(),
    password: z.string({
    required_error: "password is required",
    invalid_type_error: "password is invalid"
  }).min(6),
  })
  


  export const signUpformSchema = z
    .object({
    username: z.string({
        required_error: "username is required",
        invalid_type_error: "enter a valid username",
  }),
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "enter a valid email",
  }).email(),
    password: z.string({
    required_error: "password is required",
    })
    .min(6)
    .refine((value) => /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value), {
      message: "Password must have at least one capital letter, one number, and one special character.",
    }),
  })
  

  export const todoFormSchema = z
  .object({
    todo: z.string({
    required_error: "you have not entered yor todo",
  }).max(500),
  })
  

    export const orderFormSchema = z
  .object({
    customerName: z.string(),
    shawarmaType: z.string(),
    noOfWrap: z.string(),
    location: z.string(),
    customerContact: z.string().min(11).max(11),
    riderName: z.string(),
    deliveryFee: z.string(),
    deliveryOption: z.string(),
    message: z.string()
  })