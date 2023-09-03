import { LoginInputDTO, LoginOutputDTO } from "../../dto/user/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../../dto/user/signup.dto"
import { BadRequestError } from "../../errors/BadRequestError"
import { NotFoundError } from "../../errors/NotfoundError"
import { TokenPayload, USER_ROLES, Users } from "../../models/Users"
import { HashManager } from "../../services/HashManager"
import { IdGenerator } from "../../services/IdGenerator"
import { TokenManager } from "../../services/TokenManager"
import { UserDatabase } from "../UserDatabase"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }


    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { nickname, email, password } = input
        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const newUser = new Users(
            id,
            nickname,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toLocaleString("pt-br")
        )

        const emailExist = await this.userDatabase.findUserByEmail(email)

        if (emailExist) {
            throw new BadRequestError("'email' ja utilizado")
        }

        const nicknameExist = await this.userDatabase.findUsersByNickname(nickname)

        if (nicknameExist) {
            throw new BadRequestError("'apelido' já está em uso")
        }

        const newUserDB = newUser.toDBModel()
        await this.userDatabase.insertUser(newUserDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            nickname: newUser.getNickname(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutputDTO = {
            token: token,
            nickname: payload.nickname
        }

        return output

    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado")
        }

        const hashedPassword = userDB.password

        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

        if (!isPasswordCorrect) {
            throw new BadRequestError("'email' ou 'senha' incorretos")
        }

        const payload: TokenPayload = {
            id: userDB.id,
            nickname: userDB.nickname,
            role: userDB.role
        }

        const token = this.tokenManager.createToken(payload)

        const output: LoginOutputDTO = {
            token: token,
            nickname: payload.nickname
        }

        return output
    }

}   