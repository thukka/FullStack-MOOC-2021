const router = require('express').Router()
const { User } = require('../models/')

router.get('/', async (req, res) => {
    const users = User.findAll()
    res.json(users)
})

router.post('/', async (req, res) => {
    const body = req.body
    
    
})

module.exports = router