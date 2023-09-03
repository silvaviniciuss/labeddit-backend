import { CreatePostCommentInputDTO, CreatePostCommentOutputDTO } from "../../dto/postComment/createPostComment.dto";
import { DeletePostCommentInputDTO, DeletePostCommentOutputDTO } from "../../dto/postComment/deletePostComment.dto";
import { EditPostCommentInputDTO, EditPostCommentOutputDTO } from "../../dto/postComment/editPostComment.dto";
import { GetCommentsInputDTO, GetCommentsOutputDTO } from "../../dto/postComment/getComments.dto";
import { GetLikeDislikePostCommentInputDTO, GetLikeDislikePostCommentOutputDTO } from "../../dto/postComment/getLikeDislikePostComment.dto";
import { GetPostCommentInputDTO, GetPostCommentOutputDTO } from "../../dto/postComment/getPostComment.dto";
import { LikeDislikePostCommentInputDTO, LikeDislikePostCommentOutputDTO } from "../../dto/postComment/likeDislikePostComment.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotfoundError";
import { GetLikeDislikePostCommentDB, LikeDislikePostCommentDB, POST_COMMENT_LIKE, PostComment } from "../../models/PostComment";
import { USER_ROLES } from "../../models/Users";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenManager } from "../../services/TokenManager";
import { PostCommentDatabase } from "../PostCommentDatabase";

export class PostCommentBusiness {
    constructor(
        private postCommentDatabase: PostCommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getComments = async (input: GetCommentsInputDTO): Promise<GetCommentsOutputDTO> => {
        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const postCommentsDB = await this.postCommentDatabase.findPostCommentWithCreatorDB()

        const postComments = postCommentsDB.map((postCommentDB) => {
            const postComment = new PostComment(
                postCommentDB.id,
                postCommentDB.post_id,
                postCommentDB.content,
                postCommentDB.likes,
                postCommentDB.dislikes,
                postCommentDB.created_at,
                postCommentDB.updated_at,
                postCommentDB.creator_id,
                postCommentDB.creator_nickname
            )

            return postComment.toPostCommentModel()
        })

        const output: GetCommentsOutputDTO = postComments
        return output

    }

    public getPostComment = async (input: GetPostCommentInputDTO): Promise<GetPostCommentOutputDTO> => {
        const { token, idToFind } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const postCommentsDB = await this.postCommentDatabase.findPostCommentWithCreatorDBByPostId(idToFind)

        if (!postCommentsDB) {
            throw new NotFoundError("Post com id inexistente")
        }

        const postComments = postCommentsDB.map((postCommentDB) => {
            const postComment = new PostComment(
                postCommentDB.id,
                postCommentDB.post_id,
                postCommentDB.content,
                postCommentDB.likes,
                postCommentDB.dislikes,
                postCommentDB.created_at,
                postCommentDB.updated_at,
                postCommentDB.creator_id,
                postCommentDB.creator_nickname
            )

            return postComment.toPostCommentModel()
        })

        const output: GetPostCommentOutputDTO = postComments
        return output

    }

    public createPostComment = async (input: CreatePostCommentInputDTO): Promise<CreatePostCommentOutputDTO> => {
        const {content, token, postId} = input

        const id = this.idGenerator.generate()

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const newPostComment = new PostComment(
            id,
            postId,
            content,
            0,
            0,
            new Date().toLocaleString("pt-br"),
            new Date().toLocaleString("pt-br"),
            payload.id,
            payload.nickname
        )

        const newPostCommentDB = newPostComment.toPostCommentDBModel()

        await this.postCommentDatabase.insertPostComment(newPostCommentDB)

        const output: CreatePostCommentOutputDTO = {
            content: content
        }

        return output
    }

    public editPostComment = async (input:EditPostCommentInputDTO): Promise<EditPostCommentOutputDTO> => {
        const {content, token, idToEdit} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequestError("token inválido")
        }

        const postCommentDB = await this.postCommentDatabase.findPostCommentByid(idToEdit)

        if(!postCommentDB) {
            throw new NotFoundError("Comentário com id inexistente")
        }

        if (payload.id !== postCommentDB.creator_id) {
            throw new BadRequestError("Acesso negado: somente o criador do comentário pode editá-lo")
        }

        const postComment = new PostComment(
            postCommentDB.id,
            postCommentDB.post_id,
            postCommentDB.content,
            postCommentDB.likes,
            postCommentDB.dislikes,
            postCommentDB.created_at,
            postCommentDB.updated_at,
            postCommentDB.creator_id,
            payload.nickname
        )

        postComment.setContent(content)
        postComment.setUpdatedAt(new Date().toLocaleString("pt-br"))

        const editPostCommentDB = postComment.toPostCommentDBModel()
        await this.postCommentDatabase.updatePostComment(editPostCommentDB)

        const output: EditPostCommentOutputDTO = undefined

        return output

    }

