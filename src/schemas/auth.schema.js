import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
  }),
  username: z.string({
    required_error: "El username es requerido",
  }),
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "Correo invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
});

export const loginSchema = z.object({
    email: z
      .string({
        required_error: "El correo es requerido",
      })
      .email({
        message: "Correo invalido",
      }),
    password: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      }),
  });  