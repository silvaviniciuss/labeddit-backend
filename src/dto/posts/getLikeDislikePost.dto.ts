import { z } from "zod";
import { LikeDislikeDB } from "../../models/Posts";

export interface GetLikeDislikePostInputDTO {
    postId: string,
    token: string
}

export type GetLikeDislikePostOutputDTO = LikeDislikeDB

export const GetLikeDislikeSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as GetLikeDislikePostInputDTO)
