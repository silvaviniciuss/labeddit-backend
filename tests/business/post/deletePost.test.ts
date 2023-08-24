import { PostBusiness } from "../../../src/database/business/PostBusiness"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotfoundError"
import { DeletePostSchema } from "../../../src/dto/posts/delelePost.dto"

describe("Delete Posts", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve excluir o post pelo id", async () => {
        const input = DeletePostSchema.parse({
            token: "token-mock-fulano",
            idToDelete: "id-mock-post1"
        })

        const output = await postBusiness.deletePost(input)

        expect(output).toBe(undefined)
    })

    test("deve retornar a menssagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = DeletePostSchema.parse({
                token: "token-mock-ful",
                idToDelete: "id-mock-post1"
            })

            await postBusiness.deletePost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve retornar a menssagem de id inexistente", async () => {
        expect.assertions(2)
        try {
            const input = DeletePostSchema.parse({
                token: "token-mock-fulano",
                idToDelete: "id-mock-"
            })

            await postBusiness.deletePost(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Id inexistente")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve retornar acesso negado se não for quem criou o post ou ADM", async () =>{
        expect.assertions(2)
        try {
            const input = DeletePostSchema.parse({
                token: "token-mock-ciclana",
                idToDelete: "id-mock-post2"
            })
    
            await postBusiness.deletePost(input)
            
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Acesso negado")
                expect(error.statusCode).toBe(400)
            }
        }
    })
    
})
