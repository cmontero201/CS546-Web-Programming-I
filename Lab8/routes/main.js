const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.render("results/land")

    } catch (err) {
        res.send(400).json( {"error": {message: err}} ); 
    }
})

router.post("/searchResult", async (req, res) => {
    try {
        console.log("REQUEST: ", req.body)
        res.render("results/land")

    } catch (err) {
        res.send(400).json( {"error": {message: err}} ); 
    }
})

module.exports = router;