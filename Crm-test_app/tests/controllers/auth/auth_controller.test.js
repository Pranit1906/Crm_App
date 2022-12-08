const UserModel = require("../../../Models/user.model");
const { signup, Login } = require("../../../Controller/auth.controller/auth.controller");
const { connect, closeDatabase, clearDatabase } = require("../../db");
var bcrypt = require('bcrypt');
const { mockRequest, mockResponse } = require("../../interceptor");

const testPayload = {
    name: "Test",
    userId: "1",
    emailId: "test@relevel.com",
    password: "pwd",
    userType: "CUSTOMER",
    userStatus: "APPROVED"
        // ticketsCreated: [],
        // ticketsAssigned: []
}

beforeAll(async() => { await connect() });
beforeEach(async() => { await clearDatabase() });
afterAll(async() => { await closeDatabase() });

xdescribe('signup', () => {
    it('success', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = testPayload;

            //Act
            await signup(req, res);

            //Assert
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    response: expect.objectContaining({
                        "emailId": "test@relevel.com",
                        "name": "Test",
                        "userId": "1",
                        "userStatus": "APPROVED",
                        "userType": "CUSTOMER"
                    })

                })
            )
        }),
        it('success with Engg', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            // testPayload.userStatus = "PENDING"
            testPayload.userType = "ENGINEER"
            req.body = testPayload;

            //Act
            await signup(req, res);

            //Assert
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    response: expect.objectContaining({
                        "emailId": "test@relevel.com",
                        "name": "Test",
                        "userId": "1",
                        "userStatus": "PENDING",
                        "userType": "ENGINEER"
                    })

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
            expect(res.status).toHaveBeenCalledWith(500);
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Failure in signUp!"
                })
            )
        })
})


xdescribe("Login", () => {
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
            expect(res.status).toHaveBeenCalledWith(200);
            expect(spy).toHaveBeenCalled();
            expect(bcryptSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    userId: '1',
                    name: 'Test',
                    emailId: 'test@relevel.com',
                    userType: 'ENGINEER',
                    userStatus: 'APPROVED'
                })
            )

        }),
        it('Failure case for status check', async() => {
            //Arrange
            const res = mockResponse();
            const req = mockRequest();
            req.body = {
                userId: '1',
                password: 'pwd'
            }
            testPayload.userStatus = 'PENDING'
            const spy = jest.spyOn(UserModel, 'findOne').mockReturnValue(Promise.resolve(testPayload));

            //Act
            await Login(req, res)

            //Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
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
            expect(res.status).toHaveBeenCalledWith(401);
            expect(spy).toHaveBeenCalled();
            expect(bcryptSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
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
            expect(res.status).toHaveBeenCalledWith(400);
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "User Not Found!"
                })
            )
        })
})