require("dotenv").config()
const app = require("../app")
const PORT = process.env.PORT||8000;
const mongoose = require("mongoose")


const db = process.env.database;
mongoose.connect(db, {
    useNewUrlParser: true,
}).then(con => {
    console.log("connection success")
})


app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})