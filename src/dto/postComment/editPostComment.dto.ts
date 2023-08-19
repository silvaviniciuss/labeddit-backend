import { z } from "zod"

export interface EditPostCommentInputDTO {
    content: string,
    token: string,
    idToEdit: string
}

export type EditPostCommentOutputDTO = undefined


export const EditPostCommentSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1),
    idToEdit: z.string().min(1)
}).transform(data => data as EditPostCommentInputDTO)