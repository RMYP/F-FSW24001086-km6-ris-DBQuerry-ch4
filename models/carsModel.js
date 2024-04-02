const mongoose = require("mongoose")

const carsSchema = new mongoose.Schema({
    plate: {
        type: String
    },
    manufacture: {
        type: String
    },
    model: {
        type: String
    },
    image: {
        type: String
    },
    carSize: {
        type: String
    },
    rentPerDay: {
        type: Number
    },
    capacity: {
        type: Number
    },
    description: {
        type: String
    },
    availableAt: {
        type: Date
    },
    transmission: {
        type: String
    },
    available: {
        type: Boolean
    },
    type: {
        type: String
    },
    year: {
        type: Number
    },
    createdAt: {
        type: Date
    },
    updateAt: {
        type: Date
    }
});

const Cars = mongoose.model('Cars', carsSchema);
module.exports = Cars;