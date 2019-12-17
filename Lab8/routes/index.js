const home = require("./main")
const searchResults = require("./searchResult")
const person = require("./personInfo")

const constructorMethod = app => { 

    app.get("/", (req,res) => {
        let title = "People Finder"
        res.render("results/land", { title } )

    })

    app.post("/searchResult", searchResults)
    app.use("/personInfo", person)
    
    app.use("*",(req,res)=>{
        res.status(404).render("results/error", { "error": { "status": 404, "message": "Page Cannot Be Found" } } );
    })
}

module.exports = constructorMethod;