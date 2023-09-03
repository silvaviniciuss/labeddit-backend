import { PostBusiness } from "../../../src/database/business/PostBusiness"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import {UserDatabaseMock} from "../../mocks/UserDatabaseMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { EditPostSchema } from "../../../src/dto/posts/editPosts.dto"
import { NotFoundError } from "../../../src/errors/NotfoundError"

describe("Get Posts", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock()
    )

    test("deve realizar a edição do conteúdo do post", async () => {
        const input = EditPostSchema.parse({
            content: "Post Atualizado",
            token: "token-mock-fulano",
            idToEdit: "id-mock-post1"
        })

        const output = await postBusiness.editPost(input)

        expect(output).toBe(undefined)
    })

    test("deve retornar a menssagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = EditPostSchema.parse({
                content: "Post Atualizado",
                token: "token-mock-ful",
                idToEdit: "id-mock-post1"
            })

            await postBusiness.editPost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve retornar a menssagem de id inexistente", async () => {
        expect.assertions(2)
        try {
            const input = EditPostSchema.parse({
                content: "Post Atualizado",
                token: "token-mock-fulano",
                idToEdit: "id-mock-"
            })

            await postBusiness.editPost(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Post com id inexistente")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve retornar a menssagem de somenete criador pode edita-lo", async () => {
        expect.assertions(2)
        try {
            const input = EditPostSchema.parse({
                content: "Post Atualizado",
                token: "token-mock-astrodev",
                idToEdit: "id-mock-post1"
            })

            await postBusiness.editPost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Acesso negado: somente o criador do post pode editá-lo")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})
