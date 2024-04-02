const express = require("express");
const path = require("path");
const PUBLIC_DIRECTORY = path.join(__dirname + "/views");

const routerCars = require("./routes");
// const exp = require("constants");
const app = express();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'views/images'))
    },
    filename: (req, file, cb) => {
        const filename = `file_${crypto.randomUUID()}`;
        cb(null, filename)
    }
})

app.use(express.static(PUBLIC_DIRECTORY));
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", PUBLIC_DIRECTORY);
app.use(multer({storage:storage}).single("image"))
app.use(routerCars)
 
module.exports = app