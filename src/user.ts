import { LevelDb } from "./leveldb"
import WriteStream from 'level-ws'

export class User {
    public username: string
    public email: string
    private password: string = ""

    constructor(username: string, email: string, password: string, passwordHashed: boolean = false) {
        this.username = username
        this.email = email

        if (!passwordHashed) {
            this.setPassword(password)
        } else this.password = password
    }
    static fromDb(data: any): User {
        console.log(data)
        return new User("a","b","c")
    }

    public setPassword(toSet: string): void {
        this.password = toSet
    }

    public getPassword(): string {
        return this.password
    }

    public validatePassword(toValidate: String): boolean {
        return this.password === toValidate
    }
}


export class UserHandler {
    public db: any

    public get(username: string, callback: (err: Error | null, result?: User) => void) {
        this.db.get(`user:${username}`, function (err: Error, data: any) {
            if (err){
                callback(err)
            }
            else if (data === undefined) {
                callback(null, data)
            }
            else {
                callback(null, User.fromDb(data))
            }
        })
    }

    public save(user: any, callback: (err: Error | null) => void) {

        user = new User(user.username, user.email, user.password)

        this.db.put(
            `user:${user.username}`,
            `${user.getPassword()}:${user.email}`,
            (err: Error | null) => {
                callback(err)
            }
        )
    }

    public remove(username: string, callback: (err: Error | null) => void) {

        this.db.del(
            `user:${username}`,
            (error: Error | null) => {

                if (error) callback(error)
                else callback(null)
            }
        )
    }

    constructor(path: string) {
        this.db = LevelDb.open(path)
    }
}