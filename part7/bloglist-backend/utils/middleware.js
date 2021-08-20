const logger = require('./logger');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');


const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    } else {
        request.token = null;
    }
    next();
};

const userExtractor = (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    request.user = decodedToken.id;
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        if (request.token === null) {
            return response.status(401).json({ error: 'unauthorized access' });
        } else {
            return response.status(400).json({ error: 'invalid token' });
        }
    }

    logger.error(error.message);
    next(error);
};


module.exports = { morgan, unknownEndpoint, errorHandler, tokenExtractor, userExtractor };