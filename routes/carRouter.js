const express = require("express");
const frontEndRoute = express.Router();
const apiRoute = express.Router();
const carsController = require("../controllers/carController");


apiRoute.route("/cars").get(carsController.getAllCarData)
// apiRoute.route("cars/:id").get(carsController.getAllCarData)
frontEndRoute.route("/dashboard").get(carsController.getAllCarData)
frontEndRoute.route("/dashboard/search").get(carsController.searchCarData)
frontEndRoute.route("/dashboard/create").get(carsController.createCarDataPage).post(carsController.createNewCarData)
frontEndRoute.route("/dashboard/update/:id").get(carsController.updateCarPage).post(carsController.updateCarData)
frontEndRoute.route("/dashboard/delete/:id").post(carsController.deleteCarData)

module.exports = {apiRoute, frontEndRoute}