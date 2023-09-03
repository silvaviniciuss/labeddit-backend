import { GetLikeDislikeDB, GetPostsDB, LikeDislikeDB, POST_LIKE, PostDB, Posts } from "../../src/models/Posts"
import { BaseDatabase } from "../../src/database/BaseDatabase"

const postsMock: PostDB[] = [
    {
        id: "id-mock-post1",
        creator_id: "id-mock-fulano",
        content: "content-mock1",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "id-mock-post2",
        creator_id: "id-mock-fulano",
        content: "content-mock2",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
]

const postMockWithCreatorName: GetPostsDB[] = [
    {
        id: "id-mock-post1",
        creator_id: "id-mock-fulano",
        content: "content-mock1",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_nickname: "fulano"
    },
    {
        id: "id-mock-post2",
        creator_id: "id-mock-fulano",
        content: "content-mock2",
        likes: 0,
        dislikes: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_nickname: "fulano"
    },
    {
        id: "id-mock-post3",
        creator_id: "id-mock-astrodev",
        content: "content-mock3",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_nickname: "astrodev"
    }
]

const likeDB: LikeDislikeDB[] = [
    {
        user_id: "id-mock-fulano",
        post_id: "id-mock-post2",
        like: 0
    },
    {
        user_id: "id-mock-astrodev",
        post_id: "id-mock-post1",
        like: 1
    }

]

export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES_POSTS = "likes_dislikes_posts"

    public findPostById = async (id: string): Promise<PostDB | undefined> => {
        return postsMock.filter(post => post.id === id)[0]
    }

    public getPosts = async (): Promise<GetPostsDB[]> => {
        return postMockWithCreatorName
    }

    public insertPost = async (newPostDB: PostDB): Promise<void> => {

    }

    public updatePost = async (postDB: PostDB): Promise<void> => {

    }

    public deletePost = async (id: string): Promise<void> => {

    }

    public findPostWithCreatorDBbyId = async (id: string): Promise<GetPostsDB | undefined> => {
        return postMockWithCreatorName.filter(post => post.id === id)[0]
    }

    public findLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<POST_LIKE | undefined> => {
        const [result] = likeDB.filter(like =>
            like.post_id === likeDislikeDB.post_id &&
            like.user_id === likeDislikeDB.user_id
        )
        if (result === undefined) {
            return undefined
        } else if (result.like === 1) {
            return POST_LIKE.ALREADY_LIKED
        } else {
            return POST_LIKE.ALREADY_DISLIKED
        }
    }
    
    public getLikeDislike = async (getLikeDislikeDB: GetLikeDislikeDB): Promise<LikeDislikeDB> => {
        const [result] = likeDB.filter(like =>
            like.post_id === getLikeDislikeDB.post_id &&
            like.user_id === getLikeDislikeDB.user_id
        )
        return result
    }

    public deleteLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {

    }

    public updatedLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {

    }

    public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {

    }

}
