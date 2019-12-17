const postRoutes = require("./posts");

const constructorMethod = (app) => {
    try {
        app.use("/", postRoutes);

        app.use("*", (req, res) => {
            res.sendStatus(404);
        });
        
    } catch {
        throw "Unable to use routes"
    }
  
};

module.exports = constructorMethod;