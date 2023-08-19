export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface UserDB {
    id: string,
    nickname: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    nickname: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}

export interface TokenPayload {
    id: string,
    nickname: string,
    role: USER_ROLES
}

export class Users {
    constructor(
        private id: string,
        private nickname: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(newValue: string): void {
        this.id = newValue
    }

    public getNickname(): string {
        return this.nickname
    }

    public setNickname(newValue: string): void {
        this.nickname = newValue
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(newValue: string): void {
        this.email = newValue
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(newValue: string): void {
        this.password = newValue
    }

    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(newValue: USER_ROLES): void {
        this.role = newValue
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toUserModel(): UserModel {
        return {
            id: this.id,
            nickname: this.nickname,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt
        }
    }

    public toDBModel(): UserDB {
        return {
            id: this.id,
            nickname: this.nickname,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }
    }

}
