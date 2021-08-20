const blogRouter = require('express').Router();
const Blog = require('../models/blogreview');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
    const blogList = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogList.map(blog => blog.toJSON()));
});

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    response.json(blog.toJSON());
});

blogRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body;
    const user = await User.findById(request.user);

    const blog = new Blog({
        'title': body.title,
        'likes': body.likes === undefined ? body.likes = 0 : body.likes,
        'author': body.author,
        'url': body.url,
        'user': user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog.toJSON());
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user) {
        await Blog.findByIdAndRemove(request.params.id);
        return response.status(204).end();
    }

    return response.status(401).json({ error: 'unauthorized access'});
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