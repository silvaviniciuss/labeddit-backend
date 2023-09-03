import { z } from "zod"
import { PostCommentModel } from "../../models/PostComment"

export interface GetCommentsInputDTO {
    token: string
}

export type GetCommentsOutputDTO = PostCommentModel[]

export const GetCommentsSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as GetCommentsInputDTO)
