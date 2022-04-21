const router = require('express').Router()
const { Blog, User } = require('../models/')
const tokenExtractor = require('./utils/tokenExtractor')

const findBlog = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: {
            exclude: ['userId']
        },
        include: {
            model: User,
            attributes: ['name']
        }
    })
    res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
    if (req.decodedToken) {
        try {
            const blog = await Blog.create({ ...req.body, userId: req.decodedToken.id })
            return res.json(blog)
        } catch (err) {
            next(err)
        }
    }
})

router.delete('/:id', findBlog, async (req, res, next) => {
    try {
        await req.blog.destroy()
        return res.status(200).end()
    } catch (err) {
        next(err)
    }
})

router.put('/:id', findBlog, async (req, res, next) => {
    try {
        req.blog.likes = req.body.likes
        await req.blog.save()
        return res.status(200).end()
    } catch (err) {
        next(err)
    }
})

const errorHandler = (err, _req, res, next) => {

    switch (err.name) {
        case 'TypeError': {
            return res.status(400).send({ error: 'Can\'t find blog' })
        }
        case 'SequelizeValidationError': {
            return res.status(404).json({ error: err.message })
        }
        default: next(err)
    }
}

router.use(errorHandler)

module.exports = router