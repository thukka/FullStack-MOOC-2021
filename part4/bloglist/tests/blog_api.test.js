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

describe('initial blogs already exist', () => {
    test('bloglist is returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200).expect('Content-Type', /application\/json/);
    });

    test('correct amount of blogs is returned', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('returned blog identifier should be defined as "id"', async () => {
        const response = await api.get('/api/blogs/');
        expect(response.body[0].id).toBeDefined();
    });
});

describe('new blogs added', () => {
    test('adding a new blog succesfully', async () => {
        const newBlog =
            { 'author': 'Supertest Blog', 'likes': 777, 'title': 'Supertest Blogzone', 'url': 'http://www.testtest.test' };

        const testUser = helper.testUser;
        const getTestUserToken = await api.post('/api/login').send(testUser);

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: 'Bearer ' + getTestUserToken.body.token })
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const contents = blogsAtEnd.map(b => b.author);
        expect(contents).toContain('Supertest Blog');
    });

    test('401 unauthorized if no token', async () => {
        const testBlog = { 'author': 'Auth Test', 'likes': 123, 'title': 'Auth Testing 401 no token', 'url': 'http://www.testtest.test' };

        await api
            .post('/api/blogs')
            .send(testBlog)
            .set({ Authorization: null })
            .expect(401);

    });

    test('likes should be 0 if no value given', async () => {
        const blogWithoutLikes =
            { 'author': 'No Likes', 'title': 'Still no likes', 'url': 'http://www.nolikes.test' };

        const testUser = helper.testUser;
        const getTestUserToken = await api.post('/api/login').send(testUser);

        await api
            .post('/api/blogs')
            .send(blogWithoutLikes)
            .set({ Authorization: 'Bearer ' + getTestUserToken.body.token })
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        const latestBlogLikes = blogsAtEnd[blogsAtEnd.length - 1].likes;
        expect(latestBlogLikes).toEqual(0);
    });

    test('bad request if no title or author', async () => {
        const testUser = helper.testUser;
        const getTestUserToken = await api.post('/api/login').send(testUser);

        const blogWithoutAuthor = {
            'title': 'bad request testing',
            'url': 'http://www.badrequesthopefully.fi',
            'likes': 5
        };

        const blogWithoutTitle = {
            'author': 'mr. bad request',
            'url': 'http://www.brbr.fi',
            'likes': 5
        };

        await api.post('/api/blogs').send(blogWithoutAuthor).set({ Authorization: 'Bearer ' + getTestUserToken.body.token }).expect(400);
        await api.post('/api/blogs').send(blogWithoutTitle).set({ Authorization: 'Bearer ' + getTestUserToken.body.token }).expect(400);
    });
});

describe('deleting a blog', () => {
    test('blog deleted succesfully', async () => {
        const testUser = helper.testUser;
        const getTestUserToken = await api.post('/api/login').send(testUser);

        const blogToDelete = await api
            .post('/api/blogs')
            .send({ 'author': 'deletetest', 'title': 'Testing delete', 'url': 'test.fi' })
            .set({ Authorization: 'Bearer ' + getTestUserToken.body.token });

        const blogsAtStart = await helper.blogsInDb();

        await api
            .delete(`/api/blogs/${blogToDelete.body.id}`)
            .set({ Authorization: 'Bearer ' + getTestUserToken.body.token })
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

        const contents = blogsAtEnd.map(b => b.title);
        expect(contents).not.toContain(blogToDelete.title);
    });
});

describe('editing a blog', () => {
    test('single blog succesfully edited', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToEdit = blogsAtStart[0];
        const editedInfo = {
            'author': blogToEdit.author,
            'likes': 999123,
            'title': 'This has been edited',
            'url': blogToEdit.url
        };

        await api
            .put(`/api/blogs/${blogToEdit.id}`)
            .send(editedInfo)
            .expect(200);

        const blogsAtEnd = await helper.blogsInDb();
        const contents = blogsAtEnd.map(b => b.title);
        expect(contents).toContain(editedInfo.title);
    });
});

// login / user tests

describe('creating new users', () => {
    test('error 400 if password is too short', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            'username': 'pwshouldfail',
            'name': 'This should fail',
            'password': 'xx'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('error 400 if username is under 3 characters', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            'username': 'ab',
            'name': 'username test',
            'password': 'usernametestpw'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});


afterAll(() => {
    mongoose.connection.close();
});