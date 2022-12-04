/* 

                       ***No Sql***
                         Not Sql
    1. Non Relational Database
    2. Distributed 
    3. Flexible
    4. Scalable

    How No Sql works ?
    It works for ...
    1. Large Amt of Data
    2. Low Latency requirements (When we require data quickly)
    3. flexible data models 

    Data consistency ---> No Sql compromises on so to provide above advantages over RDBMS..
    
    1.In RDBMS we mainly focus on  Noramalization(reducing  data redundancy).
      We can do that by splitting up the tables for optimal storage.
    2. In No Sql everything is stored in JSON format 

*/

/*
                            **** No Sql Types ****
        1. Key Value Pair 
        2. Column - oriented
        3. Graphs - oriented
        4. Document - oriented
        
---------------------------------------------------------------------------------------------------------------------------------------------        
    1.) Key Value Pair 
    i.) Data is stored in key/value pairs.
    ii.) Designed to handle large amt of data and heavy load.
    iii.) Key-value pair database is type of database that stores data as hash table where
    each key is unique, value can be a JSON, BLOB (Binary Large Object), string, etc.
    
    Use Cases :- Used best for shopping cart, gaming, ad tech 
    
    Challenges :- 
    1. Not good for app requiring Frequent Updates (due to larger data) 
    2. For complex queries involving specific data values.
    3. Not for too many relationships between tables.

---------------------------------------------------------------------------------------------------------------------------------------------          

    2.) Column Based DB
    i.) Its's a Sql DB but organised in columns rather than rows.
    ii.) When querying column based DB helps to skip non-relevant data very quickly.
    
    Use Cases :- Mainly for Aggressive queries where we can get result in a blink of an eye.

    Challenges :-
    i.) Writing a new data will take more time.
    ii.) While inserting or updating a new data in column-based DB we need to update 
    each and every columns.

---------------------------------------------------------------------------------------------------------------------------------------------      

   3.) Document based DB
   i.) Document Oriented NoSQL DB stores and retrieve data as a key value pair but
   value part is stored as document which is in JSON or XML format.
   ii.) Easy Filtering through Documents, Low latency and easy to make changes.

   Use Cases :- It's used for CMS(content management system) system, blogging platforms,
   real-time analytics & ecommerce applications.

   Challenges :-
   i.) Should avoid for complex transactions which require multiple operations or queries
   against varying aggregate structures.

---------------------------------------------------------------------------------------------------------------------------------------------
   
  4.) Graph based DB
  i.) A graph based DB stores entities/nodes as well as the relations/edges amongst thoses entities.
  ii.) The entity is stored as nodes with relationship as edges.
  iii.) An Edge gives a relationship between Nodes & Every Node and Edge has a unique identifier
  iv.) Compared to RDBMS which are closely connected, a Graph DB i multi-relational in nature.
  v.) Traversing is fast they are already cpatured in DB .

  Use Cases :- It's Mostly used for social networks, logistics, spatial(relating to or occupying space) data,
  fraud detections. Amazon Neptune is fully managed graph database service.

  Challenges :-
  i.) They are not efficient at processing high volumes of transactions.
  ii.) They are bad at handling queries over the entire database.


*/

/*
 
                                        ****NoSQL Vs RDBMS****
                                 RDBMS                                    NoSQL
  1.) Data Model        It normalize data into               It has data models like graph,
                       tables in cols and rows,              document, key-value which are
                       there is specific schema              ptimized for performance and scale.
  
  2.) ACID             RDBMS provides ACID properties        NoSQL relaxes some ACID properties
  (Atomicity           A - requires transaction to           of RDBMS for more flexible data 
  Consistency          execute completely or not at all.     model that can scale hortizontally.
  Isolation            C - requires when transaction is      Low latency use cases to
  Durability)          committed then data must be confirm   scale horizontally beyond
  properties           to the database schema.               limitations of single instance
                       I - requires concurrent transaction        
                       execute separately from each other 
                       D - require ability to recover
                       from an unexpected failure or
                       power outage to last known stage  
  
  3.) Performance      Its depends on disk subsystem.        Performance generally depends on
                       It requires optimization of           hardware cluster size, network     
                       queries, indexes, table structure     latency and calling applications.
                       for peak performance.
  
  4.) Scale            RDBMS typically scale up by           NoSQL typically partitionable becoz
                      increasing compute capabilities        acess patterns able to scale out
                      of hardware(Vertical Scaling) or       (Horizontal Scaling) by distributed
                      Scale-out by adding replica or         architecture to increase throughout,
                      read-only workloads(Horizontal         which provides consistent performance
                        Scaling)                             at near boundless scale.

  5.) API's            Request to store and retrieve         OBject Based API's allow app developers 
                      data using queries through SQL         to easily store and retrieve data.
                      by RDBMS.

*/

