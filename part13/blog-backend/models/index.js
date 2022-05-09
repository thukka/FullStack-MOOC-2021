const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')
const ActiveSession = require('./active_session')

User.hasMany(Blog)
Blog.belongsTo(User)
ActiveSession.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'reading' })
Blog.belongsToMany(User, { through: ReadingList, as: 'usersReading' })


module.exports = {
    Blog, User, ReadingList, ActiveSession
}