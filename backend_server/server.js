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
const bodyParser = require('body-parser'); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

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
                    foodsArr.sort((f1, f2) => {
                        if (f1.restname.toLowerCase() < f2.restname.toLowerCase()) {
                            return -1;
                        }
                        if (f1.restname.toLowerCase() > f2.restname.toLowerCase()) {
                            return 1;
                        }
                            return 0;
                    });
                    break;
                case 'item':
                    foodsArr.sort((f1, f2) => {
                        if (f1.item.toLowerCase() < f2.item.toLowerCase()) {
                            return -1;
                        }
                        if (f1.item.toLowerCase() > f2.item.toLowerCase()) {
                            return 1;
                        }
                            return 0;
                    });
                    break;
                case 'calories':
                    foodsArr.sort((f1, f2) => f1.calories - f2.calories);
                    break;
                case 'carbohydrates':
                    foodsArr.sort((f1, f2) => f1.carbohydrates - f2.carbohydrates);
                    break;
                case 'protein':
                    foodsArr.sort((f1, f2) => f1.protein - f2.protein);
                    break;
                case 'total fat':
                    foodsArr.sort((f1, f2) => f1.total_fat - f2.total_fat);
                    break;
                case 'type':
                    foodsArr.sort((f1, f2) => {
                        if (f1.type.toLowerCase() < f2.type.toLowerCase()) {
                            return -1;
                        }
                        if (f1.type.toLowerCase() > f2.type.toLowerCase()) {
                            return 1;
                        }
                            return 0;
                    });
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

// TODO handles post request to add new document to the database
app.route('/api/foods').post((req, res) => {
    //console.log('post');
    console.log(req.body);
    var id;
    if (req.body._id == null) {
        id = req.body.restname + ' ' + req.body.item;
    } else {
        id = req.body._id;
    }
    console.log(id);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection(collectionName).updateOne({ _id: id }
            ,{ $set: {
            _id: id,
            restname: req.body.restname,
            item: req.body.item,
            calories: Number(req.body.calories),
            carbohydrates: Number(req.body.carbohydrates),
            protein: Number(req.body.protein),
            total_fat: Number(req.body.total_fat),
            type: req.body.type
            }}, { upsert:true }
        );
        var obj = { _id: id };
        res.send(obj);
        db.close(); // close the database connection
    });
})
/*
// TODO handles put request to update an existing document
app.route('/api/foods').put((req, res) => {
    console.log("put");
    console.log(req.body._id);
    console.log(req.body);
    res.send(req.body);
})
*/
// TODO handles delete request
app.route('/api/foods/:id').delete((req, res) => {
    console.log("delete");
    console.log(req.params.id);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection(collectionName).deleteOne({ _id: req.params.id });
        var obj = { _id: req.params.id }
        res.send(obj);
        db.close();
    });
})

app.listen(8000, () => {
    console.log('HTTP REST API Server running at http://localhost:8000')
})