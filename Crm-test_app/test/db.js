/*
    db.js file has 3 functions as shown below:-
  1. connect helps creating connections
  2. closeDatabase:- helps in closing database
  3. clearDatabase:- helps in clearing and dropping all documents and collections from database

We need db.js file due to reasons as mentioned below....
1. So to test we need to mock DB, we need to create connections, clear values in DB after every test.
2. Every test will be independent of each other.
3. At the End we need to close connections with DB, we need few funtions.
4. Such DB based related functions will be stored here.

//01:05:00

*/