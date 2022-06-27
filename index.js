const express=require('express');
const cookkieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookkieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

// app.use('/profile',require('./routes/users'));
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db, 
        // dbName: db,
        autoRemove:'disabled'
    },function(err){
        console.log(err|| 'connect-mongodb setup ok');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`server is running on port ${port}`);

});
    

