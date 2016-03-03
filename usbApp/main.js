// Codesters USB App
// by Codesters
var makesenseDevice;

var discoverDevices = function(devices) {
  // This is called as a callback from chrome.hid.getDevices()

  makesenseDevice = new MakeSense(devices);
  makesenseDevice.prePollFrequency = 30

};

var initializeApp = function(){
  chrome.hid.getDevices({}, discoverDevices);
};
initializeApp();



var lastValue = null;
window.setInterval(function(){
  if(makesenseDevice && makesenseDevice.hasReceivedData){
    var analog_values = makesenseDevice.analog_values;
    var digital_values = makesenseDevice.digital_values;
    chrome.runtime.sendMessage({update: true, analog: analog_values, digital: digital_values});
  }
},200);

// On a disconnect
//
// if (!(connection === -1)){
//   chrome.hid.disconnect(connection, function() {});
//   connection = -1;
//   console.log("Disconnected with ID: "+connection);
//   enablePolling(false);
//   ui.makesenseDetected.innerHTML = "IO Board Disconnected";
//   enableIOControls(false);
// }


// Make a config window
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create(
      "control-panel.html",
      {
        innerBounds: { width: 485, height: 310, minWidth: 485 }
      });
});

// Allow External connect
//
// chrome.runtime.onConnectExternal.addListener(function(){
//
// });
