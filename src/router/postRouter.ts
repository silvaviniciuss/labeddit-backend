import express from 'express'
import { PostBusiness } from '../database/business/PostBusiness'
import { PostDatabase } from '../database/PostDatabase'
import { PostController } from '../database/controller/PostController'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { UserDatabase } from '../database/UserDatabase'

export const postRouter = express.Router()

const postController = new PostController (
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new UserDatabase()
    )
)

postRouter.get('/', postController.getPost)
postRouter.post('/', postController.createPost)
postRouter.put('/:id', postController.editPost)
postRouter.delete('/:id', postController.deletePost)
postRouter.put('/:id/like', postController.likeDislikePost)
postRouter.get('/:id/like', postController.getLikeDislikePost)
