/*

Practice Problems

    Create schema for User table which will be useful in our
    CRM application with custom validations.
    Fields required:
    name: String and required
    userId: String, unique and required
    password: String and required
    email: String, lowercase, unique, with minimum length of 10
    and required
    createdAt: Date and not able to change it. Also, have some
    default current time.
    updatedAt: Date. Also, have some default current time.
    userType: String, required and have default value like
    “CUSTOMER”
    userStatus: String, required and have default value like
    “APPROVED”
    ticketsCreated : ObjectId and refer Ticket table.
    ticketsAssigned : ObjectId and refer Ticket table.


*/