import {z} from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Некорректный Email"),
  password: z
    .string()
    .min(1, "Пароль обязателен" )
    .min(6, "Пароль дольжен быть не короче 6 символов")
})

export const registerSchema = loginSchema.extend({
  confirmPassword: z
    .string()
    .min(1, "Обязательное поле")
}).superRefine(({password, confirmPassword}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Пароли не совпадают",
      path: ['confirmPassword']
    })
  }
})

export type LoginFormData  = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>