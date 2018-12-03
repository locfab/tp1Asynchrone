import express = require("express");
import { MetricsHandler, Metric } from "./metrics";
import bodyparser = require("body-parser");
const app = express();
const port: string = process.env.PORT || "8080";
const dbMet = new MetricsHandler("./db");


//USER SESSIONS
import session = require('express-session')
import levelSession = require('level-session-store')

const LevelStore = levelSession(session)


app.use(session({
    secret: 'my very secret phrase',
    store: new LevelStore('./db/sessions'),
    resave: true,
    saveUninitialized: true
}))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());


app.set('views', './views')
app.set('view engine', 'ejs')


app.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`Server is listening on port ${port}`);
});



//USER AUTHENTICATION 1
import { UserHandler, User } from './user'
const dbUser: UserHandler = new UserHandler('./db/users')

const authRouter = express.Router()

authRouter.get('/login', (req: any, res: any) => {
    res.render('login')
})

authRouter.get('/logout', (req: any, res: any) => {
    delete req.session.loggedIn
    delete req.session.user
    res.redirect('/login')
})

//USER AUTHENTICATION 2
authRouter.post('/login', (req: any, res: any, next: any)  => {
    dbUser.get(req.body.username, (err: Error | null, result?: User) => {
        if (err){
            next(err)
        }
        if (result === undefined || !result.validatePassword(req.body.password)) {
            res.redirect('/login')
        } else {
            req.session.loggedIn = true
            req.session.user = result
            res.redirect('/')
        }
    })
})

//USER CREATION AND RETRIEVAL
const userRouter = express.Router()

userRouter.post('/', (req: any, res: any, next: any)  => {
    const { username, password, email } = req.body
    const u = new User(username, password, email)
    dbUser.save(u, (err: Error | null) => {
        if (err) next(err)
        res.status(200).send("user saved")
    })
})

userRouter.get('/', (req: any, res: any, next: any)  => {
    dbUser.get(req.body.username, (err: Error | null, result?: User) => {
        if (err) next(err)
        if (result === undefined || !result.validatePassword(req.body.username)) {
            res.status(404).send("user not found")
        } else {
            res.status(200).json(result)
        }
    })
})

app.use(userRouter);

const authCheck = function (req: any, res: any, next: any) {
    if (req.session.loggedIn) {
        next()
    } else res.redirect('/login')
}

authRouter.get('/', (req: any, res: any) => {
    res.render('index', { name: req.session.username })
})


//USER AUTHORIZATION MIDDLEWARE

authRouter.get('/signup', (req, res) => {
    res.render('signup')
})


app.use(authRouter);













//const metricsRouter = express.Router()


app.get("/metrics/:id", (req: any, res: any) => {
    dbMet.get(req.params.id, (err: Error | null, result?: Metric[]) => {
        if (err) throw err;
        if (result === undefined) {
            res.write("no result");
            res.send();
        } else res.json(result);
    });
});
app.post("/metrics/:id", (req: any, res: any) => {
    dbMet.save(req.params.id, req.body, (err: Error | null) => {
        if (err) {
            res.status(500);
            throw err;
        }
        res.status(200).send();
    });
});

app.delete("/metrics/:id", (req: any, res: any) => {
    dbMet.delete(req.params.id, (err) => {
        if (err) {
            res.status(500);
            throw err;
        }
        res.status(200).send();
    });
});





app.use(function (err: Error, req: any, res: any) {
    console.error(err.stack)
    res.status(500).send("hard broke")
})