// link for mongoose :- https://mongoosejs.com/docs/schematypes.html#string-validators
const mongoose = require('mongoose')

// const Student = require('./student4')

const Student1 = require('./student1')

mongoose.connect('mongodb://localhost/demodb2', { family: 4 }, (err) => {
    if (err) {
        console.log("Error occured");
    } else {

        console.log("connected")
            // displayOutput();
        findById();
    }
});

// async function displayOutput() {
//     const student = await Student.create({
//         name: 'Pranit',
//         age: 25
//     });
//     console.log(student)
// }

async function displayOutput() {
    const student1 = await Student1.create({
        name: 'Sanitd',
        age: 18,
        email: 'sanit50htjgf@gmail.com',
        subjects: ['Engg', 'It'],
        address: {
            city: 'Bombay'
        }
    });
    console.log(student1)
}
async function findById() {
    try {
        const student = await Student1.findById("637275adb8d4e039f5f49c8c");
        console.log(student);
    } catch (err) {
        console.log(err.message)
    }
}