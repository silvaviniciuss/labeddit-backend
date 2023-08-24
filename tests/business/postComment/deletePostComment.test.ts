import { PostCommentBusiness } from "../../../src/database/business/PostCommentBusiness"
import { DeletePostCommentSchema } from "../../../src/dto/postComment/deletePostComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotfoundError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostCommentDatabaseMock } from "../../mocks/PostCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"


describe("Delete Post Comments", () => {
    const postCommentBusiness = new PostCommentBusiness(
        new PostCommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve excluir o post pelo id", async ()=>{
        const input = DeletePostCommentSchema.parse({
            token: "token-mock-fulano",
            idToDelete: "id-mock-postComment1"
        })

        const output = await postCommentBusiness.deletePostComment(input)

        expect(output).toBe(undefined)
    })

    test("deve retornar mensagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = DeletePostCommentSchema.parse({
                token: "token-mock-ful",
                idToDelete: "id-mock-postComment1"
            })
            await postCommentBusiness.deletePostComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve retornar mensagem de id inexistente", async () => {
        expect.assertions(2)
        try {
            const input = DeletePostCommentSchema.parse({
                token: "token-mock-fulano",
                idToDelete: "id-mock-postComment6"
            })
            await postCommentBusiness.deletePostComment(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Id inexistente")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve retornar mensagem de acesso negado", async () => {
        expect.assertions(2)
        try {
            const input = DeletePostCommentSchema.parse({
                token: "token-mock-ciclana",
                idToDelete: "id-mock-postComment1"
            })
            await postCommentBusiness.deletePostComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Acesso negado")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})