'use strict';  // always start with this 

import barchart from './barchart.js'

// Reminder Tag Values, WE are goign to hide these
//OBAID START

let yesButtonReminder = document.getElementById("YesButton");
let noButtonReminder = document.getElementById("NoButton");
var pastActivityQuestion = document.getElementById("PastActivityQuestion");
var reminderTag = document.getElementById("ReminderTag");
var reminderDivOuter = document.getElementById("ReminderDivOuter");
var yesterDaysActivity = document.getElementById("PastActivityQuestion");// NEeds to be REsponsive
var remind_date_fill;
var remind_activity_fill;

// rEMINDER TAG ONCLICKS
yesButtonReminder.addEventListener("click", past_act_add_on_yes_click)

noButtonReminder.addEventListener("click", removeAll);


function past_act_add_on_yes_click() {

  /* Connect to Past Activity Sections */
  let pActAdd = document.getElementById("pAct-Add");
  let pActForm = document.getElementById("pAct-Form");
  let date_bro = new Date(remind_date_fill -864e5);
  // console.log(date_bro);
  // console.log(newUTCDate());
  /* Show Form, Hide 'Add New Activity' Button */
  pActAdd.classList.add("hide");
  pActForm.classList.remove("hide");

  document.getElementById('pAct-date').valueAsDate = date_bro;
  document.getElementById('pAct-activity').value = remind_activity_fill;
  document.getElementById('pAct-scalar').value = ""
  past_activity_dropdown_onchange();
  removeAll();
}

/*This function removes the Reminder header when yes or no is clicked  OBAID*/
// FOR THE REMINDER TAG  
function removeAll(){
  // yesButtonReminder.style.display = "none";
  // noButtonReminder.style.display = "none";
  // pastActivityQuestion.style.display = "none";
  // reminderTag.style.display = "none";
  reminderDivOuter.style.display = "none";
}


//OBAID END

/* Set default date in forms to current date */
document.getElementById('pAct-date').valueAsDate = newUTCDate()
document.getElementById('fAct-date').valueAsDate = newUTCDate()


// view progress button for modal
let progress_button = document.querySelector(".view-progress");
let modal = document.querySelector(".modal");
let close_button = document.querySelector(".close-button");

function togglemodal(){
  modal.classList.toggle("show-modal");
}

function windowclick(e){
  if(e.target == modal){
    togglemodal();
  }
}

function add_bar_info_progress() {
  document.getElementById('modal-week-ending').valueAsDate = newUTCDate();
  document.getElementById('modal-activity-bar').value = "Walk";
  add_bar_activity_onclick()
  togglemodal();
}


  // /* Reset Form */
  // document.getElementById('pAct-date').valueAsDate = newUTCDate()
  // document.getElementById('pAct-activity').value = "Walk"
  // document.getElementById('pAct-scalar').value = ""
  // document.getElementById('pAct-unit').value = "km"



progress_button.addEventListener("click",add_bar_info_progress);
close_button.addEventListener("click",togglemodal);
window.addEventListener("click",windowclick);


/* Past Activity 'Add New Activity' Button - Show Form */
let add_past_activity_button = document.getElementById("addPastActivityButton")
add_past_activity_button.addEventListener("click", add_past_activity_onclick);


/* Future Activity 'Add New Activity' Button - Show Form */
let add_future_activity_button = document.getElementById("addFutureActivityButton")
add_future_activity_button.addEventListener("click", add_future_activity_onclick);


/* Past Activity Form Dropdown */
let past_activity_dropdown = document.getElementById("pAct-activity")
past_activity_dropdown.addEventListener("change", past_activity_dropdown_onchange);


/* Past Activity 'Submit' Button - Submit Form */
let submit_past_activity_button = document.getElementById("submitPastActivityButton")
submit_past_activity_button.addEventListener("click", submit_past_activity_onclick);


/* Future Activity 'Submit' Button - Submit Form */
let submit_future_activity_button = document.getElementById("submitFutureActivityButton")
submit_future_activity_button.addEventListener("click", submit_future_activity_onclick)

/* bar chart Activity bar chart render*/
let add_bar_chart_button = document.getElementById("bar-chart-button")
add_bar_chart_button.addEventListener("click", add_bar_activity_onclick);

/**
 * ONCLICK - Hide 'Add New Activity' Button under the Past Section and Show
 * Form to Add a Past Activity
 */
function add_past_activity_onclick() {
  /* Connect to Past Activity Sections */
  let pActAdd = document.getElementById("pAct-Add");
  let pActForm = document.getElementById("pAct-Form");

  /* Show Form, Hide 'Add New Activity' Button */
  pActAdd.classList.add("hide");
  pActForm.classList.remove("hide");
}


