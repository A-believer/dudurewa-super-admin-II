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
  

export const orderFormSchema = z.object({
    customerName: z.string({
        required_error: "Customer Name is required",
  }),
    shawarmaType: z.string({
        required_error: "Choose a Type",
  }),
    noOfWrap: z.string({
        invalid_type_error: "Invalid Value",
  }),
    location: z.string({
        required_error: "Enter Customer's Name",
  }),
    customerContact: z.string({
        required_error: "Enter Customer Contact",
  }).min(11).max(11),
    riderName: z.string({
        required_error: "Enter Rider's Name",
  }),
    deliveryFee: z.string({
        invalid_type_error: "Invalid Value",
  }),
    deliveryOption: z.string(),
    message: z.string()
})