const router = require('express').Router()
const { ReadingList } = require('../models/')

router.post('/', async (req, res) => {
    try {
        const newEntry = req.body;
        const entry = await ReadingList.create(newEntry)
        res.status(200).json(entry)
    } catch (err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

module.exports = router