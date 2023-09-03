import { GetLikeDislikePostCommentDB, GetPostCommentDB, LikeDislikePostCommentDB, POST_COMMENT_LIKE, PostCommentDB } from "../models/PostComment";
import { BaseDatabase } from "./BaseDatabase";
import { PostDatabase } from "./PostDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostCommentDatabase extends BaseDatabase {
    public static TABLE_POST_COMMENT = "post_comments"
    public static TABLE_LIKES_DISLIKES_POST_COMMENT = "likes_dislikes_post_comments"

    
    public findPostCommentWithCreatorDBByPostId = async (id: string): Promise<GetPostCommentDB[]> => {
        const response = await BaseDatabase
            .connection(PostCommentDatabase.TABLE_POST_COMMENT)
            .select(
                `${PostCommentDatabase.TABLE_POST_COMMENT}.id`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.post_id`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.creator_id`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.content`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.likes`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.dislikes`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.created_at`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickname`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .join(`${PostDatabase.TABLE_POSTS}`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.post_id`,
                "=",
                `${PostDatabase.TABLE_POSTS}.id`)
            .where({ [`${PostCommentDatabase.TABLE_POST_COMMENT}.post_id`]: id })

        return response

    }

    public findPostCommentWithCreatorDBByPostCommentId = async (id: string): Promise<GetPostCommentDB[]> => {
        const response = await BaseDatabase
            .connection(PostCommentDatabase.TABLE_POST_COMMENT)
            .select(
                `${PostCommentDatabase.TABLE_POST_COMMENT}.id`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.post_id`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.creator_id`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.content`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.likes`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.dislikes`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.created_at`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickname`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .join(`${PostDatabase.TABLE_POSTS}`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.post_id`,
                "=",
                `${PostDatabase.TABLE_POSTS}.id`)
            .where({ [`${PostCommentDatabase.TABLE_POST_COMMENT}.id`]: id })

        return response

    }
    
    public findPostCommentWithCreatorDB = async (): Promise<GetPostCommentDB[]> => {
        const response = await BaseDatabase
            .connection(PostCommentDatabase.TABLE_POST_COMMENT)
            .select(
                `${PostCommentDatabase.TABLE_POST_COMMENT}.id`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.post_id`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.creator_id`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.content`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.likes`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.dislikes`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.created_at`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickname`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .join(`${PostDatabase.TABLE_POSTS}`,
                `${PostCommentDatabase.TABLE_POST_COMMENT}.post_id`,
                "=",
                `${PostDatabase.TABLE_POSTS}.id`
            )
            
        return response

    }

    public insertPostComment = async (newPostCommentDB: PostCommentDB): Promise<void> => {
        await BaseDatabase
            .connection(PostCommentDatabase.TABLE_POST_COMMENT)
            .insert(newPostCommentDB)
    }

    public findPostCommentByid = async (id: string): Promise<PostCommentDB | undefined> => {
        const [response] = await BaseDatabase
            .connection(PostCommentDatabase.TABLE_POST_COMMENT)
            .where({ id })
        return response as PostCommentDB | undefined
    }

    public updatePostComment = async (editPostCommentDB: PostCommentDB): Promise<void> => {
        await BaseDatabase
            .connection(PostCommentDatabase.TABLE_POST_COMMENT)
            .update(editPostCommentDB)
            .where({ id: editPostCommentDB.id })
    }

    public deletePostComment = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(PostCommentDatabase.TABLE_POST_COMMENT)
            .delete()
            .where({ id })
    }

    public findLikeDislikePostComment = async (likeDislikePostCommentDB: LikeDislikePostCommentDB): Promise<POST_COMMENT_LIKE | undefined> => {
        const [response] = await BaseDatabase
            .connection(PostCommentDatabase.TABLE_LIKES_DISLIKES_POST_COMMENT)
            .where({
                user_id: likeDislikePostCommentDB.user_id,
                post_comment_id: likeDislikePostCommentDB.post_comment_id
            })

        if (response === undefined) {
            return undefined
        } else if (response.like === 1) {
            return POST_COMMENT_LIKE.ALREADY_LIKED
        } else {
            return POST_COMMENT_LIKE.ALREADY_DISLIKED
        }
    }

    public getLikeDislikePostComment = async (getLikeDislikeDB: GetLikeDislikePostCommentDB): Promise<LikeDislikePostCommentDB> => {
        const [response] = await BaseDatabase
            .connection(PostCommentDatabase.TABLE_LIKES_DISLIKES_POST_COMMENT)
            .where({
                user_id: getLikeDislikeDB.user_id,
                post_comment_id: getLikeDislikeDB.post_comment_id
            })

        return response
    }

    public deleteLikeDislikeComment = async (likeDislikePostCommentDB: LikeDislikePostCommentDB): Promise<void> => {
        await BaseDatabase
            .connection(PostCommentDatabase.TABLE_LIKES_DISLIKES_POST_COMMENT)
            .delete()
            .where({
                user_id: likeDislikePostCommentDB.user_id,
                post_comment_id: likeDislikePostCommentDB.post_comment_id
            })
    }

    public updatedLikeDislikePostComment = async (likeDislikePostCommentDB: LikeDislikePostCommentDB): Promise<void> => {
        await BaseDatabase
            .connection(PostCommentDatabase.TABLE_LIKES_DISLIKES_POST_COMMENT)
            .update(likeDislikePostCommentDB)
            .where({
                user_id: likeDislikePostCommentDB.user_id,
                post_comment_id: likeDislikePostCommentDB.post_comment_id
            })
    }

    public insertLikeDislikePostComment = async (likeDislikePostCommentDB: LikeDislikePostCommentDB): Promise<void> => {
        await BaseDatabase
            .connection(PostCommentDatabase.TABLE_LIKES_DISLIKES_POST_COMMENT)
            .insert(likeDislikePostCommentDB)
            .where({
                user_id: likeDislikePostCommentDB.user_id,
                post_comment_id: likeDislikePostCommentDB.post_comment_id
            })
    }

}