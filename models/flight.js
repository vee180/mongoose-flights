const mongoose = require('mongoose')

//first define destinationschema

const destinationSchema = new mongoose.Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']

    },


    arrival: {
        type: Date

    }



})

// Schema is a guard on our collection that says
// everytime we want to add a document (object) to our collection 
// in mongodb, it must have this shape, 
// keys must be the same name, and the values must be of the type Specified below (String, Number, Boolean, etc)
const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'Delta', 'United']
    },  // String, is from Mongoose
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']

    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999


    },
    departs: {
        type: Date,
        default: function () {
            return new Date().getDate();
        },

    },
    destinations: {
        type: [destinationSchema]

    },

    // Number is from Mongoose, Schema Types
    // Boolean, from mongoose, google mongoose schema types
})



module.exports = mongoose.model('Flight', flightSchema);
// mongoose.model method does two things
// 1. Creates a collection (The bucket) in mongodb named movies, and it says that all the movie Documents
// that we create need to have the shape of our schema

// 2. Returns an object which is our "Model", which we will use in our controller to perform CRUD operations
// on our database, when our server recieves an http request





