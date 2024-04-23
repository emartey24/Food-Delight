// code to use express
const express = require('express');
const app = express();

// code to use body parser to see json in res
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// code to use winston (error logging)
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    // - Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // - Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

function clientError (req, message, errorCode) {
  logger.log({
    level: 'info',
    endpoint: req.path,
    method: req.method,
    query: req.query,
    pathParameters: req.params,
    body: req.body,
    ip: req.ip,
    error: errorCode,
    message: message,
    timestamp: new Date().toUTCString(),
  });
}

// code to use pg-promise
const pgp = require('pg-promise')();
const db = pgp("postgres://rrermifn:mJO35jyo0b1v2FSRMCRgXeoc-qFcC8YF@ziggy.db.elephantsql.com/rrermifn");


// Middleware to create a log for every API call 
let clientID = 0;

app.all('/*', (req, res, next) => {
  logger.log({
    level: 'info',
    endpoint: req.path,
    method: req.method,
    query: req.query,
    pathParameters: req.params,
    body: req.body,
    ip: req.ip,
    timestamp: new Date().toUTCString(),
  });
  next()
    
})

/*
Endpoint:
    GET
*/
app.get('/food', async (req, res) => {
});

/*
Endpoint:
    POST
*/

app.post('/food', (req, res) => {
    
});

/*
Endpoint:
    PATCH
*/

app.patch('/food', (req, res) => {
    
});

/*
Endpoint:
    DELETE
*/

app.delete('/food', (req, res) => {
    
});

// To run server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})