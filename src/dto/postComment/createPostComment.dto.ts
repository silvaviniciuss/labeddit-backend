import { z } from "zod"

export interface CreatePostCommentInputDTO {
    content: string,
    token: string,
    postId: string
}

export interface CreatePostCommentOutputDTO {
    content: string
}

export const CreatePostCommentSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1),
    postId: z.string().min(1)
}).transform(data => data as CreatePostCommentInputDTO)