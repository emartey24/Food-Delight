/* 
-------------------------------------------------------------------------------------------------------------------
Initializer codes to use the different npms installed
-------------------------------------------------------------------------------------------------------------------
*/

// code to use express
const express = require('express');
const app = express();
// path lets us work with directories and file paths
// lets us redirect to our html files from this server file based on their paths
// const path = require('path');
// bcrypt 
const bcrypt = require('bcrypt');


// code to use body parser to see json in res
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// code to use body parser to parse through urlencoded (x-www-form-urlencoded) body
// form data sent from web will be body type x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// code to use pg-promise
const pgp = require('pg-promise')();
const db = pgp("postgres://rrermifn:mJO35jyo0b1v2FSRMCRgXeoc-qFcC8YF@ziggy.db.elephantsql.com/rrermifn");

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

// function for when a client makes a error, will collect specific data regarding that error
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
-------------------------------------------------------------------------------------------------------------------
GET endpoints
-------------------------------------------------------------------------------------------------------------------
*/


/*
  GET endpoints for serving static HTML files (delivering HTML files) for redirecting different endpoints
*/

// app.get('/homepage', function(req, res) {
//   res.sendFile(path.join(__dirname, '../../Restaurant', 'restaurant.html'));
// });

// app.get('/loginpage', function(req, res) {
//   res.sendFile(path.join(__dirname, '../../Login', 'logform.html'));
// });

// app.get('/registerpage', function(req, res) {
//   res.sendFile(path.join(__dirname, '../../Registration', 'regform.html'));
// });

// app.get('/forgotpassword', function(req, res) {
//   res.sendFile(path.join(__dirname, '../../ForgotPass', 'forgotPass.html')); 
// });

/*
Endpoint:
    User can get information based on a single username
Query Parameters:
  username[string](required): the username the customer is searching for
  password[string](required): the password for the account
  remember me[checkbox]: don't really have a purpose...yet, it was just in the html code
*/

app.get('/login', async (req, res) => {
  let formData = await db.manyOrNone('SELECT * FROM login');
  // Makes sure that there are no body parameters at this GET endpoint
  if(Object.keys(req.body).length != 0) {
    clientError(req, "Request body is not permitted at this endpoint", 400);
    res.status(400).json({error: "Request body is not permitted at this endpoint"});
  } 
  // Makes sure that client only 2 query param (username and password)
  else if(Object.keys(req.query).length > 3) {
      clientError(req, "Query parameters do not meet the requirements", 400);
      res.status(400).json({error: "Query parameters do not meet the requirements length"});
  } 
  else{
    if(req.query.userName != undefined){
      let usernameFound;
      // Checking if the username exists
      for(let i = 0; i < formData.length; i++) {
        if(formData[i].username == req.query.userName) {
          usernameFound = true;
          break;
        }
        else {
          usernameFound = false;
        }
      }
      // Redirect customer to the main restaurant page if account exists
      if(usernameFound === true) {
        return res.redirect("https://food-delight-test.vercel.app/index.html");
      }
      // Redirect customer to the registration page if account does not exists
      else if(usernameFound === false) {
        return res.redirect("https://food-delight-test.vercel.app/Registration/regform.html");
      }
    } 
  }
  
});

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
  // Makes sure that client only 1 query param at a time (full list, name, type)
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
-------------------------------------------------------------------------------------------------------------------
POST endpoints
-------------------------------------------------------------------------------------------------------------------
*/

/*
Endpoint:
  Adds the new customer information to the logins database
Body parameters:
  username(required): type username of choice as a string value on the html form
  password(required): type password of choice as a string value on the html form
  email(required): type email of choice as a string value on the html form
  street number(required): type street address number of choice as an integer value on the html form
  street name(required): type street address name of choice as a string value on the html form
  city(required): type city of choice as a string value on the html form
  zipcode(required): type zipcode of choice as an integer value on the html form
  phone number(required): type phone number of choice as an integer value on the html form
*/

