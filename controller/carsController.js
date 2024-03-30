const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
// const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`))
const cars = require("../model/carsModels")

const renderFrontEnd = (req, res) => {
    // render frontend page
    res.render('indexCopy.')
}

const dashboardRender = async (req, res) => {
  try {
    const data = await cars.find()
    res.render("dashboard.ejs", {data})
  } catch (err) {
    console.log(err)
  }
}

const newCarRender = (req, res) => {
  // render frontend page
  res.render('test.ejs')
}

const defaultRoute = (req, res) => {
    // return "ping successfully"
    res.status(200).json({
        message: "ping successfully",
    })
}

const getAllCarsData = (req, res) => {
    // return all the data inside cars.json
    res.status(200).json({
        status: "success",
        totalData : cars.length,
        data: {
            cars,
        }
    })
}
const getCarDataById = async (req, res) => {
   try {
    const data = await cars.findById(req.params.id)
    res.render("updatePage.ejs", {data})
   } catch (err) {
    console.log(err)
   }
  };

const updateCarData = async (req, res) => {
    try {
      const id = req.params.id;
      const carData = await cars.findByIdAndUpdate(id, req.body, {
        new:true
      })
      console.log("test ping")
      res.redirect('/dashboard')
    } catch (err) {
      console.log("test ping")
      res.status(400).json({
        status: "fail",
        massage: err.message
        
    })
    }

    // const id = req.params.id;
    // find the index of the car
    // const carIndex = cars.findIndex(car => car.id === id);

    // if theres is a car that match the request id then it will run this line
    // if (carIndex !== -1) {
      // cars[carIndex] = { ...cars[carIndex], ...req.body };
      // res.status(200).json({
        // status: "success",
        // data: { car: cars[carIndex] },
    //   });
    // } 
    // and if not then it will return status 404
    // else {
    //   res.status(404).json({
    //     status: "error",
    //     message: `Cant find cars with id: ${$id}`
    //   });
    // }
  };



// DON'T TOUCH
const newCarData = async (req, res) => {
    try {
      const newData = await cars.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          car:newData
        }
      })
    } catch (err) {
      console.log(err.message)
    }

    // get new data from post localhost:8000/api/cars/
    // const newData = req.body;
    // push new data to cars.json file
    // const carsObject = cars

    // if(Object.keys(newData).length !== 0){
    //     carsObject.push(newData);
    //     console.log(carsObject)

    //     fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(cars), err =>{
            // check if any error occurs
            // if(err) throw err;
            // if theres is no error then it will return 201
            // res.status(201).redirect('http://localhost:8000/search.html');
    //     })
    // }else{
    //     res.status(404).json({
    //         massange: "data cant be null"
    //     })
    // }
    // console.log(Object.keys(newData).length)
    
}
// its working perfectly, DONT TOUCH
const deleteCarData = async (req, res) => {
  try {
    const id = req.params.id;
    await cars.findByIdAndDelete(id)
    res.status(200).json({
        status: "cars has ben deleted",
    })
    console.log("sukses")
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    })
  }
    
}


  module.exports = {
    defaultRoute,
    getAllCarsData,
    getCarDataById,
    updateCarData,
    newCarData,
    deleteCarData,
    renderFrontEnd,
    newCarRender,
    dashboardRender
  }