/**
 * ONCLICK - Hide 'Add New Activity' Button under the Future Section and Show
 * Form to Add a Future Activity
 */
function add_future_activity_onclick() {
  /* Connect to Past Activity Sections */
  let fActAdd = document.getElementById("fAct-Add");
  let fActForm = document.getElementById("fAct-Form");

  /* Show Form, Hide 'Add New Activity' Button */
  fActAdd.classList.add("hide");
  fActForm.classList.remove("hide");
}


/**
 * ONCHANGE - Automatically Change Units in Past Activty Form to accomodate the
 * selected Activity from the dropdown menu
 */
function past_activity_dropdown_onchange() {
  /* Connect to Past Activity Unit Input */
  let pActUnit = document.getElementById("pAct-unit");

  /* Show Form, Hide 'Add New Activity' Button */
  switch (past_activity_dropdown.value) {
    case 'Walk': case 'Run': case 'Bike':
      pActUnit.value = 'km';
      break;
    case 'Swim':
      pActUnit.value = 'laps';
      break;
    case 'Yoga': case 'Soccer': case 'Basketball':
      pActUnit.value = 'minutes';
      break;
    default:
      pActUnit.value = 'units';
  }
}


/**
 * ONCLICK - Validate Past Activity Form Contents, Send Data to Server, Remove
 * Form, and Display 'Add ...' Button with confirmation text above
 */
function submit_past_activity_onclick() {
  /* Connect to Past Activity Sections */
  let pActAdd = document.getElementById("pAct-Add");
  let pActForm = document.getElementById("pAct-Form");
  
  /* Activity Data to Send to Server */
  let data = {
    date: document.getElementById('pAct-date').value,
    activity: document.getElementById('pAct-activity').value,
    scalar: parseInt(document.getElementById('pAct-scalar').value),
    units: document.getElementById('pAct-unit').value
  }

  if (!past_activity_form_is_valid(data)) {  
    alert("Invalid Past Activity. Please fill in the entire form.");
    return
  }

  /* Hide Form, Show 'Add New Activity' Button */
  pActAdd.classList.remove("hide");
  pActForm.classList.add("hide");
  
  /* Add 'p' tag above 'Add New Activity' Button */
  let newActivity = create_submission_success_element(   
    "Got it! ",
    `${data.activity} for ${data.scalar} ${data.units}. `,
    "Keep it up!"
  )

  insert_latest_response(pActAdd, newActivity)

  console.log('Past Activity Sending:', data);

  /* Post Activity Data to Server */
  fetch(`/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), // post body
  })
  .then(response => response.json())
  .then(data => {
    console.log('Past Activity Success:', data);
  })
  .catch((error) => {
    console.error('Past Activity Error:', error);
  });
 
  /* Reset Form */
  document.getElementById('pAct-date').valueAsDate = newUTCDate()
  document.getElementById('pAct-activity').value = "Walk"
  document.getElementById('pAct-scalar').value = ""
  document.getElementById('pAct-unit').value = "km"
}


/**
 * ONCLICK - Validate Future Activity Form Contents, Send Data to Server, Remove
 * Form, and Display 'Add ...' Button with confirmation text above
 */
function submit_future_activity_onclick() {
  /* Connect to Future Activity Sections */
  let fActAdd = document.getElementById("fAct-Add");
  let fActForm = document.getElementById("fAct-Form");
  
  /* Activity Data to Send to Server */
  let data = {
    date: document.getElementById('fAct-date').value,
    activity: document.getElementById('fAct-activity').value,
    scalar: -1
  }
  
  /* Form Validation */
  if (!future_activity_form_is_valid(data)) {  
    alert("Invalid Future Plan. Please fill in the entire form.");
    return
  }

  /* Hide Form, Show 'Add New Activity' Button */
  fActAdd.classList.remove("hide");
  fActForm.classList.add("hide");

  /* Add 'p' tag above 'Add New Activity' Button  */
  let newActivity = create_submission_success_element(
    "Sounds good! Don't forget to come back to update your session for ",
    `${data.activity} on ${reformat_date(data.date)}`,
    "!"
  )

  insert_latest_response(fActAdd, newActivity)

  console.log('Future Plans Sending:', data);

  /* Post Activity Data to Server */
  fetch(`/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), // post body
  })
  .then(response => response.json())
  .then(data => {
    console.log('Future Plans Success:', data);
  })
  .catch((error) => {
    console.error('Future Plans Error:', error);
  });

  /* Reset Form */
  document.getElementById('fAct-date').valueAsDate = newUTCDate()
  document.getElementById('fAct-activity').value = "Walk"
}


