const logger = require('./logger');
const morgan = require('morgan');

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
    
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: 'invalid token ' });
    }
    
    logger.error(error.message);
    next(error);
};

module.exports = { morgan, unknownEndpoint, errorHandler };