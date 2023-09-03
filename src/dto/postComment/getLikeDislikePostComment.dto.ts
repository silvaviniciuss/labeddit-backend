import { z } from "zod";
import { LikeDislikePostCommentDB } from "../../models/PostComment";

export interface GetLikeDislikePostCommentInputDTO {
    postCommentId: string,
    token: string
}

export type GetLikeDislikePostCommentOutputDTO = LikeDislikePostCommentDB

export const GetLikeDislikePostCommentSchema = z.object({
    postCommentId: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as GetLikeDislikePostCommentInputDTO)