/**
 * Create DOM element for acknowledgment message to send to user for submitting a form
 * @param {string} beg - regular starting section
 * @param {string} mid - bolded middle section
 * @param {string} end - regular trailing text
 * @returns {HTMLElement} DOM element combining beg, mid, end
 */
function create_submission_success_element(beg, mid, end) {
  /* Create all HTML elements to add */
  let newMessage = document.createElement('p')
  let baseText = document.createElement('span')
  let dynamicText = document.createElement('strong')
  let exclamationText = document.createElement('span')
  
  /* Update textContent of all generated DOM elements */
  baseText.textContent = beg
  dynamicText.textContent = mid
  exclamationText.textContent = end
  
  /* Append all text contents back to back in wrapper 'p' tag */
  newMessage.appendChild(baseText)
  newMessage.appendChild(dynamicText)
  newMessage.appendChild(exclamationText)

  return newMessage  
}


/**
 * Checks if past activity data is valid
 * @param {Object} data
 * @param {string} data.date - format 'mm-dd-yyyy'
 * @param {string} data.activity
 * @param {string} data.scalar - time or distance integer or float
 * @param {string} data.units - units for scalar value
 * @returns {boolean} Boolean represents if data is valid
 */
function past_activity_form_is_valid(data) {
  let date = new Date(data.date.replace('-','/'))
  if ( date != "Invalid Date" && date > newUTCDate()) {
    return false
  }

  return !(data.date == "" || data.activity == "" || data.scalar == "" || data.units == "" )
}


/**
 * Checks if future activity data is valid
 * @param {Object} data
 * @param {string} data.date
 * @param {string} data.activity
 * @returns {boolean} Boolean represents if data is valid
 */
function future_activity_form_is_valid(data) {
  let date = new Date(data.date.replace('-','/'))
  if ( date != "Invalid Date" && date < newUTCDate()) {
    return false
  }

  return !(data.date == "" || data.activity == "")
}


/**
 * Insert Prompt at the top of parent and remove old prompts
 * @param {HTMLElement} parent - DOM element 
 * @param {HTMLElement} child - DOM element
 */
function insert_latest_response(parent, child) {
  if(parent.children.length > 1) {
    parent.removeChild(parent.children[0])
  }
  parent.insertBefore(child, parent.childNodes[0])
}


/**
 * Convert 'yyyy-mm-dd' to 'mm/dd/yy'
 * @param {string} date 
 * @returns {string} same date, but reformated
 */
function reformat_date(date) {
  let [yyyy, mm, dd] = date.split("-");
  return `${mm}/${dd}/${yyyy.substring(2,4)}`
}


/**
 * Convert GMT date to UTC
 * @returns {Date} current date, but converts GMT date to UTC date
 */
function newUTCDate() {
  let gmtDate = new Date()
  return new Date(gmtDate.toLocaleDateString())
}

// Add onload event listener 
window.onload = reminder;

/** Reminder */
async function reminder() {
    fetch(`/reminder`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(data), // post body
    })
    .then(response => response.json())
    .then(data => {
      if ((data.date == 0) || (data.activity == "")) {
        removeAll();
      } else {
        reminder_writer(data.date, data.activity);
      }
      console.log('Reminder Success:', data);
    })
    .catch((error) => {
      console.error('Reminder Error:', error);
  });

}

function reminder_writer(date, activity) {
  // Converting date to integer
  let gotten_date = parseInt(date);

  // Give data back so that we can use it later
  remind_date_fill = gotten_date;
  remind_activity_fill = activity;

  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  
  let remind_date = new Date(gotten_date).toLocaleDateString('en-US');
  
  /* Reminder questions */
  let reminder_question = document.getElementById("PastActivityQuestion")

  let new_date = new Date().toLocaleDateString('en-US');
  // console.log("new_date", new_date)

  let remind_today = new Date(new_date).getTime();
  // console.log("remind_today", remind_today)

  let remind_yesterday = new Date(remind_today - 864e5).getTime();
  // console.log("remind_yes", remind_yesterday)

  let weekBefore = new Date(remind_today - 5184e5).getTime();

  // Writing to the past activity
  if (gotten_date >= remind_today) {
    reminder_question.textContent = "Did you " + `${activity}` + " today?";
  }

  else if((gotten_date >= remind_yesterday) && (gotten_date <= remind_today) 
  && (activity != "") ) {
    reminder_question.textContent = "Did you " + `${activity}` + " yesterday?";
  } 
  
  else if ((gotten_date < remind_yesterday) && (activity != "")) {
    let new_day = new Date(remind_date).getDay();

    if (gotten_date < weekBefore) {
      reminder_question.textContent = "Did you " + `${activity}` + " on last " + `${weekdays[new_day]}` + "?";
    } else {
      reminder_question.textContent = "Did you " + `${activity}` + " on " + `${weekdays[new_day]}` + "?";
    }
  }
}