app.post('/register', async function(req, res) {
  let formData = await db.manyOrNone('SELECT * FROM login');
  // console.log(formData);
  if(Object.keys(req.query).length > 0) {
    clientError(req, "Query not permitted at this endpoint", 400);
    res.status(400).json({error: "Query not permitted at this endpoint"});
  }
  else{
    if(req.body != undefined){
      let userExist;
      // console.log(req.body.username);
      // console.log(formData[0].username);
      for(let i = 0; i < formData.length; i++) {
        if(formData[i].username == req.body.userName || formData[i].email == req.body.email) {
          userExist = true;
          break;
        }
        else {
          userExist = false;
        }
      }
      if(userExist === true) {
        return res.redirect("https://food-delight-test.vercel.app/Login/logform.html");
      }
      else if(userExist === false) {
        const password = await bcrypt.hash(req.body.password, 10);
        const streetNumber = await bcrypt.hash(req.body.streetNumber, 10);
        const streetName = await bcrypt.hash(req.body.streetName, 10);
        const city = await bcrypt.hash(req.body.city, 10);
        const zipcode = await bcrypt.hash(req.body.zipcode, 10);
        const phoneNumber = await bcrypt.hash(req.body.phoneNumber, 10);

        await db.none('INSERT INTO login(username, password, email, street_number, street_name, city, zipcode, phone_number) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.userName, password, req.body.email, streetNumber, streetName, city, zipcode, phoneNumber]);
        // alert("Successfully signed up!");
        return res.redirect("https://food-delight-test.vercel.app/Login/logform.html");
      }
  
    } 
  }

});

/*
Endpoint:
  Adds the new order to the customer_order database
Body parameters:
  username[string](required): type username of the customer ordering
  menu item[dropdown menu](required): select one food item from the drop down menu 
*/

app.post('/order', async function(req, res) {
  let formData = await db.manyOrNone('SELECT * FROM login');
  if(Object.keys(req.query).length > 0) {
    clientError(req, "Query not permitted at this endpoint", 400);
    res.status(400).json({error: "Query not permitted at this endpoint"});
  }
  else if(req.body != undefined) {
    let userExist;
    for(let i = 0; i < formData.length; i++) {
      if(formData[i].username == req.body.userName) {
        userExist = true;
        break;
      }
      else {
        userExist = false;
      }
    }
    if(userExist === true) {
      await db.none('INSERT INTO customerorder(username, food_name) VALUES($1, $2)', [req.body.userName, req.body.menuitem]);
      await db.none('DROP TABLE IF EXISTS complete_customer_order');
      await db.none('CREATE TABLE complete_customer_order AS SELECT customerorder.order_number, customerorder.username, food.food_type, customerorder.food_name, food.food_price FROM customerorder INNER JOIN food ON customerorder.food_name = food.food_name')
      // If successfully ordered, will redirect to the main restaurant page
      return res.redirect("https://food-delight-test.vercel.app/index.html");
    }
    // If customer username does not exist, will redirect to the login page
    else if(userExist === false) {
      return res.redirect("https://food-delight-test.vercel.app/Login/logform.html");
    }
  }


});

/* 
-------------------------------------------------------------------------------------------------------------------
PATCH endpoints
-------------------------------------------------------------------------------------------------------------------
*/

/*
Endpoint:
  This endpoint lets you update password when user sends a reset password request
Body Parameters:
  email[string](required): email associated with the forgotten password
*/

app.patch('/forgotpassword', async (req, res) => {
  // This endpoint only allows one body parameter
  if(Object.keys(req.body).length > 1) {
    clientError(req, "Body parameters requirements not met", 400);
    res.status(400).json({error: "Body parameters requirements not met"});
  }
  // Patch endpoint should have a body
  else if(Object.keys(req.body).length == 0) {
    clientError(req, "Body parameters requirements not met", 400);
    res.status(400).json({error: "Body parameters requirements not met"});
  }
  else {
    let emailChange = await db.oneOrNone('SELECT username FROM login WHERE email = $1', req.body.email);
    if(emailChange == null || emailChange == 0) {
      clientError(req, "Account does not exist", 400);
      res.json("Account does not exist");
      // return res.redirect("http://localhost:3000/forgotpassword");
    }
    else {
      await db.oneOrNone("UPDATE login SET password = 'Password has been changed per user request' WHERE email = $1", req.body.email)
      // res.json("Password Updated");
      return res.redirect("https://food-delight-test.vercel.app/index.html");
    }
  }
     
});

/*
Endpoint:
  This endpoint lets you update an order with a different food item from the menu
Query Parameters:
  id[integer](required): the order ID to look up the order to update the food item on
Body Parameters:
  foodname[string](required): different food item from the menu
*/

app.patch('/order', async (req, res) => {
  // This endpoint only allows one body parameter
  if(Object.keys(req.body).length > 1) {
    clientError(req, "Body parameters requirements not met", 400);
    res.status(400).json({error: "Body parameters requirements not met"});
  }
  else if(Object.keys(req.body).length == 0) {
    clientError(req, "Body parameters requirements not met", 400);
    res.status(400).json({error: "Body parameters requirements not met"});
  }
  else if(Object.keys(req.query).length > 1) {
    clientError(req, "Query parameters do not meet the requirements", 400);
    res.status(400).json({error: "Query parameters do not meet the requirements length"});
  } 
  // Makes sure that client put in an ID that is a number
  else if(isNaN(req.query.id) && req.query.id != undefined) {
    clientError(req, "ID is not a number", 400);
    res.status(400).json({error: "ID is not a number"});
  }
  else if(req.body.id != undefined) {
    clientError(req, "Body parameters requirements not met", 400);
    res.status(400).json({error: "Body parameters requirements not met"});
  }
  else if(req.body.foodname === undefined) {
    clientError(req, "Body parameters requirements not met", 400);
    res.status(400).json({error: "Body parameters requirements not met name"});
  }
  else {
    let checkNullOrder = await db.oneOrNone('SELECT order_number FROM customerorder WHERE order_number = $1', req.query.id);
    if(checkNullOrder == null || checkNullOrder == 0) {
      clientError(req, "We do not have that order", 400);
      res.json("We do not have that order");
    }
    else {
      await db.oneOrNone("UPDATE customerorder SET food_name = $1 WHERE order_number = $2", [req.body.foodname, req.query.id])
      res.json("Order updated!");
    }
  }
})

/* 
-------------------------------------------------------------------------------------------------------------------
DELETE endpoints
-------------------------------------------------------------------------------------------------------------------
*/

/*
Endpoint:
  Deletes an order
Params Parameter:
  id[integer](required): the order ID 

*/

app.delete('/order/:id', async (req, res) => {
  // Delete endpoints should not have any body input
  if(Object.keys(req.body).length != 0) {
      clientError(req, "Request body is not permitted at this endpoint", 400);
      res.status(400).json({error: "Request body is not permitted at this endpoint"})
  } 
  // Checks if the id being passed is a number value
  else if(isNaN(req.params.id)){
    clientError(req, "Not a valid order ID", 400);
    res.status(400).json({error: "Not a valid order ID"});
  } 
  // Makes sure that only one id is passed at a time
  else if(Object.keys(req.params).length > 1) {
    clientError(req, "Query parameters do not meet the requirements", 400);
    res.status(400).json({error: "Query parameters do not meet the requirements length"});
  }
  else { 
    let orderData = await db.oneOrNone('SELECT * FROM customerorder WHERE order_number = $1', [req.params.id]);
    // Order ID does not exist in database
    if(orderData == null) {
        clientError(req, "That order ID does not exist", 400);
        res.status(400).json({error: "That order ID does not exist"})
    } 
    else {
        // store order information temporarily to send back as a "receipt" to user of what was deleted
        temp = orderData;
        await db.any('DELETE FROM customerorder WHERE order_number = $1', [req.params.id]);
        res.json({"Deleted order:": temp});
            
    }
  }
});

/*
Endpoint:
  Deletes an account
Params Parameter:
  id[integer](required): the account ID 

*/

app.delete('/logins/:id', async (req, res) => {
  // Delete endpoints should not have any body input
  if(Object.keys(req.body).length != 0) {
      clientError(req, "Request body is not permitted at this endpoint", 400);
      res.status(400).json({error: "Request body is not permitted at this endpoint"})
  } 
  // Checks if the id being passed is a number value
  else if(isNaN(req.params.id)){
    clientError(req, "Not a valid order ID", 400);
    res.status(400).json({error: "Not a valid account ID"});
  } 
  // Makes sure that only one id is passed at a time
  else if(Object.keys(req.params).length > 1) {
    clientError(req, "Query parameters do not meet the requirements", 400);
    res.status(400).json({error: "Query parameters do not meet the requirements length"});
  }
  else { 
    let loginData = await db.oneOrNone('SELECT * FROM login WHERE id = $1', [req.params.id]);
    // Account ID does not exist in database
    if(loginData == null) {
        clientError(req, "That order ID does not exist", 400);
        res.status(400).json({error: "That account ID does not exist"})
    } 
    else {
        // store account information temporarily to send back as a "receipt" to user of what was deleted
        temp = loginData;
        await db.any('DELETE FROM login WHERE id = $1', [req.params.id]);
        res.json({"Deleted account:": temp});
            
    }
  }
});

// To run server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})