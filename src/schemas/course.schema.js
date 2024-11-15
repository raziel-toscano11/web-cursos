import { z } from "zod";
import mongoose from 'mongoose'

export const courseSchema = z.object({
  title: z.string({
    required_error: "El título es requerido",
  }).trim(),
  
  
  description: z.string({
    required_error: "La descripción es requerida",
  }),

  price: z.preprocess((val) => parseFloat(val), z.number({
    required_error: "El precio es requerido",
  }).positive({
    message: "El precio debe ser un número positivo",
  })),

  category: z.string({
    required_error: "La categoría es requerida",
  }),

  /* instructor_id: z.string({
    required_error: "El ID del instructor es requerido",
  }).refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "El ID del instructor no es válido",
  }), */

  students: z.array(
    z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "ID de estudiante no válido",
    })
  ).optional()
});

export const courseUpdateSchema = courseSchema.partial();
