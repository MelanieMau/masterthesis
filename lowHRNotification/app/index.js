import document from "document";
import { me } from "appbit";
import { HeartRateSensor } from "heart-rate";
import * as messaging from "messaging";
import { geolocation } from "geolocation";


// Fetch UI elements we will need to change
let hrLabel = document.getElementById("hrm");
let updatedLabel = document.getElementById("updated");
let wrnLabel = document.getElementById("warning");
let gpsLabel = document.getElementById("gps");

const eventName = "demo_trigger";

// Keep a timestamp of the last reading received. Start when the app is started.
let lastValueTimestamp = Date.now();

// Initialize the UI with some values
hrLabel.text = "--";

updatedLabel.text = "...";

wrnLabel.text ="...";

gpsLabel.text =" ";

// This function takes a number of milliseconds and returns a string
// such as "5min ago".
function convertMsAgoToString(millisecondsAgo) {
  if (millisecondsAgo < 120*1000) {
    return Math.round(millisecondsAgo / 1000) + "s ago";
  }
  else if (millisecondsAgo < 60*60*1000) {
    return Math.round(millisecondsAgo / (60*1000)) + "min ago";
  }
  else {
    return Math.round(millisecondsAgo / (60*60*1000)) + "h ago"
  }
}

// This function updates the label on the display that shows when data was last updated.
function updateDisplay() {
  if (lastValueTimestamp !== undefined) {
    updatedLabel.text = convertMsAgoToString(Date.now() - lastValueTimestamp);
  }
}

// Create a new instance of the HeartRateSensor object
  if (me.permissions.granted("access_heart_rate")){
  var hrm = new HeartRateSensor();
    
  
  // Declare an event handler that will be called every time a new HR value is received.
  hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  hrLabel.text = hrm.heartRate;
  lastValueTimestamp = Date.now();
    
//   Displays a warning and gps data when heartrate is too low
    if (hrm.heartRate <= 30)
      wrnLabel.text = ("Dein Puls ist sehr niedrig. Wenn dieser Zustand anhält, informiere bitte jemanden.");
      geolocation.getCurrentPosition(locationSuccess, locationError);
      gpsLabel.text = ("Latitude: " + position.coords.latitude, "Longitude: " + position.coords.longitude);

//  Fires a trigger to send an email to a family member    
//     sendEventIfReady(eventName);
    else
      wrnLabel.text = ("");
//    }

  }

  // Begin monitoring the sensor
  hrm.start();
}
  
// And update the display every second
setInterval(updateDisplay, 1000);

function sendEventIfReady(eventName) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({eventName: eventName});
  }
}

function locationSuccess(position) {
    console.log("Latitude: " + position.coords.latitude,
                "Longitude: " + position.coords.longitude);
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}

