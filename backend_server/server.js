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
var collectionName = 'foods';

/**
 * returns the number of elements in the database that match the users query.
 * elements with a matching partial string in item, restname, or type will be counted.
 */
app.route('/api/foods/count').get((req, res) => {
    const filterBy = req.query.filter;

    // establish connection to database
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        // pull food objects from the database and store in local array
        db.collection(collectionName).find( {} ).toArray(function (err, foodsArr) {
            assert.equal(null, err);
            // filter out elements based on user query from search box
            if (filterBy) {
                foodsArr = foodsArr.filter(food => 
                    (food._id.trim().toLowerCase().search(filterBy.toLowerCase()) >= 0 
                    || food.type.trim().toLowerCase().search(filterBy.toLowerCase()) >= 0));
            }
            const count = Object.keys(foodsArr).length;
            
            res.send(count.toString()); // send count of matching elements in database
            db.close(); // close connection
        });
    });
})

function getCount(filterBy, resCount) {
    // establish connection to database
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        // pull food objects from the database and store in local array
        db.collection(collectionName).find( {} ).toArray(function (err, foodsArr) {
            assert.equal(null, err);
            // filter out elements based on user query from search box
            if (filterBy) {
                foodsArr = foodsArr.filter(food => 
                    (food._id.trim().toLowerCase().search(filterBy.toLowerCase()) >= 0 
                    || food.type.trim().toLowerCase().search(filterBy.toLowerCase()) >= 0));
            }
            const count = Object.keys(foodsArr).length;
            
            db.close(); // close connection
            resCount = count.toString() // return count as a string
        });
    });
}

function testSuite() {
    // expected Food[] returned
    response_one = [/* Preload with static JSON data matching expected return */];
    response_two = [/* Preload with static JSON data matching expected return */];
    response_three = [/* Preload with static JSON data matching expected return */];

    //test 1
    query = '';
    sortID = 'restname';
    sortBy = 'asc';
    pageNumber = 0;
    pageSize = 10;
    assert.equal(getCount(query), '[expectedCount]');
    assert.equal(getQuery(query, sortId, sortBy, pageNumber, pageSize));
    //test 2
    query = 'burger';
    sortID = 'type';
    sortBy = 'des';
    pageNumber = 2;
    pageSize = 15;
    assert.equal(getCount(query), '[expectedCount]');
    assert.equal(getQuery(query, sortId, sortBy, pageNumber, pageSize));
    //test 3
    query = 'McDonald\'s';
    sortID = 'calories';
    sortBy = 'asc';
    pageNumber = 0;
    pageSize = 25;
    assert.equal(getCount(query), '[expectedCount]');
    assert.equal(getQuery(query, sortId, sortBy, pageNumber, pageSize));
    //test 4
    query = 'desert';
    sortID = 'protein';
    sortBy = 'des';
    pageNumber = 1;
    pageSize = 10;
    assert.equal(getCount(query), '[expectedCount]');
    assert.equal(getQuery(query, sortId, sortBy, pageNumber, pageSize));
}

app.route('/api/foods').get((req, res) => {
    const filterBy = req.query.filter;  // user search term
    const sortId = req.query.sortId;    // name of column to be sorted on, REQUIRED
    const sortBy = req.query.sortOrder; // direction of sort order asc or desc
    const reqPageNumber = parseInt(req.query.pageNumber);   // user requested page, REQUIRED
    const reqPageSize = parseInt(req.query.pageSize);   // user requested page size, REQUIRED
    // establish connection to database
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        // pull food objects from the database and store in local array
        db.collection(collectionName).find( {} ).toArray(function (err, foodsArr) {
            assert.equal(null, err);
            // filter out elements based on user query from search box
            if (filterBy) {
                foodsArr = foodsArr.filter(food => 
                    (food._id.trim().toLowerCase().search(filterBy.toLowerCase()) >= 0 
                    || food.type.trim().toLowerCase().search(filterBy.toLowerCase()) >= 0));
            }
            
            //Check which collumn the user wants to sort by.
            switch (sortId) {
                case 'restname': 
                    foodsArr.sort((f1, f2) => f1.restname > f2.restname);
                    break;
                case 'item':
                    foodsArr.sort((f1, f2) => f1.item > f2.item);
                    break;
                case 'calories':
                    foodsArr.sort((f1, f2) => f1.calories > f2.calories);
                    break;
                case 'carbohydrates':
                    foodsArr.sort((f1, f2) => f1.carbohydrates > f2.carbohydrates);
                    break;
                case 'protein':
                    foodsArr.sort((f1, f2) => f1.protein > f2.protein);
                    break;
                case 'total_fat':
                    foodsArr.sort((f1, f2) => f1.total_fat > f2.total_fat);
                    break;
                case 'type':
                    foodsArr.sort((f1, f2) => f1.type > f2.type);
                    break;
            }
            // reverse order if descending is requested
            if (sortBy == "desc") {
                foodsArr = foodsArr.reverse();
            }          
            const initialPos = reqPageNumber * reqPageSize; // calculate start of requested page
            foodsArr = foodsArr.slice(initialPos, initialPos + reqPageSize); // reduce array to just the page requested
            res.send(foodsArr); // send page if food objects back
            db.close(); // close the database connection
        });
    });
})
/* TODO Learn how to return array of JSON
function getQuery(filterBy, sortId, sortBy, reqPageNumber, reqPageSize, foodsArr) {
    // establish connection to database
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        // pull food objects from the database and store in local array
        db.collection(collectionName).find( {} ).toArray(function (err, foodsArr) {
            assert.equal(null, err);
            // filter out elements based on user query from search box
            if (filterBy) {
                foodsArr = foodsArr.filter(food => 
                    (food._id.trim().toLowerCase().search(filterBy.toLowerCase()) >= 0 
                    || food.type.trim().toLowerCase().search(filterBy.toLowerCase()) >= 0));
            }
            
            //Check which collumn the user wants to sort by.
            switch (sortId) {
                case 'restname': 
                    foodsArr.sort((f1, f2) => f1.restname > f2.restname);
                    break;
                case 'item':
                    foodsArr.sort((f1, f2) => f1.item > f2.item);
                    break;
                case 'calories':
                    foodsArr.sort((f1, f2) => f1.calories > f2.calories);
                    break;
                case 'carbohydrates':
                    foodsArr.sort((f1, f2) => f1.carbohydrates > f2.carbohydrates);
                    break;
                case 'protein':
                    foodsArr.sort((f1, f2) => f1.protein > f2.protein);
                    break;
                case 'total_fat':
                    foodsArr.sort((f1, f2) => f1.total_fat > f2.total_fat);
                    break;
                case 'type':
                    foodsArr.sort((f1, f2) => f1.type > f2.type);
                    break;
            }
            // reverse order if descending is requested
            if (sortBy == "desc") {
                foodsArr = foodsArr.reverse();
            }          
            const initialPos = reqPageNumber * reqPageSize; // calculate start of requested page
            foodsArr = foodsArr.slice(initialPos, initialPos + reqPageSize); // reduce array to just the page requested
            db.close(); // close the database connection
            return foodsArr; // send the final page (array) back to route method
        });
    });
}
*/
/*
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
*/
  
app.listen(8000, () => {
    console.log('HTTP REST API Server running at http://localhost:8000')
})