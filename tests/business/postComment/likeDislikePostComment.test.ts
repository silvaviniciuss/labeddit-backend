import { PostCommentBusiness } from "../../../src/database/business/PostCommentBusiness"
import { LikeDislikePostCommentSchema } from "../../../src/dto/postComment/likeDislikePostComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostCommentDatabaseMock } from "../../mocks/PostCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Like Dislike Post Comment", () => {
    const postCommentBusiness = new PostCommentBusiness(
        new PostCommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar a mensagem de token inválido", async ()=>{
        expect.assertions(2)
        try {
            const input = LikeDislikePostCommentSchema.parse({
                postCommentId: "id-mock-postComment1",
                token: "token-mock-",
                like: true
            })
    
            await postCommentBusiness.likeDislikePostComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Token inválido")
                expect(error.statusCode).toBe(400)
            }
        }

    })

    test("deve retornar a mensagem de comentário inexistente", async ()=>{
        expect.assertions(2)
        try {
            const input = LikeDislikePostCommentSchema.parse({
                postCommentId: "id-mock-postComment8",
                token: "token-mock-ciclana",
                like: true
            })
    
            await postCommentBusiness.likeDislikePostComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Comentário inexistente")
                expect(error.statusCode).toBe(400)
            }
        }

    })
    
    test("deve dar like no comentário", async () =>{
        const input = LikeDislikePostCommentSchema.parse({
            postCommentId: "id-mock-postComment1",
            token: "token-mock-ciclana",
            like: true
        })
        const output = await postCommentBusiness.likeDislikePostComment(input)
        expect(output).toBe(undefined)
    })

    test("deve dar like no comentário que ja tenha like", async ()=>{
        const input = LikeDislikePostCommentSchema.parse({
            postCommentId: "id-mock-postComment1",
            token: "token-mock-astrodev",
            like: true
        })

        const output = await postCommentBusiness.likeDislikePostComment(input)

        expect(output).toBe(undefined)
    })
    
    test("deve dar dislike no comentário que ja tenha like", async ()=>{
        const input = LikeDislikePostCommentSchema.parse({
            postCommentId: "id-mock-postComment1",
            token: "token-mock-astrodev",
            like: false
        })

        const output = await postCommentBusiness.likeDislikePostComment(input)

        expect(output).toBe(undefined)
    })

    test("deve dar dislike no comentário que ja tenha dislike", async ()=>{
        const input = LikeDislikePostCommentSchema.parse({
            postCommentId: "id-mock-postComment2",
            token: "token-mock-fulano",
            like: false
        })

        const output = await postCommentBusiness.likeDislikePostComment(input)

        expect(output).toBe(undefined)
    })

    test("deve dar like no comentário que ja tenha dislike", async ()=>{
        const input = LikeDislikePostCommentSchema.parse({
            postCommentId: "id-mock-postComment2",
            token: "token-mock-fulano",
            like: true
        })

        const output = await postCommentBusiness.likeDislikePostComment(input)

        expect(output).toBe(undefined)
    })

        
    test("deve dar like/dislike no comentário pela primeira vez", async ()=>{
        const input = LikeDislikePostCommentSchema.parse({
            postCommentId: "id-mock-postComment3",
            token: "token-mock-astrodev",
            like: true
        })

        const output = await postCommentBusiness.likeDislikePostComment(input)

        expect(output).toBe(undefined)
    })





})
    