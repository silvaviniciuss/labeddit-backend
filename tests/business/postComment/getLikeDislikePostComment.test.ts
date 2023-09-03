import { PostCommentBusiness } from "../../../src/database/business/PostCommentBusiness"
import { GetLikeDislikePostCommentSchema } from "../../../src/dto/postComment/getLikeDislikePostComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotfoundError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostCommentDatabaseMock } from "../../mocks/PostCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Get Like Dislike Post Comment", () => {
    const postCommentBusiness = new PostCommentBusiness(
        new PostCommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar os likes dos comentários", async () => {

        const input = GetLikeDislikePostCommentSchema.parse({
            postCommentId: "id-mock-postComment2",
            token: "token-mock-fulano"
        })

        const output = await postCommentBusiness.getLikeDislikePostComment(input)

        expect(output).toEqual({
            user_id: "id-mock-fulano",
            post_comment_id: "id-mock-postComment2",
            like: 0
        })
    })

    test("deve retornar menssagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = GetLikeDislikePostCommentSchema.parse({
                postCommentId: "id-mock-postComment1",
                token: "token-mock-fu"
            })
            await postCommentBusiness.getLikeDislikePostComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve retornar menssagem de Post inexistente", async () => {
        expect.assertions(2)
        try {
            const input = GetLikeDislikePostCommentSchema.parse({
                postCommentId: "id-mock-postComment23",
                token: "token-mock-fulano"
            })
            await postCommentBusiness.getLikeDislikePostComment(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Post inexistente")
                expect(error.statusCode).toBe(404)
            }
        }
    })

})