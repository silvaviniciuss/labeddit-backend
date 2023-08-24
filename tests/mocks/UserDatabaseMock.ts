import { BaseDatabase } from "../../src/database/BaseDatabase"
import { USER_ROLES, UserDB } from "../../src/models/Users"



const usersMock: UserDB[] = [
    {
        id: "id-mock-fulano",
        nickname: "Fulano",
        email: "fulano@email.com",
        password: "hash-mock-fulano",
        role: USER_ROLES.NORMAL,
        created_at: new Date().toISOString()
    },
    {
        id: "id-mock-astrodev",
        nickname: "Astrodev",
        email: "astrodev@email.com",
        password: "hash-mock-astrodev",
        role: USER_ROLES.NORMAL,
        created_at: new Date().toISOString()
    }
]

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    public findUsersByNickname = async (nickname: string): Promise<UserDB | undefined> => {
        return usersMock.filter(user => user.nickname.toLocaleLowerCase().includes(nickname.toLocaleLowerCase()))[0]
    }

    public findUserById = async (id: string): Promise<UserDB | undefined> => {
        return usersMock.filter(user => user.id === id)[0]
    }

    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        return usersMock.filter(user => user.email === email)[0]
    }

    public insertUser = async (newUserDB: UserDB): Promise<void> => {

    }

}
