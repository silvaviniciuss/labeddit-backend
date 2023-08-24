import { PostBusiness } from "../../../src/database/business/PostBusiness"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { CreatePostSchema } from "../../../src/dto/posts/createPost.dto"

describe("Create Post", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar o conteúdo ao criar o post", async () => {
        const input = CreatePostSchema.parse({
            content: "Conteúdo do post",
            token: "token-mock-fulano"
        })

        const output = await postBusiness.createPost(input)

        expect(output).toEqual({
            content: "Conteúdo do post"
        })
    })

    test("deve retornar a menssagem de token inválido", async ()=> {
        expect.assertions(2)
        try {
            const input = CreatePostSchema.parse({
                content: "Conteudo do post",
                token: "token-mock-ful"
            })
    
            await postBusiness.createPost(input)  
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})