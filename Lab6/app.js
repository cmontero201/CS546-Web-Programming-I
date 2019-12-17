const express = require("express");
let app = express();
let configRoutes = require("./routes");

configRoutes(app);

try {
    app.listen(3000, () => {
        console.log("We now have a server!");
        console.log("Your routes will be running on http://localhost:3000");
    });
} catch {
    throw "Unable to listen for server"
}