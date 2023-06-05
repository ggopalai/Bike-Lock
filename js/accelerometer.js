import getLocation from "./gps.js";
import sendMail from "./camera.js";

/**
 * Set threshold for movement detection.
 * @type {number}
 */
const threshold = 7; 

/**
 * Starts detecting accelerometer data and initiates the permission request if needed.
 */
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

/**
 * Starts detecting accelerometer data.
 */
function startAccelerometer() {
  // Check for support for the Accelerometer API
  if ("Accelerometer" in window) {
    var lat, long;
    getLocation()
    .then(location => {
      lat = location.latitude;
      long = location.longitude;
      console.log(location.latitude, location.longitude);
    })
    .catch(error => {
      console.error(error);
    });
    
    // Create an accelerometer object
    var accelerometer = new Accelerometer({ frequency: 60 });
    var lastX, lastY, lastZ;
    accelerometer.addEventListener("reading", function () {
      // Calculate the difference between the current and last accelerometer readings
      var deltaX = Math.abs(lastX - accelerometer.x);
      var deltaY = Math.abs(lastY - accelerometer.y);
      var deltaZ = Math.abs(lastZ - accelerometer.z);
      // Check if the difference exceeds the threshold
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

        var audio = new Audio('./sounds/ucsdfight.mp3');
        var loopCount = 0;
        var isPlaying = false;
        
        audio.addEventListener('ended', function() {
          if (!isPlaying) {
            loopCount++;
            if (loopCount < 5) {
              isPlaying = true;
              audio.play();
            }
          }
        });
        
        audio.addEventListener('play', function() {
          let state = localStorage.getItem("state");
          if (state=="1") {
            isPlaying = true;
          }   
        });
        
        audio.addEventListener('pause', function() {
          isPlaying = false;
        });
        
        audio.play();

        // Send email
        sendMail(lat, long);
        
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
