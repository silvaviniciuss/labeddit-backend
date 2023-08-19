export interface PostCommentDB {
    id: string,
    creator_id: string,
    post_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface GetPostCommentDB {
    id: string,
    creator_id: string,
    post_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator_nickname: string
}

export interface PostCommentModel {
    id: string,
    content: string,
    post_id: string
    likes: number,
    dislikes: number,
    createdAt: string,
    updateAt: string,
    creator: {
        id: string,
        nickname: string
    }
}

export interface LikeDislikePostCommentDB {
    user_id: string,
    post_comment_id: string,
    like: number
}

export enum POST_COMMENT_LIKE {
    ALREADY_LIKED = 'ALREADY LIKED',
    ALREADY_DISLIKED = 'ALREADY DISLIKED'
}

export class PostComment {
    constructor(
        private id: string,
        private postId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updateAt: string,
        private creatorId: string,
        private creatorNickname: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(newValue: string): void {
        this.id = newValue
    }

    public getPostId(): string {
        return this.postId
    }

    public setPostId(newValue: string): void {
        this.postId = newValue
    }

    public getContent(): string {
        return this.content
    }

    public setContent(newValue: string): void {
        this.content = newValue
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(newValue: number): void {
        this.likes = newValue
    }

    public addLike (): void {
        this.likes++
    }

    public removeLike (): void {
        this.likes--
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(newValue: number): void {
        this.dislikes = newValue
    }

    public addDislike(): void {
        this.dislikes++
    }

    public removeDislike(): void {
        this.dislikes--
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    // public setCreatedAt(newValue: string): void {
    //     this.createdAt = newValue
    // }

    public getUpdatedAt(): string {
        return this.updateAt
    }

    public setUpdatedAt(newValue: string): void {
        this.updateAt = newValue
    }

    
    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(newValue: string): void {
        this.creatorId = newValue
    }

    
    public getCreatorNickname(): string {
        return this.creatorNickname
    }

    public setCreatorNickname(newValue: string): void {
        this.creatorNickname = newValue
    }

    public toPostCommentDBModel(): PostCommentDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            post_id: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updateAt
        }
    }

    public toPostCommentModel(): PostCommentModel {
        return {
            id: this.id,
            post_id: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updateAt: this.updateAt,
            creator: {
                id: this.creatorId,
                nickname: this.creatorNickname
            }
        }
    }

    

}
