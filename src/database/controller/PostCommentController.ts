import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../../errors/BaseError";
import { GetPostCommentSchema } from "../../dto/postComment/getPostComment.dto";
import { PostCommentBusiness } from "../business/PostCommentBusiness";
import { CreatePostCommentSchema } from "../../dto/postComment/createPostComment.dto";
import { EditPostCommentSchema } from "../../dto/postComment/editPostComment.dto";
import { DeletePostCommentSchema } from "../../dto/postComment/deletePostComment.dto";
import { LikeDislikePostCommentSchema } from "../../dto/postComment/likeDislikePostComment.dto";
import { GetLikeDislikePostCommentSchema} from "../../dto/postComment/getLikeDislikePostComment.dto";
import { GetCommentsSchema } from "../../dto/postComment/getComments.dto";

export class PostCommentController {
    constructor(
        private postCommentBusiness: PostCommentBusiness
    ) { }


    public getComments = async (req: Request, res: Response) => {
        try {
            const input = GetCommentsSchema.parse({
                token: req.headers.authorization
            })

            const output = await this.postCommentBusiness.getComments(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public getPostComment = async (req: Request, res: Response) => {
        try {
            const input = GetPostCommentSchema.parse({
                token: req.headers.authorization,
                idToFind: req.params.id
            })

            const output = await this.postCommentBusiness.getPostComment(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createPostComment = async (req: Request, res: Response) => {
        try {
            const input = CreatePostCommentSchema.parse({
                content: req.body.content,
                token: req.headers.authorization,
                postId: req.params.id
            })

            const output = await this.postCommentBusiness.createPostComment(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPostComment = async (req: Request, res: Response) => {
        try {
            const input = EditPostCommentSchema.parse({
                content: req.body.content,
                token: req.headers.authorization,
                idToEdit: req.params.id
            })

            const output = await this.postCommentBusiness.editPostComment(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePostComment = async (req: Request, res: Response) => {
        try {
            const input = DeletePostCommentSchema.parse({
                token: req.headers.authorization,
                idToDelete: req.params.id
            })

            const output = await this.postCommentBusiness.deletePostComment(input)
            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeDislikePostComment = async (req: Request, res: Response) => {
        try {
            const input = LikeDislikePostCommentSchema.parse({
                token: req.headers.authorization,
                postCommentId: req.params.id,
                like: req.body.like
            })

            const output = await this.postCommentBusiness.likeDislikePostComment(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    } 

    public getLikeDislikePostComment = async (req: Request, res: Response) => {
        try {
            const input = GetLikeDislikePostCommentSchema.parse({
                postCommentId: req.params.id,
                token: req.headers.authorization
            })

            const output = await this.postCommentBusiness.getLikeDislikePostComment(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    } 
}
