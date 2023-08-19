import express from 'express'
import { PostCommentController } from '../database/controller/PostCommentController'
import { PostCommentBusiness } from '../database/business/PostCommentBusiness'
import { PostCommentDatabase } from '../database/PostCommentDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const postCommentRouter = express.Router()

const postCommentController = new PostCommentController(
    new PostCommentBusiness(
        new PostCommentDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postCommentRouter.get('/:id', postCommentController.getPostComment)
postCommentRouter.post('/:id', postCommentController.createPostComment)
postCommentRouter.put('/:id', postCommentController.editPostComment)
postCommentRouter.delete('/:id', postCommentController.deletePostComment)
postCommentRouter.put('/:id/like', postCommentController.likeDislikePostComment)
