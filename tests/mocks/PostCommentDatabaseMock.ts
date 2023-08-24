import { BaseDatabase } from "../../src/database/BaseDatabase"
import { GetPostCommentDB, LikeDislikePostCommentDB, POST_COMMENT_LIKE, PostCommentDB } from "../../src/models/PostComment"

const postCommentMock: PostCommentDB[] = [
    {
        id: "id-mock-postComment1",
        creator_id: "id-mock-fulano",
        post_id: "id-mock-post1",
        content: "content-commnet-mock1",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "id-mock-postComment2",
        creator_id: "id-mock-fulano",
        post_id: "id-mock-post2",
        content: "content-commnet-mock2",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
]

const postCommentMockWithCreatorName: GetPostCommentDB[] = [
    {
        id: "id-mock-postComment1",
        creator_id: "id-mock-fulano",
        post_id: "id-mock-post1",
        content: "content-comment-mock1",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_nickname: "fulano"
    },
    {
        id: "id-mock-postComment2",
        creator_id: "id-mock-fulano",
        post_id: "id-mock-post2",
        content: "content-comment-mock2",
        likes: 0,
        dislikes: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_nickname: "fulano"
    },
    {
        id: "id-mock-postComment3",
        creator_id: "id-mock-astrodev",
        post_id: "id-mock-post3",
        content: "content-comment-mock3",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_nickname: "astrodev"
    }
]

const likeCommentDB: LikeDislikePostCommentDB[] = [
    {
        user_id: "id-mock-fulano",
        post_comment_id: "id-mock-postComment2",
        like: 0
    },
    {
        user_id: "id-mock-astrodev",
        post_comment_id: "id-mock-postComment1",
        like: 1
    }
]

export class PostCommentDatabaseMock extends BaseDatabase {
    public static TABLE_POST_COMMENT = "post_comments"
    public static TABLE_LIKES_DISLIKES_POST_COMMENT = "likes_dislikes_post_comments"

    public findPostCommentWithCreatorDBByPostId = async (id: string): Promise<GetPostCommentDB[]> => {
        return postCommentMockWithCreatorName.filter(postComment => postComment.post_id === id)
    }

    public findPostCommentWithCreatorDBByPostCommentId =async (id:string):Promise<GetPostCommentDB[]> => {
        return postCommentMockWithCreatorName.filter(postComment => postComment.id === id)
    }

    public insertPostComment = async (newPostCommentDB: PostCommentDB): Promise<void> => {

    }

    public findPostCommentByid = async (id: string): Promise<PostCommentDB | undefined> => {
        return postCommentMock.filter(postComment => postComment.id === id)[0]
    }

    public updatePostComment = async (editPostCommentDB: PostCommentDB): Promise<void> => {

    }

    public deletePostComment = async (id: String): Promise<void> => {

    }

    public findLikeDislikePostComment = async (likeDislikePostCommentDB: LikeDislikePostCommentDB): Promise<POST_COMMENT_LIKE | undefined> => {
        const [result] = likeCommentDB.filter(like =>
            like.post_comment_id === likeDislikePostCommentDB.post_comment_id &&
            like.user_id === likeDislikePostCommentDB.user_id
        )
        if (result === undefined) {
            return undefined
        } else if (result.like === 1) {
            return POST_COMMENT_LIKE.ALREADY_LIKED
        } else {
            return POST_COMMENT_LIKE.ALREADY_DISLIKED
        }

    }

    public deleteLikeDislikeComment = async (likeDislikePostCommentDB:LikeDislikePostCommentDB):Promise<void> => {
        
    }

    public updatedLikeDislikePostComment = async (likeDislikePostCommentDB:LikeDislikePostCommentDB):Promise<void> => {
        
    }

    public insertLikeDislikePostComment = async (likeDislikePostCommentDB:LikeDislikePostCommentDB):Promise<void> => {
        
    }

}
