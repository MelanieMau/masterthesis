import document from "document";
import * as messaging from "messaging";

const btn_happy = document.getElementById("btn_happy");
const btn_bad = document.getElementById("btn-bad");
const eventName = "mood2sheet";

if (btn_happy){
  btn_happy.addEventListener("click", () => {
    sendEventIfReady(eventName, "good");
  });
}
if (btn_bad){
btn_bad.addEventListener("click", () => {
  sendEventIfReady(eventName, "bad");
});
}

function sendEventIfReady(eventName, val) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({eventName: eventName, result: val});
  }
}






