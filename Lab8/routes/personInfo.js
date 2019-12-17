const express = require("express");
const router  = express.Router();
const axios =  require("axios");

router.get("/:id", async (req, res) => {

    let id = req.params.id;
    let title = "Person Found";
    person = {};

    try {
        const dataFetch = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");

        let data = dataFetch.data;

        for (var ind in data) {
            if (data[ind].id == Number(id)) {
                person = data[ind];
                break;
            } else if (data[ind] == data.length) {
                
                if (data[ind].id == Number(id)) {
                    person = data[ind];
                    break;
                } else {
                    throw "Data Cannot Be Located";
                }
            }
        }
        res.render("results/personInfo", {"title": title, "personInfo": person});

    } catch (err) {
        res.status(404).json({ error: {message:err} });
    }
});

module.exports = router