/*

                                        ****Horizontal & Vertical Scaling*****
      1.) Horizontal Scaling means scaling by adding more machines to your existing infrastructer of resources
      (also known as "Scaling Out")
      2.) Vertical Scaling means scaling by adding more power (e.g upgrading CPU, RAM) to your existing
      infrastructer of resources (also known as "Scaling Up")
      
      Difference..
      1.)One of the fundamental differences between the two is that horizontal scaling requires breaking 
      a sequential piece of logic into smaller pieces so that they can be executed in parallel 
      across multiple machines.
      2.). In many respects, Vertical scaling is easier because the logic really doesn’t need to change.
      Rather, you’re just running the same code on higher-spec machines.
      3.)However, there are many other factors to consider when determining the appropriate approach.


*/

/*

                                                  *****SHARDING*******
  1.) Sharding in general is Splitting up data.
  2.)In many large-scale applications, data is divided into partitions that can be accessed separately. 
  There are two typical strategies for partitioning data.
 i.) Vertical partitioning: it means some columns are moved to new tables. Each table contains the same 
 number of rows but fewer columns.
 ii.) Horizontal partitioning (often called sharding): it divides a table into multiple smaller tables. 
Each table is a separate data store, and it contains the same number of columns, but fewer rows.

 3.) Sharding is the practice of optimizing database management systems by separating the rows or columns 
of a larger database table into multiple smaller tables.

Usage of Sharding:-
i.) Sharding is a common concept in scalable database architectures. By sharding a larger table, 
you can store the new chunks of data, called logical shards, across multiple nodes to achieve 
horizontal scalability and improved performance.
ii.) Also, sharded databases can offer higher levels of availability. In the event of an outage 
on an unsharded database, the entire application is unusable. With a sharded database, only the 
portions of the application that relied on the missing chunks of data are unusable. In practice, 
sharded databases often further mitigate the impact of such outages by replicating backup 
shards on additional nodes.
iii.)When running a database on a single machine, you will eventually reach the limit of the amount of
computing resources you can apply to any queries, and you will obviously reach a maximum amount of data 
with which you can efficiently work.
iv.) By horizontally scaling out, you can enable a flexible database design that increases performance
 in two key ways:

Horizontal and Vertical Sharding
● With massively parallel processing, you can take advantage of all the compute resources across your cluster for
every query.
● Because the individual shards are smaller than the logical table as a whole, each machine has to scan fewer rows
when responding to a query.

1.) Horizontal sharding is effective when queries tend to return a subset of rows that are often grouped together.
For example, queries that filter data based on short date ranges are ideal for horizontal sharding since the 
date range will necessarily limit querying to only a subset of the servers.

2.)Vertical sharding is effective when queries tend to return only a subset of columns of the data. For example, 
if some queries request only names, and others request only addresses, then the names and addresses can be 
sharded onto separate servers.


*/

/*

                              *********Popular Choice for No SQL databases***************
      MONGO DB :-
    1.) MongoDB is the most widely used document-based database. 
    2.) It stores the documents in JSON objects
    3.) According to the website stackshare.io, more than 3400 companies are using MongoDB in their tech stack.
    Uber, Google, eBay, Nokia, Coinbase are some of them.

    When to use MongoDB?
● In case you are planning to integrate hundreds of different data sources, the document-based model of
MongoDB will be a great fit as it will provide a single unified view of the data.
● When you are expecting a lot of reads and write operations from your application but you do not care
much about some of the data being lost in the server crash.
● You can use it to store clickstream data and use it for the customer behavioral analysis.
                        

*/