const blogRouter = require('express').Router();
const Blog = require('../models/blogreview');

blogRouter.get('/', async (request, response) => {
    const blogList = await Blog.find({});
    response.json(blogList.map(blog => blog.toJSON()));
});

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    response.json(blog.toJSON());
});

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    if (blog.likes === undefined) {
        blog.likes = 0;
    }

    const savedBlog = await blog.save();
    response.json(savedBlog.toJSON());
});

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        'author': body.author,
        'likes': body.likes,
        'title': body.title,
        'url': body.url
    };

    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updateBlog.toJSON());
});

module.exports = blogRouter;