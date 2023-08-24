import { UserBusiness } from "../../../src/database/business/UserBusiness"
import { LoginSchema } from "../../../src/dto/user/login.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotfoundError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"


describe("Test Login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve gerar um token ao logar", async () => {
        const input = LoginSchema.parse({
            email: "fulano@email.com",
            password: "fulano123"
        })

        const output = await userBusiness.login(input)

        expect(output).toEqual({
            token: "token-mock-fulano"
        })
    })

    test("deve retornar mensagem de email não encontrado", async () => {
        expect.assertions(2)
        try {
            const input = LoginSchema.parse({
                email: "fulan@email.com",
                password: "123"
            })
            await userBusiness.login(input)

        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("'email' não encontrado")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve retornar mensagem de email ou senha incorretos", async () => {
        expect.assertions(2)
        try {
            const input = LoginSchema.parse({
                email: "fulano@email.com",
                password: "23242"
            })
            await userBusiness.login(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'email' ou 'senha' incorretos")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})