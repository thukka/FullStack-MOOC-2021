const router = require('express').Router()
const { ReadingList } = require('../models/')
const tokenExtractor = require('./utils/tokenExtractor')

router.post('/', async (req, res) => {
    try {
        const newEntry = req.body;
        const entry = await ReadingList.create(newEntry)
        res.status(200).json(entry)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/:id', tokenExtractor, async (req, res) => {
    try {
        const findEntry = await ReadingList.findByPk(req.params.id)

        if (req.decodedToken.id !== findEntry.userId) {
            return res.status(400).json({ error: 'unauthorized' })
        }

        findEntry.read = req.body.read;
        await findEntry.save()
        res.status(200).json(findEntry)
    } catch (err) {
        res.status(401).json({ error: err })
    }
})

module.exports = router