import { PostBusiness } from "../../../src/database/business/PostBusiness"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { LikeDislikeSchema } from "../../../src/dto/posts/likeDislikePost.dto"
import { NotFoundError } from "../../../src/errors/NotfoundError"

describe("Like Dislike Post", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve dar like no post", async () => {
        const input = LikeDislikeSchema.parse({
            postId: "id-mock-post1",
            token: "token-mock-ciclana",
            like: true
        })

        const output = await postBusiness.likeDislikePost(input)

        expect(output).toBe(undefined)

    })

    test("deve retornar a menssagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = LikeDislikeSchema.parse({
                postId: "id-mock-post1",
                token: "token-mock-cicla",
                like: true
            })

            await postBusiness.likeDislikePost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve retornar erro de post inexistente", async () => {
        expect.assertions(2)
        try {
            const input = LikeDislikeSchema.parse({
                postId: "id-mock-po",
                token: "token-mock-ciclana",
                like: true
            })

            await postBusiness.likeDislikePost(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Post inexistente")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve dar like em um post que ja tem like", async () => {
        const input = LikeDislikeSchema.parse({
            postId: "id-mock-post1",
            token: "token-mock-astrodev",
            like: true
        })
        const output = await postBusiness.likeDislikePost(input)
        expect(output).toBe(undefined)
    })

    test("deve dar dislike em um post que ja tem like", async () => {
        const input = LikeDislikeSchema.parse({
            postId: "id-mock-post1",
            token: "token-mock-astrodev",
            like: false
        })
        const output = await postBusiness.likeDislikePost(input)
        expect(output).toBe(undefined)
    })

    test("deve dar dislike em um post que ja tem dislike", async () => {
        const input = LikeDislikeSchema.parse({
            postId: "id-mock-post2",
            token: "token-mock-fulano",
            like: false
        })
        const output = await postBusiness.likeDislikePost(input)
        expect(output).toBe(undefined)
    })

    test("deve dar like em um post que ja tem dislike", async () => {
        const input = LikeDislikeSchema.parse({
            postId: "id-mock-post2",
            token: "token-mock-fulano",
            like: true
        })
        const output = await postBusiness.likeDislikePost(input)
        expect(output).toBe(undefined)
    })

    test("deve dar like/dislike em um post pela primeira vez", async () => {
        const input = LikeDislikeSchema.parse({
            postId: "id-mock-post3",
            token: "token-mock-fulano",
            like: false
        })
        const output = await postBusiness.likeDislikePost(input)
        expect(output).toBe(undefined)
    })
})
