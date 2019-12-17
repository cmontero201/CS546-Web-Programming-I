const express = require("express");
const router  = express.Router();
const axios =  require("axios");

router.post("/searchResult", async (req, res) => {
    try {
        var name = req.body["personName"];
        let title = "Results";
        var result = [];
        var counter = 0;

        for (var letter in name) {
            console.log(name[letter])
            if (Number(name[letter])) {
                res.status(400).render("results/error", { error: { "message": "You may search names containing letters " } } ) 
                return
            } 
        }

        if (name == "" || name == " ") {
            res.status(400).render("results/error", { error: { "message": "You may search names containing letters " } } ) 
            return
        }

        const dataFetch = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");

        let data = dataFetch.data;

        if (name) {
            for (var ind in data) {
                var case1 = data[ind].firstName.toLowerCase();
                var case2 = data[ind].lastName.toLowerCase();
                var searchParam = name.toLowerCase();

                if ( (case1.includes( searchParam )) || (case2.includes( searchParam )) ) {
                    result.push(data[ind]);
                    counter ++;

                    if (counter == 20) {
                        break ;
                    }
                }
            }
        }
        res.render("results/searchResult", { "title": title, "personList": result, "personName": name } ); //PERSON NAME IS SEARCH PARAM
        
    } catch (err) {
        res.status(400).render("results/error", { error: { "message": name } } )
    }
});

module.exports = router