/* It should reutrn the week value and call the fetch for /week with date and activity then it should render / update the bar chart look*/
function add_bar_activity_onclick () {

  let data = {
    date: document.getElementById('modal-week-ending').value,
    activity: document.getElementById('modal-activity-bar').value,
  }

  console.log(data)

  if (!past_activity_form_is_valid(data)) {  
    alert("Invalid Past Activity. Please fill in the entire form.");
    return
  }

  fetch(`/week?date=${data.date}&activity=${data.activity}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let value = data_maker(data);
    barchart.render(value);
    bar_x_axis_change(data[0].activity);
    console.log('bar activity Success:', data);
  })
  .catch((error) => {
    console.error('bar activity Error:', error);
  });
}


/* Filter the data so that all the days that are the same then add the value and retun a data 
@params {array of dates with the activity}
*/
function data_maker(data) {

  let newData = [null, null, null, null, null, null, null];
  let filter = [];
  
  for(let i = 0; i < data.length; i++) {
    filter.push(data[i].date);
    // getting the day value
    let day = new Date(data[i].date).getDay();

    // checking days and adding any extra values
    if(day == 0) {
      if(newData[0] == null){
        newData[0] = {"date": data[i].date, "value": data[i].amount, "activity": data[i].activity};
      } else {
        newData[0].value += data[i].amount;
      }
    }
    else if(day == 1) {
      if(newData[1] == null){
        newData[1] = {"date": data[i].date, "value": data[i].amount, "activity": data[i].activity};
      } else {
        newData[1].value += data[i].amount;
      }
    }
    else if(day == 2) {
      if(newData[2] == null){
        newData[2] = {"date": data[i].date, "value": data[i].amount, "activity": data[i].activity};
      } else {
        newData[2].value += data[i].amount;
      }
    }
    else if(day == 3) {
      if(newData[3] == null){
        newData[3] = {"date": data[i].date, "value": data[i].amount, "activity": data[i].activity};
      } else {
        newData[3].value += data[i].amount;
      }
    }
   else if(day == 4) {
      if(newData[4] == null){
        newData[4] = {"date": data[i].date, "value": data[i].amount, "activity": data[i].activity};
      } else {
        newData[4].value += data[i].amount;
      }
    }
    else if(day == 5) {
      if(newData[5] == null){
        newData[5] = {"date": data[i].date, "value": data[i].amount, "activity": data[i].activity};
      } else {
        newData[5].value += data[i].amount;
      }
    }
    else if(day == 6) {
      if(newData[6] == null){
        newData[6] = {"date": data[i].date, "value": data[i].amount, "activity": data[i].activity};
      } else {
        newData[6].value += data[i].amount;
      }
    }
  }

  console.log("filter", filter);

  let oldest_date = filter.reduce(function(a,b) {
                      return Math.max(a,b);
                    })
  

  console.log("Oldest", oldest_date)
  // Trying to get date
  let new_world = [];

  for(let i = 0; i < newData.length; i++) {
    new_world.push(oldest_date)
    oldest_date -= 864e5;
  }

  console.log("new world",  new_world)

  let newer_world = new Object();

  for(let i = 0; i < new_world.length; i++) {
    let day_new = new Date(new_world[i]).getDay();
    console.log(day_new);
    newer_world[day_new] = new_world[i]
  }

  // console.log("newer world", newer_world);

  for(let i = 0; i < newData.length; i++) {
    console.log("got 598")
    if (newData[i] == null) {
      console.log("got in null new data")
      // "date": data[i].date, "value": data[i].amount, "activity": data[i].activity
      newData[i] = {"date": newer_world[i], "value": 0, "activity": data[0].activity};
    }
  }

  console.log(newData);

  return newData;
}

/* Changing the text of the X axis on the bar chart */
function bar_x_axis_change(activity) {
  // getting the class
  let barchart_x_axis = document.querySelector(".barchart-x-axis-label");
  
  // getting the distance/time value
  let dist_time = bar_activity_dropdown_onchange(activity)
  
  // writing to the x axis.
  barchart_x_axis.textContent = `${dist_time}`;
}

/** Giving time or distance based on activity for the bar x axis */
function bar_activity_dropdown_onchange(activty) {
  switch (activty) {
    case 'Walk':
      return "Kilometers Walked";
    case 'Run': 
      return "Kilometers Ran";
    case 'Bike':
      return "Kilometers Biked";
    case 'Swim':
      return 'Laps Swam';
    case 'Yoga':
      return "Minutes of Yoga"
    case 'Soccer':
      return "Minutes of Soccer"
    case 'Basketball':
      return "Minutes of Basketball"
    default:
      return 'units';
  }
}
