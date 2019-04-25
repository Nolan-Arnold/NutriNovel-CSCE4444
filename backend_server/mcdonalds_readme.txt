To add mcdonalds data to your mongodb, go to the mongo command line tool.

Remove the current collection by typing
use foods
db.foods.remove()

Now remake the collection by typing
use foods

Now load the new data into the database by typing
db.foods.insertMany(
...
paste JSON file contents here
...
)

You should get a ok acknowledge with a list of items added. Check your database by typing
db.foods.find()