import { PostCommentBusiness } from "../../../src/database/business/PostCommentBusiness"
import { EditPostCommentSchema } from "../../../src/dto/postComment/editPostComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotfoundError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostCommentDatabaseMock } from "../../mocks/PostCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"


describe("Edit Post Comments", () => {
    const postCommentBusiness = new PostCommentBusiness(
        new PostCommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve editar o conteúdo do comentário", async () => {
        const input = EditPostCommentSchema.parse({
            content: "Editando o conteúdo do comentário",
            token: "token-mock-fulano",
            idToEdit: "id-mock-postComment1"
        })

        const output = await postCommentBusiness.editPostComment(input)

        expect(output).toEqual(undefined)
    })

    test("deve retornar mensagem de token inválido", async () => {
        try {
            const input = EditPostCommentSchema.parse({
                content: "Editando o conteúdo do comentário",
                token: "token-mock-ful",
                idToEdit: "id-mock-postComment1"
            })
            await postCommentBusiness.editPostComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve retornar mensagem de id inexistente", async () => {
        try {
            const input = EditPostCommentSchema.parse({
                content: "Editando o conteúdo do comentário",
                token: "token-mock-fulano",
                idToEdit: "id-mock-postComment6"
            })
            await postCommentBusiness.editPostComment(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Comentário com id inexistente")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve retornar mensagem de acesso negado", async () => {
        try {
            const input = EditPostCommentSchema.parse({
                content: "Editando o conteúdo do comentário",
                token: "token-mock-ciclana",
                idToEdit: "id-mock-postComment1"
            })
            await postCommentBusiness.editPostComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Acesso negado: somente o criador do comentário pode editá-lo")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})
