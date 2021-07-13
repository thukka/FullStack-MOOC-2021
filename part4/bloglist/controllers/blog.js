const blogRouter = require('express').Router();
const Blog = require('../models/blogreview');

blogRouter.get('/', async (request, response) => {
    const blogList = await Blog.find({});
    response.json(blogList.map(blog => blog.toJSON())); 
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

module.exports = blogRouter;