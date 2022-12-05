const UserModel = require("../../Models/user.model");
const { signup, Login } = require("../../Controller/auth.controller");
const { connect, closeDatabase, clearDatabase } = require("../db");
var bcrypt = require('bcrypt');
const { mockRequest, mockResponse } = require("../interceptor");

const testPayload = {
    name: "Test",
    userId: "1",
    emailId: "test@relevel.com",
    password: "pwd",
    userType: "CUSTOMER",
    userStatus: "PENDNG",
    ticketsCreated: [],
    ticketsAssigned: []
}

beforeAll(async() => { await connect() });
beforeEach(async() => { await closeDatabase() });
afterAll(async() => { await clearDatabase() });

describe('signup', () => {
    it('success', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = testPayload;

            //Act
            await signup(req, res);

            //Assert
            expect(res.status).ToHaveBeenCalledWith(201);
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    name: "Test",
                    userId: "1",
                    emailId: "test@relevel.com",
                    userType: "CUSTOMER",
                    userStatus: "PENDING"
                })
            )
        }),
        it('error case', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = testPayload;
            const spy = jest.spyOn(UserModel, 'create').mockImplementation(() => { throw new Error('Error Occured'); })

            //Act
            await signup(req, res)

            //Assert
            expect(res.status).ToHaveBeenCalled(500);
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Failure in signUp!"
                })
            )
        })
})


describe("Login", () => {
    it("success", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = {
                userId: "Test",
                password: "pwd"
            }
            testPayload.userStatus = "APPROVED";
            const spy = jest.spyOn(UserModel, 'findOne').mockReturnValue(Promise.resolve(testPayload));
            const bcryptSpy = jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);

            //Act
            await Login(req, res)

            //Assert
            expect(res.status).ToHaveBeenCalled(200);
            expect(spy).ToHaveBeenCalled();
            expect(bcryptSpy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    userId: '1',
                    name: 'Test',
                    emailId: 'test@relevel.com',
                    userType: 'CUSTOMER',
                    userStatus: 'APPROVED'
                })
            )

        }),

        it('Failure case for status check', async() => {
            //Arrange
            const res = mockRequest();
            const req = mockResponse();
            req.body = {
                userId: '1',
                password: 'pwd'
            }
            testPayload.userStatus = 'PENDING'
            const spy = jest.spyOn(UserModel, 'findOne').mockReturnValue(Promise.resolve(testPayload));

            //Act
            await Login(req, res)

            //Assert
            expect(res.status).ToHaveBeenCalled(200);
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User Not Authorized to Login'
                })
            )
        }),

        it('Failure case for wrong pwds', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = {
                userId: '1',
                password: 'pwd'
            }
            testPayload.userStatus = "APPROVED";
            const spy = jest.spyOn(UserModel, 'findOne').mockReturnValue(Promise.resolve(testPayload));
            const bcryptSpy = jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

            //Act
            await Login(req, res)

            //Assert
            expect(res.status).ToHaveBeenCalled(401);
            expect(spy).ToHaveBeenCalled();
            expect(bcryptSpy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Invalid Password'
                })
            )
        }),
        it('Failure case for invalid user', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = {
                userId: '1',
                password: 'pwd'
            }
            testPayload.userStatus = "APPROVED";
            const spy = jest.spyOn(UserModel, 'findOne').mockReturnValue(null);

            //Act
            await Login(req, res)

            //Assert
            expect(res.status).ToHaveBeenCalled(400);
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    message: "User Not Found!"
                })
            )
        })
})