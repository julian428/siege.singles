import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name is to short").max(21, "Name is to long"),
  email: z.string().email("Given value is not an email"),
  password: z
    .string()
    .min(8, "Password id too short")
    .max(128, "Password is too long"),
  username: z
    .string()
    .min(1, "Username is to short")
    .max(256, "Username is to long"),
  description: z.string().max(256, "Description is too long"),
});
