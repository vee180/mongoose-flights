const FlightModel = require("../models/flight");


module.exports = {
    create
}

function create(req, res) {
    console.log(req.body, ' <- req.body in create destination')
    // Use a Model to find the movie with an id (req.params.id)
    FlightModel.findById(req.params.id)
        .then(function (flightDocument) {

            console.log(flightDocument)
            // mutating a document, 
            // we are adding/or removing/updating 
            // something you found from the database
            flightDocument.destinations.push(req.body);
            // you have to save the document to tell 
            // mongodb you change something, cuz this 
            // exists on our express server, mongodb
            // doesn't know we added req.body to the movies
            // reviews array
            flightDocument.save()
                .then(function () {
                    res.redirect(`/flights/${req.params.id}`)
                })


            // Then with the movie we found, we want to add a review to the movie's reviews array
            // to create a review

        }).catch(err => {
            console.log(err);
            res.send(err)
        })

}