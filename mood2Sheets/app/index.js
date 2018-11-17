import document from "document";
import * as messaging from "messaging";

const btn_happy = document.getElementById("btn_happy");
const eventName = "mood2sheet";


btn_happy.addEventListener("Happy", () => {
  sendEventIfReady(eventName);
});

function sendEventIfReady(eventName) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({eventName: eventName});
  }
}



