const bcrypt = require('bcryptjs');
// const session  = require('express-session');
// const cookieParser = require('cookie-parser');
const userList  = require('../data/users'); 

var checkSession = (req, res, next) => {
    if (req.session && req.cookies.AuthCookie) {
        if (req.session.user && req.cookies.AuthCookie) {
            next();
        }
    } else {
        res.render('auth/login', { message: "LOGIN" });
    }    
};


const constructorMethod = app => {

    app.get('/', checkSession, (req,res) => {
        return;
    });

    app.post('/login', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        console.log(password)

        if (username && password) {
            for (let ind in userList) {
                let user = userList[ind];
                console.log(user)

                if (user.username == username) {

                    console.log(bcrypt.compare(password, user.hashedPassword));

                    bcrypt.compare(password, user.hashedPassword, (err, result) =>  {
                        if(result) {
                            req.session.user = { "username": user.username, "password": user.hashedPassword };
                            res.redirect('/private');
                            return;
                        } else {
                            res.status(401).render('auth/login', { message : "Incorrect Username and/or Password" })
                        }
                    });
                }
            }
        }
    });

    app.get('/private', checkSession, (req,res) => {
        var username = req.session.user.username;
        
        for (let ind in userList) {
            let user = userList[ind];
            
            if(user.username == username) {
                
                var person = {
                    "_id": user._id,
                    "username": user.username,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "profession": user.profession,
                    "bio": user.bio
                };
                break;
            }
        }
        res.render('auth/info', { "person": person });
        return;
    });

    app.get('/logout', (req,res) => {
        if (req.cookies.AuthCookie && req.session.user) {
        
            res.clearCookie('AuthCookie', { domain: "localhost", path: '/' });

            
            res.render('auth/logout', { message: "Log Out Successful" });
        }
    });
}

module.exports = constructorMethod