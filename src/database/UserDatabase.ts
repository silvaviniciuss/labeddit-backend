import { UserDB } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public findUsersByNickname = async (nickname: string): Promise<UserDB | undefined> => {
        const [response] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({nickname})
        return response

    }

    public findUserById = async (id: string): Promise<UserDB | undefined> => {
        const [response]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })

        return response
    }

    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        const [response]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email })
        return response
    }

    public insertUser = async (newUserDB: UserDB): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }

}