// create express object
const express = require('express')
const app = express()
// setup and enable cors to allow the website to contact us
const cors = require('cors')
var corsOptions = {
    //whitelist of address(urls/domains) that I will accept access to this api
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))

// Connect to database using nodejs driver dependencys 
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// Connection URL of database
var url = 'mongodb://localhost:27017/foods';

// Handles general mass get request. no search parameters
app.route('/api/foods').get((req, res) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to foods database inside generic get");
        const cursor = db.collection('foods').find( { }, { 
            _id: 0,
            restname: 1,
            item: 1,
            calories: 1,
            carbs: 1,
            protein: 1,
            total_fat: 1,
            type: 1
        });
        cursor.toArray(function (err, foodsArr) {
            assert.equal(null, err);
            console.log(foodsArr);
            res.send(foodsArr);
        });
        db.close();
    });
})

// TODO handles get request for specific search term
app.route('/api/foods/:searchTerm').get((req, res) => {
    const requestedFoodId = req.params['searchTerm']
    res.send({ id: requestedFoodId, name: 'TestName'})
})

// TODO handles post request to add new document to the database
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.route('/api/foods').post((req, res) => {
    res.send(201, req.body)
})

// TODO handles put request to update an existing document
app.route('/api/foods/:id').put((req, res) => {
    res.send(200, req.body)
})

// TODO handles delete request
app.route('/api/foods/:id').delete((req, res) => {
    res.sendStatus(204)
  })
  
app.listen(8000, () => {
    console.log('Server started!')
})