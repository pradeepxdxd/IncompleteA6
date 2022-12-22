const mod = require('./packages');

const app = mod.express();
const express = mod.express;
const port = process.env.PORT;
const exphbs = mod.exphbs;
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const sessions = mod.sessions;
const cookieParser = mod.cookieParser;
const secret = process.env.SECRET;
const oneDay = 3600000;

// set-up cookie
app.use(cookieParser());

// set-up session
app.use(sessions({
    secret : secret,
    cookie : {
        maxAge : oneDay
    },
    saveUninitialized : true,
    resave : false
}))

var session;

// executing db connectivity code
require('./db-connectivity/mongodbConnectivity');

// parsing the body content
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));

// setting template engine
app.engine('handlebars', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

//defining static pages
app.use(express.static('static'));
app.use(express.static('uploads'));

// defining routes
const mainRoutes = require('./routes/mainRouter');
const loginRoutes = require('./routes/loginRouter');
const registRoutes = require('./routes/registRouter');
const menuRouter = require('./routes/menuRouter');
const profileRouter = require('./routes/profileRouter');

app.use('/', mainRoutes);
app.use('/login', loginRoutes);
app.use('/register', registRoutes);
app.use('/menu', menuRouter);
app.use('/profile', profileRouter);

// listening port
app.listen(port, () => {
    console.log('Server work on ' + port);
});