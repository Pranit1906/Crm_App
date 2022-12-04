const mongoose = require('mongoose');

const User = require('./Models/user.model');
const Student = require('./Models/user.studentDetails.model');
const StudentWithValidator = require("./Models/user.studentWithValidators")

mongoose.connect("mongodb://localhost/demodb3", { family: 4 }, (err) => {
    if (err) {
        console.log("Error Occured");
    } else {
        console.log("Connected");
        // dbOperations();
        // findById();
        // find();
        // findByOne();
        // deleteOne();
        findAndThenUpdate();
    }
});

async function dbOperations() {
    try {
        const student = await StudentWithValidator.create({
            name: 'Pranit',
            age: 16,
            email: 'Pranit@google.com',
            subjects: ['BE', 'DEv', 'Relevel'],
            address: {
                city: 'Bombay',
                country: 'India'
            }
        });
        console.log(student);
    } catch (error) {
        console.log(error.message);
        /*
            *****************without validator*******************
            Connected
            {
              name: 'Pranit',
              email: 'Pranit@google.com',
              age: 25,
              subjects: [ 'BE', 'DB', 'Dev' ],
              address: {
                city: 'Bombay',
                country: 'India',
                _id: new ObjectId("637683475ea1f4ff0d67513e")
              }, // Ask why 2 id's are created here........
              _id: new ObjectId("637683475ea1f4ff0d67513d"),
              __v: 0
            }
               
            ******************************with In-builtValidators********************
         1.) error for email :- 
         js
        Connected
        studentsWithValidator validation failed: email: Path `email` (`pranit.com`) 
        is shorter than the minimum allowed length (15).

        2.) error for age :-
        Connected
        studentsWithValidator validation failed: age: Path `age` (15) is less than minimum allowed value (16).
         
        3.) custom validator for subjects array error:-
         studentsWithValidator validation failed: subjects:  subject list is not provided

            */
    }

}

async function findById() {
    try {
        const student1 = await StudentWithValidator.findById('63768bd5b2771f243f186198');
        console.log(student1)

        /*
        Output for findById :-
         Connected
        {
        _id: new ObjectId("63768bd5b2771f243f186198"),
        name: 'Pranit',
        age: 25,
        email: 'pranitgoogle.com',
        subjects: [ 'BE', 'DB', 'Dev' ],
        address: {
            city: 'Bombay',
            country: 'India',
            _id: new ObjectId("63768bd5b2771f243f186199")
        },
        createdAt: 2022-11-17T19:30:29.462Z,
        updatedAt: 2022-11-17T19:30:29.462Z,
        __v: 0
        }

        */
    } catch (err) {
        console.log(err.message)
    }
}


async function find() {
    try {
        const student2 = await StudentWithValidator.find({ name: 'Pranit' })
        console.log(student2)
            /*
            Output for find({name:"Pranit"}):-
               [
             {
                _id: new ObjectId("63768b225a3fa48e1a89a042"),
                name: 'Pranit',
                age: 25,
                email: 'pranit@google.com',
                subjects: [ 'BE', 'DB', 'Dev' ],
                address: {
                city: 'Bombay',
                country: 'India',
                _id: new ObjectId("63768b225a3fa48e1a89a043")
                },
                createdAt: 2022-11-17T19:27:30.417Z,
                updatedAt: 2022-11-17T19:27:30.417Z,
                __v: 0
            },
            {
                _id: new ObjectId("63768bd5b2771f243f186198"),
                name: 'Pranit',
                age: 25,
                email: 'pranitgoogle.com',
                subjects: [ 'BE', 'DB', 'Dev' ],
                address: {
                city: 'Bombay',
                country: 'India',
                _id: new ObjectId("63768bd5b2771f243f186199")
                },
                createdAt: 2022-11-17T19:30:29.462Z,
                updatedAt: 2022-11-17T19:30:29.462Z,
                __v: 0
            },
            {
                _id: new ObjectId("6378a1ab3d49e1aa4f9f5174"),
                name: 'Pranit',
                age: 16,
                email: 'pranit@google.com',
                subjects: [ 'BE', 'DEv', 'Relevel' ],
                address: {
                city: 'Bombay',
                country: 'India',
                _id: new ObjectId("6378a1ab3d49e1aa4f9f5175")
                },
                createdAt: 2022-11-19T09:28:11.918Z,
                updatedAt: 2022-11-19T09:28:11.918Z,
                __v: 0
            }
            ]
            */

    } catch (err) {
        console.log(err.message)
    }

}

async function findByOne() {
    try {
        const student3 = await StudentWithValidator.findOne({ name: 'Pranit' }) // find very first matching entry
        console.log(student3)
            /*
                    Output fo findOne({name:'Pranit'}):-
                    Connected
                            {
                            _id: new ObjectId("63768b225a3fa48e1a89a042"),
                            name: 'Pranit',
                            age: 25,
                            email: 'pranit@google.com',
                            subjects: [ 'BE', 'DB', 'Dev' ],
                            address: {
                                city: 'Bombay',
                                country: 'India',
                                _id: new ObjectId("63768b225a3fa48e1a89a043")
                            },
                            createdAt: 2022-11-17T19:27:30.417Z,
                            updatedAt: 2022-11-17T19:27:30.417Z,
                            __v: 0
                            }
    
                    */

    } catch (err) {
        console.log(err.message)
    }

}

async function deleteOne() {
    try {
        const student4 = await StudentWithValidator.deleteOne({ name: 'Pranit' }) //delete very first matching entry
        console.log(student4)
            /*
            Output fo deleteOne:-
            { acknowledged: true, deletedCount: 1 } 
            */

    } catch (error) {
        console.log(error.message)
    }
}


async function findAndThenUpdate() {
    //how to use save ...
    try {
        const student5 = await StudentWithValidator.where("age").gt(10).where("name").equals("Pranit").limit(2)
        console.log("Limit", student5)

        student5[0].course = "6378a1ab3d49e1aa4f9f5174";

        savedStudent = await student5[0].save();
        console.log("After saving", student5)
    } catch (err) {
        console.log(err.message)
    }
}