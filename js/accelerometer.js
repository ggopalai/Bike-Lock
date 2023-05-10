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

        var audio = new Audio('./audio/ucsdfight.mp3');
        var loopCount = 0;
        
        audio.addEventListener('ended', function() {
          loopCount++;
          if (loopCount < 5) {
            audio.play();
          }
        });
        
        audio.play();
          
        
        // Send POST request to endpoint
        fetch('https://y0d50hlxmi.execute-api.us-west-1.amazonaws.com/beta/email', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "subject": "ALERT!!!!",
            "message": "YOUR BIKE IS BEING STOLEN!!!!!",
            "recipient": recipient,
            "gps_lat": lat,
            "gps_long": long
          })
        })
        .then(response => response.json())
        .then(data => function () {
          console.log(data);
          document.getElementById("sandbox").textContent = data;
        })
        .catch(error => function () {
          console.error(error)
          document.getElementById("sandbox").textContent = data;
        });
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