    public deletePostComment =async (input:DeletePostCommentInputDTO): Promise<DeletePostCommentOutputDTO> => {
        const {token, idToDelete} = input
        
        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequestError("Token inválido")
        }

        const postCommentDB = await this.postCommentDatabase.findPostCommentByid(idToDelete)

        if(!postCommentDB) {
            throw new NotFoundError("Id inexistente")
        }

        if(payload.role !== USER_ROLES.ADMIN) {
            if(payload.id !== postCommentDB.creator_id) {
                throw new BadRequestError("Acesso negado")
            }
        }

        await this.postCommentDatabase.deletePostComment(idToDelete)

        const output: DeletePostCommentOutputDTO = undefined

        return output
    }

    public likeDislikePostComment = async (input:LikeDislikePostCommentInputDTO):Promise<LikeDislikePostCommentOutputDTO> => {
        const {token, postCommentId, like} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequestError("Token inválido")
        }

        const [postCommentDBWithCreatorName] = await this.postCommentDatabase.findPostCommentWithCreatorDBByPostCommentId(postCommentId)

        if(!postCommentDBWithCreatorName) {
            throw new BadRequestError("Comentário inexistente")
        }

       const postComment = new PostComment(
        postCommentDBWithCreatorName.id,
        postCommentDBWithCreatorName.post_id,
        postCommentDBWithCreatorName.content,
        postCommentDBWithCreatorName.likes,
        postCommentDBWithCreatorName.dislikes,
        postCommentDBWithCreatorName.created_at,
        postCommentDBWithCreatorName.updated_at,
        postCommentDBWithCreatorName.creator_id,
        postCommentDBWithCreatorName.creator_nickname
       )

        const likeDislikePostCommentDB: LikeDislikePostCommentDB = {
            user_id: payload.id,
            post_comment_id: postCommentId,
            like: like ? 1 : 0
        }

        const likeDislikesPostCommentExists = await this.postCommentDatabase.findLikeDislikePostComment(likeDislikePostCommentDB)

        if(likeDislikesPostCommentExists === POST_COMMENT_LIKE.ALREADY_LIKED) {
            if(like) {
                await this.postCommentDatabase.deleteLikeDislikeComment(likeDislikePostCommentDB)
                postComment.removeLike()
            } else {
                await this.postCommentDatabase.updatedLikeDislikePostComment(likeDislikePostCommentDB)
                postComment.removeLike()
                postComment.addDislike()
            }
        } else if (likeDislikesPostCommentExists === POST_COMMENT_LIKE.ALREADY_DISLIKED) {
            if(like === false) {
                await this.postCommentDatabase.deleteLikeDislikeComment(likeDislikePostCommentDB)
                postComment.removeDislike()
            } else {
                await this.postCommentDatabase.updatedLikeDislikePostComment(likeDislikePostCommentDB)
                postComment.removeDislike()
                postComment.addLike()
            }
        } else {
            await this.postCommentDatabase.insertLikeDislikePostComment(likeDislikePostCommentDB)
            like ? postComment.addLike() : postComment.addDislike()
        }

        const updatedPostCommentDB = postComment.toPostCommentDBModel()

        await this.postCommentDatabase.updatePostComment(updatedPostCommentDB)

        const output: LikeDislikePostCommentOutputDTO = undefined

        return output
    }
    
    public getLikeDislikePostComment = async (input: GetLikeDislikePostCommentInputDTO): Promise<GetLikeDislikePostCommentOutputDTO> => {
        const { token, postCommentId } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const postDBExist = await this.postCommentDatabase.findPostCommentByid(postCommentId)

        if (!postDBExist) {
            throw new NotFoundError("Post inexistente")
        }

        const getLikeDislikeDB: GetLikeDislikePostCommentDB = {
            user_id: payload.id,
            post_comment_id: postCommentId
        }

        const likeDislikes = await this.postCommentDatabase.getLikeDislikePostComment(getLikeDislikeDB)

        const output: GetLikeDislikePostCommentOutputDTO = likeDislikes

        return output
    }
}
