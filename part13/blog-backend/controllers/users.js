const router = require('express').Router()
const { User } = require('../models/')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (err) {
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

router.get('/', async (_req, res) => {
    const users = await User.findAll({
        attributes: {
            exclude: ['passwordHash']
        }
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    try {
        const { username, name, password } = req.body
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        console.log('user to create: ', username, name, passwordHash,)

        const user = await User.create({
            username,
            name,
            passwordHash
        })

        res.status(200).json(user)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

router.put('/:username', tokenExtractor, async (req, res) => {
    console.log('--- decoded token: ', req.decodedToken, ' ---')
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })


    if (user && req.decodedToken.username === user.username) {
        try {
            user.name = req.body.name
            await user.save()
            return res.json(user)
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    } else {
        return res.status(400).json({ err: 'could not find user' })
    }
})

module.exports = router