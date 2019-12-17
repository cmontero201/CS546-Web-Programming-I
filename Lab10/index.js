const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars");
const configRoutes = require("./routes")
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

app.use(session({
    name: 'AuthCookie',
    secret: 'I lost my underpants!',
    resave: false,
    saveUninitialized: false,
}));

app.use('*',(req,res, next)=>{
    console.log("[%s]: %s %s (%s)",
       new Date().toUTCString(),
       req.method,
       req.originalUrl,
       `${req.session.user ? "Authenticated User" : "Non-Authenticated User"}`
       );
    next();
});

configRoutes(app)

app.use( (req, res, next) => {
    res.status(404).json({ error: "Not found" });
});


app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
  
  