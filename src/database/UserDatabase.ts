import { UserDB } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public findUsersByName = async (q?: string): Promise<UserDB[]> => {
        let result: UserDB[]
        if (q) {
            result = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("name", "LIKE", `%${q}%`)
        } else {
            result = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
        }
        return result
    }

    public findUserById = async (id:string): Promise<UserDB | undefined> => {
        const [response]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({id})
        
        return response
    }

    public findUserByEmail =async (email:string): Promise<UserDB | undefined> => {
        const [response]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({email})
        return response
    }

    public insertUser =async (newUserDB: UserDB): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }

}