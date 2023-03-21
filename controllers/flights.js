//model is always capitalized, in every language
const FlightModel = require('../models/flight');
//MovieModel can perform Crud operations on the database
// Google Questions
// Query Methods for Mongoose Models? How .find(), `.findOne`, findOneAndUpdate
// How can I find all of a resource using a mongoose model c(r)ud
// How can I update a resource using a mongoose model? cr(u)d
// How can I delete a resource using a mongoose model cru(d)
// How can I create a resource using a mongoose model (c)rud
// create and object with a mongoose Model
// How to delete data(document) with a mongoose model
module.exports = {
    new: newFlight,
    create,
    index,
    show
}

function show(req, res) {

    FlightModel.findById(req.params.id)  //finding it by id
        .then(function (flightDoc) {
            console.log(flightDoc) // <- movieDoc is the object from the database!

            // Goal: TO find all of the Performers that are not in the movies cast array
            // 1. find the movie (movieDoc) so we know what performers are in the cast array
            // 2. Use the PerformerModel to query the performers collection to find all the performers
            // whose id is not in the movieDoc.cast array

            res.render('flights/show', {
                flight: flightDoc, // this has the cast array, the performers in the movie
                // this is for our dropdown menu
            });
        })






}
function index(req, res) {

    FlightModel.find({})
        .then(function (allFlights) {

            console.log(allFlights, " <_ data from the db")
            // respond to the client in the .then, we have to wait 
            // for the data to come back from the database
            res.render('flights/index', { flights: allFlights })
        }).catch(function (err) {
            console.log(err);
            res.send(err)
        })


}

function create(req, res) {


    console.log(req.body, " <- contents of the form, req.body");

    // Asynchronous, The model, has to travel to talk to the database, 
    // database is one another port, so it takes times for this to happen
    FlightModel.create(req.body)
        .then(function (flightWeCreatedInTheDb) {

            // This function is the callback, to the create method, 
            // so this functions gets called after we get a response from the database
            // that we added the contents of the form (req.body) to the database
            console.log(flightWeCreatedInTheDb, " <- flight document")
            // Always respond to the client, in the cb function of the model
            // because we want to make sure the database performed its job before 
            // we respond to the client
            res.redirect('/flights'); // 404 because we haven't made the index route yet

        }).catch((err) => {
            console.log(err);
            res.send('There was an error check the terminal, or log the err object')
        })
    // I like to use res.send just to check if I'm able to make an 
    // http request to my POST, 
    // res.send('Hitting the Post Route, check the terminal for the contents of the form')

}

function newFlight(req, res) {


    // Render looks in the views folder
    res.render('flights/new')
}