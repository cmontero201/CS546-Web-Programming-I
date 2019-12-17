const primeNumber = require("./primeNumber")

const constructMethod = app => {
    app.use("/", primeNumber)
}
module.exports=constructMethod