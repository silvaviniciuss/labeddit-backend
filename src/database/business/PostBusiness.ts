import { CreatePostInputDTO, CreatePostOutputDTO } from "../../dto/posts/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../../dto/posts/delelePost.dto";
import { EditPostsInputDTO, EditPostsOutputDTO } from "../../dto/posts/editPosts.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../../dto/posts/getPosts.dto";
import { LikeDislikePostInputDTO, LikeDislikePostOutputDTO } from "../../dto/posts/likeDislikePost.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotfoundError";
import { LikeDislikeDB, POST_LIKE, Posts, PostsModel } from "../../models/Posts";
import { USER_ROLES } from "../../models/Users";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenManager } from "../../services/TokenManager";
import { PostDatabase } from "../PostDatabase";
import { UserDatabase } from "../UserDatabase";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getPost = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequestError("Token inválido")
        }

        const postsDB = await this.postDatabase.getPosts()

        const posts = postsDB.map((postDB)=>{
            const post = new Posts(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                postDB.creator_id,
                postDB.creator_name
            )

            return post.toPostModel()
        })
            const output: GetPostsOutputDTO = posts
            return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { content, token } = input

        const id = this.idGenerator.generate()

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const newPost = new Posts(
            id,
            content,
            0,
            0,
            new Date().toLocaleString("pt-br"),
            new Date().toLocaleString("pt-br"),
            payload.id,
            payload.name
        )

        const newPostDB = newPost.toDBModel()
        await this.postDatabase.insertPost(newPostDB)

        const output: CreatePostOutputDTO = {
            content: content
        }
        return output

    }

    public editPost =async (input:EditPostsInputDTO): Promise<EditPostsOutputDTO> => {
        const {content, token, idToEdit} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequestError("token inválido")
        }

        const postDB = await this.postDatabase.findPostById(idToEdit)

        if(!postDB) {
            throw new NotFoundError("Post com id inexistente")
        }

        if (payload.id !== postDB.creator_id) {
            throw new BadRequestError("Acesso negado")
        }

        const post = new Posts(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            payload.name
        )

        post.setContent(content)

        const editPostDB = post.toDBModel()
        await this.postDatabase.updatePost(editPostDB)

        const output: EditPostsOutputDTO = undefined

        return output

    }

    public deletePost =async (input:DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const {token, idToDelete} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequestError("Token inválido")
        }

        const postDB = await this.postDatabase.findPostById(idToDelete)

        if(!postDB) {
            throw new BadRequestError("Id inexistente")
        }

        if(payload.role !== USER_ROLES.ADMIN) {
            if(payload.id !== postDB.creator_id) {
                throw new BadRequestError("Acesso negado")
            }
        }

        await this.postDatabase.deletePost(idToDelete)

        const output: DeletePostOutputDTO = undefined

        return output

    }
    
    public likeDislikePost =async (input:LikeDislikePostInputDTO): Promise<LikeDislikePostOutputDTO> => {
        const {token, postId, like} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequestError("Token inválido")
        }

        const postDBWithCreatorName = await this.postDatabase.findPostWithCreatorDBbyId(postId)

        if(!postDBWithCreatorName) {
            throw new NotFoundError("Post inexistente")
        }

        const post = new Posts (
            postDBWithCreatorName.id,
            postDBWithCreatorName.content,
            postDBWithCreatorName.likes,
            postDBWithCreatorName.dislikes,
            postDBWithCreatorName.created_at,
            postDBWithCreatorName.updated_at,
            postDBWithCreatorName.creator_id,
            postDBWithCreatorName.creator_name
        )
        
        const likeDislikeDB: LikeDislikeDB = {
            user_id: payload.id,
            post_id: postId,
            like: like ? 1 : 0
        }

        const likeDislikesExists = await this.postDatabase.findLikeDislike(likeDislikeDB)

        if(likeDislikesExists === POST_LIKE.ALREADY_LIKED) {
            if(like) {
                await this.postDatabase.deleteLikeDislike(likeDislikeDB)
                post.removeLike()
            } else {
                await this.postDatabase.updatedLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislike()
            }
        } else if (likeDislikesExists === POST_LIKE.ALREADY_DISLIKED) {
            if(like === false) {
                await this.postDatabase.deleteLikeDislike(likeDislikeDB)
                post.removeDislike()
            } else {
                await this.postDatabase.updatedLikeDislike(likeDislikeDB)
                post.removeDislike()
                post.addLike()
            }
        } else {
            await this.postDatabase.insertLikeDislike(likeDislikeDB)
            like ? post.addLike() : post.addDislike()
        }
        
        const updatedPostDB = post.toDBModel()
        await this.postDatabase.updatePost(updatedPostDB)

        const output: LikeDislikePostOutputDTO = undefined
        return output
    }
}
