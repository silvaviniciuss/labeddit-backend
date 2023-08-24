import { PostCommentBusiness } from "../../../src/database/business/PostCommentBusiness"
import { GetPostCommentSchema } from "../../../src/dto/postComment/getPostComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotfoundError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostCommentDatabaseMock } from "../../mocks/PostCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Get PostComments", () => {
    const postCommentBusiness = new PostCommentBusiness(
        new PostCommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar comentários de posts", async () => {
        const input = GetPostCommentSchema.parse({
            token: "token-mock-fulano",
            idToFind: "id-mock-post1"
        })
        const output = await postCommentBusiness.getPostComment(input)

        expect(output).toHaveLength(1)
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
            }
        ])
    })

    test("deve retornar menssagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = GetPostCommentSchema.parse({
                token: "token-mock-fula",
                idToFind: "id-mock-post1"
            })
            await postCommentBusiness.getPostComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve retornar menssagem de id inexistente", async () => {
        expect.assertions(2)
        try {
            const input = GetPostCommentSchema.parse({
                token: "token-mock-astrodev",
                idToFind: "id-mock-post7"
            })
            await postCommentBusiness.getPostComment(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Post com id inexistente")
                expect(error.statusCode).toBe(404)
            }
        }
    })

})