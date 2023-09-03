import { PostBusiness } from "../../../src/database/business/PostBusiness"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import {UserDatabaseMock} from "../../mocks/UserDatabaseMock"
import { GetPostsSchema } from "../../../src/dto/posts/getPosts.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"

describe("Get Posts", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock()
    )

    test("deve retornar a lista com os posts", async () => {
        const input = GetPostsSchema.parse({
            token: "token-mock-fulano"
        })

        const output = await postBusiness.getPost(input)

        expect(output).toHaveLength(3)
        expect(output).toEqual([
            {
                id: "id-mock-post1",
                content: "content-mock1",
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
                id: "id-mock-post2",
                content: "content-mock2",
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
                id: "id-mock-post3",
                content: "content-mock3",
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

    test("deve retornar a menssagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = GetPostsSchema.parse({
                token: "token-mock-astrdev"
            })

            await postBusiness.getPost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})
