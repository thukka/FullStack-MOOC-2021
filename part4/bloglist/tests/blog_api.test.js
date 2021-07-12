const mongoose = require('mongoose');
const Blog = require('../models/blogreview');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./testHelper');

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test('bloglist is returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200).expect('Content-Type', /application\/json/);
});

test('correct amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('returned blog identifier should be defined as "id"', async() => {
    const response = await api.get('/api/blogs/');
    expect(response.body[0].id).toBeDefined();
});

afterAll(() => {
    mongoose.connection.close();
});