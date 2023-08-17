import { GetUsersInputDTO, GetUsersOutputDTO } from "../../dto/user/getUsers.dto"
import { LoginInputDTO, LoginOutputDTO } from "../../dto/user/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../../dto/user/signup.dto"
import { BadRequestError } from "../../errors/BadRequestError"
import { NotFoundError } from "../../errors/NotfoundError"
import { TokenPayload, USER_ROLES, UserModel, Users } from "../../models/Users"
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

    public getUsers = async (input: GetUsersInputDTO): Promise<GetUsersOutputDTO> => {
        const { q, token } = input

        const usersModel: UserModel[] = []

        const usersDB = await this.userDatabase.findUsersByName(q)

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Token inválido")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new BadRequestError("somente admins podem acessar esse recurso")
        }

        if (usersDB.length === 0) {
            throw new BadRequestError("Usuário não encontrado")
        }

        for (let userDB of usersDB) {
            const user = new Users(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
            )

            usersModel.push(user.toUserModel())
        }

        const output: GetUsersOutputDTO = usersModel

        return output
    }

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const {name, email, password} = input
        const id = this.idGenerator.generate()
        
        const hashedPassword = await this.hashManager.hash(password)
        
        const newUser = new Users(
            id,
            name, 
            email,
            hashedPassword, 
            USER_ROLES.NORMAL,
            new Date().toLocaleString("pt-br")
        )
        
        const emailExist = await this.userDatabase.findUserByEmail(email)

        if(emailExist) {
            throw new BadRequestError("'email' ja utilizado")
        }

        const newUserDB = newUser.toDBModel()
        await this.userDatabase.insertUser(newUserDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutputDTO = {
            token: token
        }

        return output

    }

    public login = async (input:LoginInputDTO): Promise<LoginOutputDTO> => {
        const {email, password} = input

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
            name: userDB.name,
            role: userDB.role
        }

        const token = this.tokenManager.createToken(payload)

        const output: LoginOutputDTO = {
            token: token
        }

        return output
    }

}   