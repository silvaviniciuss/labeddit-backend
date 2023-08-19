import  z from "zod"
import { UserModel } from "../../models/Users"

export interface GetUsersInputDTO {
    nickname: string,
    token: string
}

export type GetUsersOutputDTO = UserModel[]

export const GetUsersSchema = z.object({
    nickname: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform(data => data as GetUsersInputDTO)
