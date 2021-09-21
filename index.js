'use strict'

// A server that uses a database. 

// express provides basic server functions
const express = require("express");

// our database operations
const dbo = require('./databaseOps');

// object that provides interface for express
const app = express();

// use this instead of the older body-parser
app.use(express.json());

// make all the files in 'public' available on the Web
app.use(express.static('public'))

// when there is nothing following the slash in the url, return the main page of the app.
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});


app.post('/store', function(request, response, next) {
  console.log(
    "Server recieved a post request for /store with body: ",
    request.body
  );
  let data = [request.body.activity, request.body.date, request.body.scalar];

  // Store inside the database
  dbo.storeDB(data).catch(
    function (error) {
      console.log("error:",error);}
  );

  response.send({
    message: "I recieved your POST request at /store"
  });
});

// making a get request to get the info for remainder
app.get("/reminder", (request, response) => {
  // response.send({
  // message: "I recieved your POST request at /reminder"});});
  console.log(
    "Server recieved a Get request for /reminder");

  dbo.remindDB().then(data => {
    data = JSON.stringify(data);
    console.log('Reminder  Success:', data);
    response.send(data);
  })
  .catch(
    function (error) {
      console.log("error:", error);}
  )
});

// making a get request to get the info for bar chart
app.get("/week?", (request, response) => {
  // response.send({
  // message: "I recieved your POST request at /reminder"});});
  console.log("Request query:", request.query);

  dbo.getWeekData(request.query.date, request.query.activity)
  .then(data => {
    data = JSON.stringify(data);
    // console.log('Get Data Success:', data);
    response.send(data);
  })
  .catch(
    function (error) {
      console.log("error:", error);}
  )
});

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});
