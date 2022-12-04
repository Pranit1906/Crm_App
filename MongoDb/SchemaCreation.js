/*

                            **********Schema Validation**************
    Specify the validation rules
    Verification rules are based on each collection.
    
    1.)db.createCollection():- is used with the validator option to mention the
    validation rules while creating a new collection.
    
    2.)For adding document verification to an existing collection, use the
    CollMod(collection modification) command with the validator option.
    
    3.)MongoDB also offers the following related options:
    • validationLevel selection, which determines how accurately
    Mongodb applies validation rules to existing documents at the time
    of update.
    • validationAction option, which determines whether MongoDB
    incorrectly rejects documents that violate the authentication rules or
    warn of violations in the log but allow invalid documents

*/

/*

db.createCollections("Students",{
    validator:{
        $jsonSchema:{
            bsontype:"object",
            required : ["name"],
            properties:{
            name : {
                bsontype : "string",
                description :"string and mandatory"
            },
            class : {
                enum : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                description : {"enum values only"}
            },
            age : {
                bsontype:"int"
            }
            }
            
        }
    }
    validationAction : "warn",
    validationLevel : "strict"

})

db.createCollection("student",{
    validator:{
        $jsonSchema :{
            bsonType:'object',
            required:['name'],
            properties:{
                name:{
                    bsonType:"string",
                    description:"must be a string and is required"
                },
                class:{
                    enum:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    description: "only enum values"
                },
                age:{
                    bsonType:'int',
                    description:"must be int"
                }
            }
        }
    }
    validationAction:'warn"
})
*/

/*

db.contacts.insertOne({
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required :["phone"],
            properties:{
                phone:{
                    bsonType:"string",
                    description:"must be a string and is required"
                },
                email:{
                    bsonType:"string",
                    pattern:"@mongodb\.com$",
                    description:"must be a string and match regular expression pattern"
                },
                status:{
                    enum:["Unknown", "Incomplete"],
                    description:"only enum values"
                }
            }
        }
    },
validationAction :"error"
})

*/