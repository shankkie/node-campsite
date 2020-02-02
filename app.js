const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    localStrategy = require("passport-local"),

    Camp = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds'),

    expressSanitizer = require("express-sanitizer"),
    methodOveride = require("method-override"),
    flash = require("connect-flash");

// console.log(process.env.PORT);
// console.log(process.env.IP);
// console.log(process.env.DATABASEURL);

const campgroundRoute = require("./routes/campgrounds"),
    commentRoute = require("./routes/comments"),
    indexRouter = require("./routes/index")

// var url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp";
const url = "mongodb://nitrous:abcd1234@ds011883.mlab.com:11883/nitrouslab";

mongoose.connect(url);


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOveride('_method'));

app.use(flash());
//seedDB();

//PASSPORT CONFIQ
app.use(require("express-session")({
    secret: 'Yelpcamp secrets',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    console.log(req.user);
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



app.use(indexRouter);
app.use('/campgrounds', campgroundRoute);
app.use('/campgrounds/:id', commentRoute);

app.listen('9090', process.env.IP, function() {
    console.log('****Yelpcamp Server Started*******', process.env.PORT);
})
