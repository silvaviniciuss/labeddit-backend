import { z } from "zod"
import { PostCommentModel } from "../../models/PostComment"

export interface GetPostCommentInputDTO {
    token: string,
    idToFind: string
}

export type GetPostCommentOutputDTO = PostCommentModel[]

export const GetPostCommentSchema = z.object({
    token: z.string().min(1),
    idToFind: z.string().min(1)
}).transform(data => data as GetPostCommentInputDTO)