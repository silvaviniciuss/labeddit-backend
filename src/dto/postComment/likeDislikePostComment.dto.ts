import { z } from "zod";

export interface LikeDislikePostCommentInputDTO {
    postCommentId: string,
    token: string,
    like: boolean
}

export type LikeDislikePostCommentOutputDTO = undefined

export const LikeDislikePostCommentSchema = z.object({
    postCommentId: z.string().min(1),
    token: z.string().min(1),
    like: z.boolean()
}).transform(data => data as LikeDislikePostCommentInputDTO)