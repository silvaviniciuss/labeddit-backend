import { PostBusiness } from "../../../src/database/business/PostBusiness"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import {UserDatabaseMock} from "../../mocks/UserDatabaseMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { LikeDislikeSchema } from "../../../src/dto/posts/likeDislikePost.dto"
import { NotFoundError } from "../../../src/errors/NotfoundError"
import { GetLikeDislikeSchema } from "../../../src/dto/posts/getLikeDislikePost.dto"

describe("Like Dislike Post", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock()
    )

    test("deve retornar os likes e dislikes dos posts", async () => {
        const input = GetLikeDislikeSchema.parse({
            postId: "id-mock-post2",
            token: "token-mock-fulano"
        })

        const output = await postBusiness.getLikeDislikePost(input)

        expect(output).toEqual(
            {
                user_id: "id-mock-fulano",
                post_id: "id-mock-post2",
                like: 0
            }
        )
    })

    
    test("deve retornar a menssagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = GetLikeDislikeSchema.parse({
                postId: "id-mock-post1",
                token: "token-mock-fula"
            })

            await postBusiness.getLikeDislikePost(input)
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
            const input = GetLikeDislikeSchema.parse({
                postId: "id-mock-post34",
                token: "token-mock-fulano"
            })

            await postBusiness.getLikeDislikePost(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Post inexistente")
                expect(error.statusCode).toBe(404)
            }
        }
    })

})