/*
$lookups : joins in SQL
insert document

###you can define variable (js syntax) and pass it as excepted parameter.

var user = {
  name: "Mohammad MohammadAlian",
  ip: "127.0.0.1",
  lastLoginTime: 1575704736
};

db.insertOne(user);

OR

db.collection.insertOne({name: 'Mohammad MohammadAlian', ip: '127.0.0.1', lastLoginTime: 1575704736});

####to insert many object in one query you can use insertMany function

var users = [
  {
    name: "Mohammad MohammadAlian",
    ip: "127.0.0.1",
    lastLoginTime: 1575704736
  },
  { name: "John Doe", ip: "10.10.10.10", lastLoginTime: 1575704965 }
];

db.insertMany(users);

OR

db.collection.insertMany([{name: 'Mohammad MohammadAlian', ip: '127.0.0.1', lastLoginTime: 1575704736}, {name: 'John Doe', ip: '10.10.10.10', lastLoginTime: 1575704965}]);

*/


/*

Update Doc

//general form
db.collection.updateOne({query},{update},{flags})

## example
db.collection.updateOne({field:'value'},{$set:{othervalues:'new value'}},{upsert:true}) //upsert will check if field is present
                                                                                    // if not then it will insert this new record

##inc
db.collection.updupdateOneate({field:'value'},{$inc:{number:6}})
## increase six units of number

##unset
db.collection.updateOne({field:'value},{$unset:{anotherfield:1}})
##this will remove anotherfield where field is equal to value

------------------------Array Operators-------------------
##push
##push value to array
db.collection.updateOne({_id:1},{$push:{number:6}})
##push six into numbers where _id = 1

##each
db.collection.updateOne({_id:1},{#push:{numbersArray:{$each:['R', 'T', 'H']}}})
##add each value to numbersArray where id is 1

##addToSet
##addtoset push array if doesn't exists
db.collection.updateOne({_id:1},{$addToSet:{numbers:565}})

##pop
db.collection.updateOne({_id:1},{$pop:{numbers:-1}})
here -1 is from beginning and is from the end of an array.

##pull
db.collection.updateOne({_id:1},{$pull:{numbers:5}})
##pull will remove all 5 from numbers array where id is 1.

##pullAll
db.collection.updateOne({_id:1},{$pullAll:{numbers:[4, 5, 6]}})

##renameCollection
db.collection.renameCollection('newCollectionName')

*/

/*

Querying
##find

##retrieve all of documents
db.collection.find() OR db.collection.find({})

##query by value of specific field
db.collection.find({name: 'Mohammad MohammadAlian'})

##querying throw nested field
var user = { name: "John", job: { title: "programmer", salary: 125000 } };

##if we want to find above user by job title we could use following command
db.collection.find({'job.title': 'programmer'})

##using regex
Link for Regex doc :- https://towardsdatascience.com/regular-expressions-clearly-explained-with-examples-822d76b037b4
*/
//db.collection.find({name: /M.*/})
/*
##pretty
##make results pretty 😁
db.collection.find().pretty()

##limit
db.collection.find().limit(10)
##NOTE: 10 is count of documents which will be retrieved

##skip
##skip result
db.collection.find().skip(2)
##NOTE: 2 is count of documents which will be skipped

##sort
##show sorted result
db.collection.find().sort({fieldName: 1})
Example : db.collection.find().sort({name: 1})
##NOTE: 1 is ascending and -1 is descending

##count
##retrieve count of results
db.collection.find().count()

##distinct
##retrieve distinct value
db.collection.distinct('name')
##NOTE: name is a field

##for nested field we can use following command
db.collection.distinct('comments.message')

##Operators

##less than
db.collection.find({field: {$lt: 200}})

##less than or equal
db.collection.find({field: {$lte: 200}})

##greater than
db.collection.find({field: {$gt: 200}})

##greater than or equal
db.collection.find({field: {$gte: 200}})

##not equal
db.collection.find({field: {$ne: 'string is also accepted in some operators'}})

##in
db.collection.find({field: {$in: [1999,2010,2019,2022]}})

##all
db.collection.find({field: {$all: [1999,2010]}})

##slice
db.collection.find({arrayField: {$slice: 3}})

##or
db.collection.find({$or: [{filed: 'value'}, {field: 'value'}]})

##mod
modulo operator db.collection.find({field: {$mod: [100,0]}})

##size
db.collection.find({arrayFiled: {$size: 2}})

##exists
db.collection.find({field: {$exists: true}})

##type
type numbers db.collection.find({field: {$type: 2}})

slice doubt

{'name':'USS Enterprise D','operator':'Starfleet','type':'Explorer','class':'Galaxy','crew':750,'codes':[10, 11, 12]},
{'name':'USS Prometheus','operator':'Starfleet','class':'Prometheus','crew':4,'codes':[1, 14, 17]},
{'name':'USS Defiant','operator':'Starfleet','class':'Defiant','crew':50,'codes':[10, 17, 19]},
{'name':'IKS Buruk','operator':'Klingon Empire','class':'Warship','crew':40,'codes':[100, 110, 120]},
{'name':'IKS Somraw ','operator':'Klingon Empire','class':'Raptor','crew':50,'codes':[101, 111, 122]},
{'name':'Scimitar','operator':'Romulan Star Empire','type':'Warbird','class':'Warbird','crew':25,'codes':[210, 211, 220]},
{'name':'Narada','operator':'Romulan Star Empire','type':'Warbird','class':'Warbird','crew':65,'codes':[251, 215, 220]}]
*/