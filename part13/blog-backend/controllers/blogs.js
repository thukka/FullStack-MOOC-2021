const router = require('express').Router()
const { Blog } = require('../models/')

const findBlog = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (err) {
        return res.status(404).json({ err })
    }
})

router.delete('/:id', findBlog, async (req, res) => {
    if (req.blog) {
        try {
            await req.blog.destroy()
            return res.status(200).end()
        } catch (err) {
            return res.status(404).json({ err })
        }
    } else {
        res.status(404).end()
    }
})

router.put('/:id', findBlog, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        return res.status(200).end()
    } else {
        res.status(404).end()
    }
})

module.exports = router