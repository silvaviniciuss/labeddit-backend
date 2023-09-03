import { z } from "zod"

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface LoginOutputDTO {
    token: string,
    nickname: string
}

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
}).transform(data => data as LoginInputDTO)
