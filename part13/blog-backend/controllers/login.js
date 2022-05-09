const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { User, ActiveSession } = require('../models/')
const { SECRET } = require('../util/config')

router.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, SECRET)

    const userSession = await ActiveSession.findOne({ where: { userId: user.id }})

    if (userSession) {
        userSession.token = token
        await userSession.save()
    } else {
        await ActiveSession.create({ 
            userId: user.id,
            username: user.username,
            token
        })
    }

    res.status(200).send({ token, username: user.username, name: user.name })
})

router.delete('/:id', async (req, res) => {
    try {
        const userSession = await ActiveSession.findOne({ where: { userId: req.params.id }})
        await userSession.destroy();
        res.status(200).json({ msg: 'session deleted' })
    } catch (err) {
        res.status(400).json({ error: err.message })        
    }
    
})

module.exports = router