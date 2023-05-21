import getLocation from "./gps.js";

const threshold = 7; // set threshold for movement detection

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
    getLocation()
      .then(location => {
        var lat = location.latitude;
        var long = location.longitude;
        console.log(location.latitude, location.longitude);
        createAccelerometer(lat, long);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    // Accelerometer API not supported
    document.getElementById("accelerometer-data").textContent = "The Accelerometer API is not supported in this browser.";
  }
}

function createAccelerometer(lat, long) {
  // Create an accelerometer object
  var accelerometer = new Accelerometer({ frequency: 60 });
  var lastX, lastY, lastZ;

  accelerometer.addEventListener("reading", function () {
    detectMovement(accelerometer, lat, long, lastX, lastY, lastZ);
    updateLastReadings(accelerometer, lastX, lastY, lastZ);
  });

  accelerometer.start();
}

function detectMovement(accelerometer, lat, long, lastX, lastY, lastZ) {
  var deltaX = Math.abs(lastX - accelerometer.x);
  var deltaY = Math.abs(lastY - accelerometer.y);
  var deltaZ = Math.abs(lastZ - accelerometer.z);

  if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
    const recipient = localStorage.getItem('email');
    console.log(recipient);

    document.getElementById("accelerometer-data").textContent =
      "Movement detected! - X: " +
      accelerometer.x.toFixed(2) +
      ", Y: " +
      accelerometer.y.toFixed(2) +
      ", Z: " +
      accelerometer.z.toFixed(2);

    playAudio('./sounds/ucsdfight.mp3');

    sendEmailToEndpoint(recipient, lat, long);
  } else {
    document.getElementById("accelerometer-data").textContent =
      "No movement detected.";
  }
}

function updateLastReadings(accelerometer, lastX, lastY, lastZ) {
  lastX = accelerometer.x;
  lastY = accelerometer.y;
  lastZ = accelerometer.z;
}

function playAudio(audioFile) {
  var audio = new Audio(audioFile);
  var loopCount = 0;
  var isPlaying = false;

  audio.addEventListener('ended', function () {
    if (!isPlaying) {
      loopCount++;
      if (loopCount < 5) {
        isPlaying = true;
        audio.play();
      }
    }
  });

  audio.addEventListener('play', function () {
    isPlaying = true;
  });

  audio.addEventListener('pause', function () {
    isPlaying = false;
  });

  audio.play();
}

function sendEmailToEndpoint(recipient, lat, long) {
  const emailParams = {
    "subject": "ALERT!!!!",
    "message": "YOUR BIKE IS BEING STOLEN!!!!!",
    "recipient": recipient,
    "gps_lat": lat,
    "gps_long": long
  };

  fetch('https://y0d50hlxmi.execute-api.us-west-1.amazonaws.com/beta/email', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailParams)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("sandbox").textContent = data;
    })
    .catch(error => {
      console.error(error);
      document.getElementById("sandbox").textContent = data;
    });
}
