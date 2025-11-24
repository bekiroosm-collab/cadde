const { registerUser } = require('../../controllers/authController');
const User = require('../../models/User');
const httpMocks = require('node-mocks-http');

jest.mock('../../models/User');

describe('Auth Controller - Register', () => {
  it('should register a new user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/auth/register',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        position: 'Forward'
      }
    });
    const res = httpMocks.createResponse();

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: '123',
      name: 'Test User',
      email: 'test@example.com',
      position: 'Forward',
      matchPassword: jest.fn(),
    });

    // Mock environment variable for token generation
    process.env.JWT_SECRET = 'testsecret';

    await registerUser(req, res);

    expect(res.statusCode).toBe(201);
    const data = res._getJSONData();
    expect(data.email).toBe('test@example.com');
    expect(data.token).toBeDefined();
  });
});
