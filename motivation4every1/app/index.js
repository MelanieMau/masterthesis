let document = require("document");

//Sprüche sind von https://www.lebenskarten.de/galerie/

var myMotivation = [
  'Du bist nicht (mehr) alleine – Du musst das nicht alleine durchstehen.', 
  'Du musst nicht immer funktionieren und „stark“ sein.',
  'Alles geht vorüber', 
  'Weg mit den alten Geschichten. Ich schreibe ab jetzt neue!', 
  'Auch Umwege sind Wege zum Ziel',
  'Ein Schritt nach dem anderen', 
  'Nichts nimmt mir meinen Mut', 
  'Erst, wenn ich losgehe, zeigt sich der Weg'
];

//var show = myMotivation[Math.floor(Math.random() * myMotivation.length)];

let wrnLabel = document.getElementById("motivation");

// set interval
var tid = setInterval(forMotivation, 5000);
function forMotivation() {
  wrnLabel.text = myMotivation[Math.floor(Math.random() * myMotivation.length)];
}

