const request = require('supertest');

const app = require('../../src/app');

const truncate = require('../utils/trucante');
const factory = require('../factories');

describe('Session Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able created a session to user', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able created a new session same email user', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: 'User not found',
      }),
    });
  });

  it('should not be able created a new session with invalid pasword', async () => {
    const user = await factory.create('User');

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123123',
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: 'Password does not match',
      }),
    });
  });
});
