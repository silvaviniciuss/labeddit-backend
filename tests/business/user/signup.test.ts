import { UserBusiness } from "../../../src/database/business/UserBusiness"
import { SignupSchema } from "../../../src/dto/user/signup.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"


describe("Test Signup", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve gerar um token ao cadastrar um novo usuário", async () => {
        const input = SignupSchema.parse({
            nickname: "Vinicius",
            email: "vinicius@email.com",
            password: "123"
        })

        const output = await userBusiness.signup(input)

        expect(output).toEqual({
            token: "token-mock"
        })
    })

    test("deve retornar mensagem de email ja utilizado", async ()=>{
        expect.assertions(2)
        try {
            const input = SignupSchema.parse({
                nickname: "Vinicius",
                email: "fulano@email.com",
                password: "123"
            })
    
            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'email' ja utilizado")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve retornar mensagem de apelido ja utilizado", async ()=>{
        expect.assertions(2)
        try {
            const input = SignupSchema.parse({
                nickname: "Fulano",
                email: "fulan@email.com",
                password: "123"
            })
    
            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'apelido' já está em uso")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})