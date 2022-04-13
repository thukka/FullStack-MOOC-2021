const router = require('express').Router()
const { Blog } = require('../models/')

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

router.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        try {
            await blog.destroy()
            return res.status(200).end()
        } catch (err) {
            return res.status(404).json({ err })
        }
    } else {
        res.status(404).end()
    }
})

router.put('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        blog.likes = req.body.likes
        await blog.save()
        return res.status(200).end()
    } else {
        res.status(404).end()
    }
})

module.exports = router