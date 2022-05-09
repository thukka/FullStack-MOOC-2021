const { User, ActiveSession } = require('../../models')

const checkSession = async (req, res, next) => {
    const userSession = await ActiveSession.findOne({ where: { userId: req.decodedToken.id } })

    if (!userSession) {
        return res.status(400).json({ error: 'No active session in the database' })
    }
    
    const user = await User.findOne({ where: { id: userSession.userId } })

    if (user.disabled) {
        return res.status(401).json({ error: 'User disabled' })
    }

    next()
}

module.exports = checkSession