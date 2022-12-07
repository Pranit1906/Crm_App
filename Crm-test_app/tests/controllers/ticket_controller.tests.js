const ticketCreation = require('../../Controller/ticket.controller');
const { mockRequest, mockResponse } = require('../interceptor');
const { connect, closeDatabase, clearDatabase } = require('../db');
const UserModel = require('../../Models/user.model');
const TicketModel = require('../../Models/ticket.model');
const { JsonWebTokenError } = require('jsonwebtoken');
const client = require('../../Utilis/notificationClient').client;

beforeAll(async() => { await connect() });
beforeEach(async() => { await clearDatabase() });
afterAll(async() => { await closeDatabase() });

const ticketPayLoad = {
    title: "Test",
    ticketPriority: 4,
    description: "Testing",
    status: "OPEN",
    reporter: 1,
    assignee: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
}

const userTestPayload = {
    name: "Test",
    userId: "1",
    emailId: "test@relevel.com",
    password: "pwd",
    userType: "CUSTOMER",
    userStatus: "PENDNG",
    ticketsCreated: [],
    ticketsAssigned: [],
    save: jest.fn()
}

//https://relevel-courses.s3.amazonaws.com/uploads/backend-development-course-0005/6ef6bb7e3f7d4b5faba80b2a180ddbf6.pdf