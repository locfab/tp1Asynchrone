import { UserHandler, User } from './user'
import { MetricsHandler, Metric  } from './metrics'
import { LevelDb } from "./leveldb";

const dbPaths: string = './db/sessions'

LevelDb.clear("./db")
LevelDb.clear("./db/users")
LevelDb.clear(dbPaths)

const dbMet = new MetricsHandler("./db")
const dbUser: UserHandler = new UserHandler('./db/users')



dbUser.save(new User('fabrice1','fabrice1@gmail.com','1234567890'),(err:Error|null)=>{
    if(err)
        throw err
})
dbUser.save(new User('fabrice2','fabrice2@gmail.com','1234567890'),(err:Error|null)=>{
    if(err)
        throw err
})
dbUser.save(new User('fabrice3','fabrice3@gmail.com','1234567890'),(err:Error|null)=>{
    if(err)
        throw err
})


dbMet.save('fabrice1',[new Metric('1111-11-11',1),new Metric('2222-22-22',2)],(err:Error|null)=>{
    if(err)
        throw err
})

dbMet.save('fabrice2',[new Metric('3333-33-33',1),new Metric('4444-44-44',2)],(err:Error|null)=>{
    if(err)
        throw err
})

dbMet.save('fabrice3',[new Metric('5555-55-55',1),new Metric('6666-66-66',2)],(err:Error|null)=>{
    if(err)
        throw err
})

console.log("okok")