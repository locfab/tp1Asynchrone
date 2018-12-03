import { LevelDb } from "./leveldb"
const bcrypt = require('bcryptjs')
import WriteStream from 'level-ws'

export class User {
    public username: string
    public email: string
    private password: string = ""

    constructor(username: string, email: string, password: string, passwordHashed: boolean = true) {
        this.username = username
        this.email = email

        if (!passwordHashed) {
            this.setPassword(password)
        } else this.password = password
    }
    static fromDb(username: string, data: any): User {
        const [password, email] = data.split(':')
        console.log("fromDb")
        console.log(username,email,password)
        console.log("fromDb")
        return new User(username,email,password)
    }


    public setPassword(toSet: string): void {
        var hash = bcrypt.hashSync(toSet, 10)
        this.password = hash
    }

    public getPassword(): string {
        return this.password
    }

    public validatePassword(toValidate: String): boolean {
        var toReturn = bcrypt.compareSync(toValidate, this.getPassword())
        return toReturn
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
                let user = User.fromDb(username, data)
                console.log("user else")
                console.log(user)
                console.log("user else")
                callback(null, user)
            }
        })
    }

    public save(user: any, callback: (err: Error | null) => void) {
        console.log("user")
        console.log(user)
        console.log("user")
        user = new User(user.username, user.email, user.password, false)
        console.log("newuser")
        console.log(user)
        console.log("newuser")

        this.db.put(
            `user:${user.username}`,
            `${user.getPassword()}:${user.email}`,
            (err: Error | null) => {
                console.log("nike ta mere")
                console.log(err)
                console.log("nike ta mere")
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