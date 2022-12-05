const { connect, closeDatabase, clearDatabase } = require("../db");
const UserModel = require("../../Models/user.model");
const { mockRequest, mockResponse } = require("../interceptor");
const update = require('../../Controller/update.controller')


beforeAll(async() => { await connect() });
beforeEach(async() => { await closeDatabase() });
afterAll(async() => { await clearDatabase() });

const userTestPayload = {
    name: 'Test',
    userId: '123',
    email: 'test@relevel.com',
    userType: 'CUSTOMER',
    userStatus: 'APPROVED'
}

describe('update', () => {
    it('Failure case', async() => {
        //Arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = { userId: '1' };
        const spy = jest.sypOn(UserModel, 'findOneAndUpdate').mockImplementation(() => ({
                exec: () => { throw new Error('Error Occurred') }
            }))
            //Act
        await findAll(req, res);

        //Assert
        expect(res.status).ToHaveBeenCalled(500);
        expect(spy).ToHaveBeenCalled();
        expect(res.send).ToHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Some Error Occurred'
            })
        )
    })
})

//01:00:00