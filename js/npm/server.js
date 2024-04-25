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
  clientID++;
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
/*
Endpoint:
    User can get a list of the menu items or use the specific query parameters to get certain food items
Query Parameters:
  all[string](required): will return a list of all menu items
  name[string]: will return the food based on the name that was typed in, correct spelling and spaces are necessary 
  type[string]: will return the foods that are under the specific type that was typed in, correct spelling are necessary
*/

app.get('/menu', async (req, res) => {
  if(Object.keys(req.body).length != 0) {
    clientError(req, "Request body is not permitted at this endpoint", 400);
    res.status(400).json({error: "Request body is not permitted at this endpoint"});
  } 
  // Makes sure that client only 4 query param (name, type, region, abilities)
  else if(Object.keys(req.query).length > 1) {
      clientError(req, "Query parameters do not meet the requirements", 400);
      res.status(400).json({error: "Query parameters do not meet the requirements length"});
  } 
  // Makes sure that client put in an ID that is a number
  else if(isNaN(req.query.id) && req.query.id != undefined) {
      clientError(req, "ID is not a number", 400);
      res.status(400).json({error: "ID is not a number"});
  }
  else {
      if(req.query.all === '') {
        res.json(await db.any('SELECT * FROM food'));
      }
      else if(req.query.id != undefined) {
        let checkNullID = await db.oneOrNone('SELECT * FROM food WHERE id = $1', [req.query.id]);
        if(checkNullID === null) {
          clientError(req, "That ID does not exist", 400);
          res.status(400).json({error: "That ID does not exist"});
        } 
        else {
          res.json(await db.oneOrNone('SELECT * FROM food WHERE id = $1', [req.query.id]));
        }
      }
      else if(req.query.name != undefined) {
        let checkNullName = await db.oneOrNone('SELECT * FROM food WHERE name = $1', [req.query.name]);
        if(checkNullName === null) {
          clientError(req, "There are no food items with that name", 400);
          res.status(400).json({error: "There are no food items with that name"});
        } 
        else {
          res.json(await db.oneOrNone('SELECT * FROM food WHERE name = $1', [req.query.name]));
        }
      }
      else if(req.query.type != undefined) {
        // console.log(req.query.type);
        let checkNullType = await db.manyOrNone('SELECT * FROM food WHERE type = $1', [req.query.type]);
        // console.log(checkNullType);
        if(checkNullType === null || checkNullType == 0) {
          clientError(req, "We do not have that category of foods yet", 400);
          res.status(400).json({error: "We do not have that category of foods yet"});
        } 
        else {
          res.json(await db.manyOrNone('SELECT * FROM food WHERE type = $1', [req.query.type]));
        }
      }  
    }
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