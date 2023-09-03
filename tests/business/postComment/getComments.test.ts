import { PostCommentBusiness } from "../../../src/database/business/PostCommentBusiness"
import { GetCommentsSchema } from "../../../src/dto/postComment/getComments.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"

import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostCommentDatabaseMock } from "../../mocks/PostCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Like Dislike Post Comment", () => {
    const postCommentBusiness = new PostCommentBusiness(
        new PostCommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar cometários de todos os posts", async()=>{
        const input = GetCommentsSchema.parse({
            token: "token-mock-fulano"
        })
        const output = await postCommentBusiness.getComments(input)
        expect(output).toHaveLength(3)
        expect(output).toEqual([
            {
                id: "id-mock-postComment1",
                post_id: "id-mock-post1",
                content: "content-comment-mock1",
                likes: 0,
                dislikes: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator: {
                    id: "id-mock-fulano",
                    nickname: "fulano"
                }
                
            },
            {
                id: "id-mock-postComment2",
                post_id: "id-mock-post2",
                content: "content-comment-mock2",
                likes: 0,
                dislikes: 1,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator: {
                    id: "id-mock-fulano",
                    nickname: "fulano"
                }
            },
            {
                id: "id-mock-postComment3",
                post_id: "id-mock-post3",
                content: "content-comment-mock3",
                likes: 0,
                dislikes: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator: {
                    id: "id-mock-astrodev",
                    nickname: "astrodev"
                }   
            }
        ])
    })

    test("deve retornar menssagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = GetCommentsSchema.parse({
                token: "token-mock-fula"
            })
            await postCommentBusiness.getComments(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})