const express = require("express");
const app = express();
const moment = require("moment")
app.use(express.json());
// const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`))
const Cars = require("../models/carsModel")

const searchCarData = async (req, res) => {
    try {
      const queryObject = { ...req.query };

      let query = Cars.find({}); 
  
      if (queryObject.model) {
        query = query.find({ model: { $regex: new RegExp(queryObject.model, 'i') } });
      }
  
      const data = await query;
      res.render("dashboard.ejs", { data });
    } catch (err) {
      console.error(err);
    }
  };
  

const getAllCarData = async (req, res) => {
    try {    
        const data = await Cars.find()
        data.forEach(dataCar => {
            if(dataCar.updateAt){
                dataCar.formatCreatedAt = moment(dataCar.updateAt).format("D MMM YYYY, h:mm A");
            }else if(dataCar.createdAt){
                dataCar.formatCreatedAt = moment(dataCar.createdAt).format("D MMM YYYY, h:mm A");
            }
            
        })
        res.render("dashboard.ejs", {data, data, messages: req.flash('info')})
    } catch (err) {
      console.log(err)
    }
}
// create Car Data
const createCarDataPage = (req, res) => {
    try {
        const pageMark = null;
        res.render("updatePage.ejs", {pageMark})
    } catch (err) {
        console.log(err)
    }
}

const createNewCarData = async (req, res) => {
    try {
        await Cars.create({...req.body, image: req.file.filename})
        req.flash('info', 'updateData');
        res.redirect("/dashboard")
    } catch (err) {
        console.log(err)
    }
}

const updateCarPage = async (req, res) => {
    try {
        const data = await Cars.findById(req.params.id);
        const pageMark = 1;
        res.render("updatePage.ejs", {data, pageMark})
    } catch (err) {
        console.log(err)
    }
}

const updateCarData = async (req, res) => {
    try {
        const id = req.params.id;
        await Cars.findByIdAndUpdate(id, {...req.body, image: req.file.filename, updateAt: Date.now()}, { new: true });
        req.flash('info', 'updateData');
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
    }
}

const deleteCarData = async (req, res) => {
    try {
        const id = req.params.id;
        await Cars.findByIdAndDelete(id)
        req.flash('info', 'Delete');
        res.redirect("/dashboard")
    } catch (err) {
        console.log(err)
    }
}

const filterCarSize = async (req, res) => {
    try {
        const carSize = req.params.carSize
        const data = await Cars.find({carSize: carSize})
        res.render("dashboard.ejs", { data });
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllCarData,
    updateCarPage,
    updateCarData,
    deleteCarData,
    createNewCarData,
    createCarDataPage,
    searchCarData,
    filterCarSize
}