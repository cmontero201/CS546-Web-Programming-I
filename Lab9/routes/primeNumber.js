const express = require("express")
const router  = express.Router()
var path = require('path');

router.get( "/", async (req, res) => {
    try {
        res.sendFile(path.resolve( "views/main.html" ));
    } catch (err) {
        res.json( { "error": err } );
    }
})

module.exports = router;