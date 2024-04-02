require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const carsModels = require("../models/carsModel");
const db = process.env.database;

mongoose.connect(db, {
    useNewUrlParser: true,
}).then(con =>{
    console.log("connection Success")
})

const cars = JSON.parse(fs.readFileSync("./data/cars2.json", "utf-8"));

const importData = async () => {
    try {
        await carsModels.create(cars)
        console.log("Import data success")
    } catch (err) {
        console.log(err)
    }
    process.exit();
}

const deleteData = async () => {
    try {
        await carsModels.deleteMany()
        console.log("Data sukses dihapus")
    } catch (err) {
        console.log(err)
    }
}

if(process.argv[2] == '--import'){
    importData();
}else if(process.argv[2] == '--delete'){
    deleteData();
}