require('dotenv').config()
const express = require('express')
const app = express ()
const ejs = require('ejs')
const path = require('path')
const expressLayout=require('express-ejs-layouts')
const exp = require('constants')
const passport= require('passport')
const PORT=process.env.PORT||3000

const mongoose= require('mongoose')
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore = require('connect-mongo')(session)


// Database connection
const url = 'mongodb://127.0.0.1:27017/df';
mongoose.connect(url).then(() =>{
    console.log("database connected")
})
.catch((err) =>{
    console.log("database connection error",err.message)
})

let mongoStore = new MongoDbStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
})


// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    // res.locals.passport=req.passport
    next()
})

//template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')
app.set('view engine','ejs')


//assect
app.use(express.static('public'))
app.use(express.urlencoded({}))
app.use(express.json({extended:false}))
require('./routes/web')(app)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

