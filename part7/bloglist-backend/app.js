const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(
        logger.info('Connected to MongoDB')
    ).catch(err => {
        logger.error('Error connecting to MongoDB', err);
    }
    );

app.use(cors());
app.use(express.json());
app.use(middleware.morgan('tiny'));
app.use(middleware.tokenExtractor);

app.use('/api/blogs/', blogRouter);
app.use('/api/users/', usersRouter);
app.use('/api/login/', loginRouter);
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;