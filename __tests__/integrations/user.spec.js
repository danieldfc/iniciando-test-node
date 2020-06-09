const request = require('supertest');
const { compare } = require('bcryptjs');

const app = require('../../src/app');

const truncate = require('../utils/trucante');

describe('User Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able created new user', async () => {
    const user = {
      name: 'Daniel',
      email: 'daniel@email.com',
      password: '123456',
    };

    const response = await request(app).post('/users').send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able create user, with duplicated email', async () => {
    const user = {
      name: 'Daniel',
      email: 'daniel@email.com',
      password: '123456',
    };

    await request(app).post('/users').send(user);

    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: 'Duplicated user',
      }),
    });
  });

  it('should be able created new user password encrypted', async () => {
    const user = {
      name: 'Daniel',
      email: 'daniel@email.com',
      password: '123456',
    };

    const response = await request(app).post('/users').send(user);
    const { password } = response.body;

    const compareHash = await compare(user.password, password);

    expect(compareHash).toBe(true);
  });
});
