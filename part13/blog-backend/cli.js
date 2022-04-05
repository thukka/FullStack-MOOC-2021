require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

const getAllBlogs = async () => {
    try {
        await sequelize.authenticate()
        const notes = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
        notes.map(note => {
            console.log(`${note.author}: "${note.title}", ${note.likes} likes`)
        })
        sequelize.close();
    } catch (err) {
        console.error('Unable to connect to the database', err)
    }
}

getAllBlogs()