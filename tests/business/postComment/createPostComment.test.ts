import { PostCommentBusiness } from "../../../src/database/business/PostCommentBusiness"
import { CreatePostCommentSchema } from "../../../src/dto/postComment/createPostComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostCommentDatabaseMock } from "../../mocks/PostCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Create Postcomments", () => {
    const postCommentBusiness = new PostCommentBusiness(
        new PostCommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )
    
    test("deve retonar um comentário em um post", async ()=>{
        const input = CreatePostCommentSchema.parse({
            content:"Conteúdo teste",
            token: "token-mock-fulano",
            postId: "id-mock-post1"
        })

        const output = await postCommentBusiness.createPostComment(input)

        expect(output).toEqual({
            content:"Conteúdo teste"
        })
    })


    test("deve retornar menssagem de token inválido", async () => {
        expect.assertions(2)
        try {
            const input = CreatePostCommentSchema.parse({
                content:"Conteúdo teste",
                token: "token-mock-ful",
                postId: "id-mock-post1"
            })
            await postCommentBusiness.createPostComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})