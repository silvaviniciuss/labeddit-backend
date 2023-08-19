import { z } from "zod";

export interface DeletePostCommentInputDTO {
    token: string,
    idToDelete: string
}

export type DeletePostCommentOutputDTO = undefined

export const DeletePostCommentSchema = z.object({
    token: z.string().min(1),
    idToDelete: z.string().min(1)
}).transform(data => data as DeletePostCommentInputDTO)