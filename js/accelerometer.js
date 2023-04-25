const threshold = 0.5; // set threshold for movement detection

export default function getAccelerometerData() {
  // Check for support for the Permissions API
  if ("permissions" in navigator) {
    // Request permission to use the accelerometer
    navigator.permissions
      .query({ name: "accelerometer" })
      .then(function (result) {
        if (result.state === "granted") {
          // Permission has already been granted, so start detecting the accelerometer data
          startAccelerometer();
        } else {
          // Permission hasn't been granted yet, so display a button to request permission
          var button = document.createElement("button");
          button.textContent = "Request accelerometer permission";
          button.addEventListener("click", function () {
            navigator.permissions
              .request({ name: "accelerometer" })
              .then(function (result) {
                if (result.state === "granted") {
                  // Permission has been granted, so start detecting the accelerometer data
                  startAccelerometer();
                }
              });
          });
          document.body.appendChild(button);
        }
      });
  } else {
    // Permissions API not supported
    document.getElementById("accelerometer-data").textContent = "The Permissions API is not supported in this browser.";
  }
}

// Function to start detecting accelerometer data
function startAccelerometer() {
  // Check for support for the Accelerometer API
  if ("Accelerometer" in window) {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // create audio context
    var oscillator = audioCtx.createOscillator(); // create oscillator
    oscillator.type = "sine"; // set oscillator type to sine
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // set frequency of the oscillator to 440Hz
    var gainNode = audioCtx.createGain(); // create gain node
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime); // set initial gain to 0
    oscillator.connect(gainNode); // connect oscillator to gain node
    gainNode.connect(audioCtx.destination); // connect gain node to audio context destination

    var accelerometer = new Accelerometer({ frequency: 60 });
    var lastX, lastY, lastZ;
    accelerometer.addEventListener("reading", function () {
      // Calculate the difference between the current and last accelerometer readings
      var deltaX = Math.abs(lastX - accelerometer.x);
      var deltaY = Math.abs(lastY - accelerometer.y);
      var deltaZ = Math.abs(lastZ - accelerometer.z);
      // Check if the difference exceeds the threshold
      if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
        document.getElementById("accelerometer-data").textContent =
          "Movement detected!";
          // Play sound
          gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01); // ramp up gain to 1 in 0.01 seconds
          gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5); // ramp down gain to 0 in 0.5 seconds
          oscillator.start(); // start oscillator
          setTimeout(function() { oscillator.stop(); }, 500); // stop oscillator after 500ms
      } else {
        document.getElementById("accelerometer-data").textContent =
          "No movement detected.";
      }
      // Update the last accelerometer readings
      lastX = accelerometer.x;
      lastY = accelerometer.y;
      lastZ = accelerometer.z;
    });
    accelerometer.start();
  } else {
    // Accelerometer API not supported
    document.getElementById("accelerometer-data").textContent = "The Accelerometer API is not supported in this browser.";
  }
}

