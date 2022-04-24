const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('author')), 'total_blogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'total_likes']
        ],
        group: 'author',
        order: sequelize.literal('SUM(likes) DESC')
    })
    res.json(authors)
})

module.exports = router