import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../../errors/BaseError";
import { GetPostsSchema } from "../../dto/posts/getPosts.dto";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostSchema } from "../../dto/posts/createPost.dto";
import { EditPostSchema } from "../../dto/posts/editPosts.dto";
import { DeletePostSchema } from "../../dto/posts/delelePost.dto";
import { LikeDislikeSchema } from "../../dto/posts/likeDislikePost.dto";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    public getPost = async (req: Request, res: Response) => {
        try {
            const input = GetPostsSchema.parse({
                token: req.headers.authorization
            })

            const output = await this.postBusiness.getPost(input)

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

    public createPost = async (req: Request, res: Response) => {
        try {
            const input = CreatePostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            })

            const output = await this.postBusiness.createPost(input)

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

    public editPost = async (req: Request, res: Response) => {
        try {
            const input = EditPostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization,
                idToEdit: req.params.id
            })

            const output = await this.postBusiness.editPost(input)

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

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input = DeletePostSchema.parse({
                token: req.headers.authorization,
                idToDelete: req.params.id
            })

            const output = await this.postBusiness.deletePost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).end("Erro inesperado")
            }
        }
    }
    
    public likeDislikePost = async (req: Request, res: Response) => {
        try {
            const input = LikeDislikeSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
                like: req.body.like
            })

            const output = await this.postBusiness.likeDislikePost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).end("Erro inesperado")
            }
        }
    }
}