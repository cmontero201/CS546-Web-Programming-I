const postRoutes = require("./posts");
const animalRoutes = require("./animals");
const likesRoutes = require("./likes");

const constructorMethod = app => {
  app.use("/posts", postRoutes);
  app.use("/animals", animalRoutes);
  app.use("/likes", likesRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;