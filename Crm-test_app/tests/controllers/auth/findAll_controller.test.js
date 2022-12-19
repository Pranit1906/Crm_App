const UserModel = require("../../../Models/user.model");
const { findAll } = require("../../../Controller/auth.controller/findAll.controller");
const { connect, closeDatabase, clearDatabase } = require("../../db");

const { mockRequest, mockResponse } = require("../../interceptor");


beforeAll(async() => { await connect() });
beforeEach(async() => { await clearDatabase() });
afterAll(async() => { await closeDatabase() });

const userTestPayload = {
        name: 'Test',
        userId: '123',
        emailId: 'test@relevel.com',
        userType: 'CUSTOMER',
        userStatus: 'APPROVED'
    }
    //With filters not showing 100%.........

describe('findAll', () => {
    it('Success without filters', async() => { //Not working due to mismatch
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {};
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                    exec: jest.fn().mockReturnValue(Promise.resolve([userTestPayload]))
                }))
                //Act
            await findAll(req, res);

            //Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: 'Test',
                        userId: '123',
                        emailId: 'test@relevel.com',
                        userType: 'CUSTOMER',
                        userStatus: 'APPROVED'
                    })
                ])
            )
        }),

        it('Success without filter and data', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {};
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(null))
            }))

            //Act
            await findAll(req, res);

            //Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User  not present'
                })
            )
        }),

        it("Failure without data", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {};
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.reject(null))
            }))

            //Act
            await findAll(req, res)

            //Assert
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Some Error Occurred"
                })
            )
        }),

        it("success with userName", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {
                userNamReq: "Test"
            };

            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve([userTestPayload]))
            }));

            //Act
            await findAll(req, res)

            //Assert
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "Test",
                        userId: "123",
                        emailId: 'test@relevel.com',
                        userType: 'CUSTOMER',
                        userStatus: 'APPROVED'
                    })
                ])

            )
        }),

        it("Failure with userName", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {
                name: "test"
            };
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockImplementation(() => { throw new Error("error occurred") })
            }))

            //Act
            await findAll(req, res)

            //Assert
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Some Error Occurred'
                })
            )
        }),

        it("success with userStatus", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {
                userStatus: "APPROVED"
            };
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve([userTestPayload]))
            }));

            //Act
            await findAll(req, res)

            //Assert
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "Test",
                        userId: "123",
                        emailId: 'test@relevel.com',
                        userType: 'CUSTOMER',
                        userStatus: 'APPROVED'
                    })
                ])

            )
        }),

        it("Failure with userStatus", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {
                userStatus: "APPROVED"
            };
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockImplementation(() => { throw new Error("error occurred") })
            }))

            //Act
            await findAll(req, res)

            //Assert
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Some Error Occurred'
                })
            )
        }),

        it("success with userType", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {
                userType: "CUSTOMER"
            };
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve([userTestPayload]))
            }));

            //Act
            await findAll(req, res)

            //Assert
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "Test",
                        userId: "123",
                        emailId: 'test@relevel.com',
                        userType: 'CUSTOMER',
                        userStatus: 'APPROVED'
                    })
                ])

            )
        }),

        it("Failure with userType", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {
                userType: "CUSTOMER"
            };
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockImplementation(() => { throw new Error("error occurred") })
            }))

            //Act
            await findAll(req, res)

            //Assert
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Some Error Occurred'
                })
            )
        }),

        it("success with userType & userStatus", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {
                userType: "CUSTOMER",
                userStatus: "APPROVED"
            }
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve([userTestPayload]))
            }));

            //Act
            await findAll(req, res)

            //Assert
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "Test",
                        userId: "123",
                        emailId: 'test@relevel.com',
                        userType: 'CUSTOMER',
                        userStatus: 'APPROVED'
                    })
                ])

            )
        }),



        it("Failure with userType & userStatus", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {
                userType: "CUSTOMER",
                userStatus: "APPROVED"
            };
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().
                mockImplementation(() => { throw new Error("error occurred") })
            }))

            //Act
            await findAll(req, res)

            //Assert
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Some Error Occurred'
                })
            )
        })


})