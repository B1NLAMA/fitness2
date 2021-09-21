'use strict'

// using a Promises-wrapped version of sqlite3
const db = require('./sqlWrap');

// SQL commands for ActivityTable
const insertDB = "insert into ActivityTable (activity, date, amount) values (?,?,?)"
const getOneDB = "select * from ActivityTable where activity = ? and date = ? and amount = ?";
const allDB = "select * from ActivityTable where activity = ?";
const amountSel = "select * from ActivityTable where amount = ?";
const deleteSelection = "DELETE from ActivityTable WHERE date = ?";
const selectRange = "SELECT * from ActivityTable WHERE date BETWEEN ? AND ? and activity =? and amount >= 0";

// Store values to the database
async function storeDB (data) {
  // make a new date
  const date = new Date(data[1]).getTime();

  // for some reason the date is giving older date like one day before so I am adding one day to it
  data[1] = date + 864e5;
  // await db.deleteEverything();
  console.log(data)
  // Insert it to database
  await db.run(insertDB, data);
}

// Giving out values that I have to make reminder for
async function remindDB () {
  let newDate = new Date().toLocaleDateString('en-US');

  let today = new Date(newDate).getTime();
  today += 864e5;

  // Get all future plan data
  let result = await db.all(amountSel, [-1]);

  console.log(result)
  let pastDate = [];

  console.log(today)
  // if they are older than today then move them to pastDate array
  for (let i = 0; i < result.length; i++) {
    if (result[i].date < today) {
      pastDate.push(result[i].date);
    }
  };

  // Find the date that is latest
  let max = 0;

  if(pastDate.length != 0) {
    max = pastDate.reduce(function(a,b) {
            return Math.max(a,b);
          })
  }

  // rendering the output
  let output = new Object();

  // Using the max value get the date and activity of that data
  // and store it to the output object
  if (max == 0) {
    output.date = 0;
    output.activity = "";
  } else {
    for(let i = 0; i < result.length; i++) {
      if (result[i].date == max) {
          output.date = result[i].date;
          output.activity = result[i].activity;
      }
    }
  }

  // Remove old database after we have the info we need
  for(let i = 0; i < pastDate.length; i++) {
    console.log("pastDate", pastDate[i]);
    await db.run(deleteSelection, pastDate[i])
  }

  return output;
}

// Getting the week data and range of that data.
async function getWeekData(date, activity) {

  let newDate = new Date(date).getTime();
  console.log("before: ", newDate)
  newDate += 864e5;
  // Changing it to int
  console.log(newDate)
  // Getting weekbefore date
  let weekBefore = new Date(newDate - 5184e5).getTime();

  console.log("weekbefore", weekBefore);
  // Getting the range of data
  let result = await db.all(selectRange,[weekBefore, newDate, activity]);
  console.log(result);
  return result;
}

// Exports
module.exports.storeDB = storeDB;
module.exports.remindDB = remindDB;
module.exports.getWeekData = getWeekData;
