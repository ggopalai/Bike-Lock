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
    var message = document.createElement("p");
    message.textContent =
      "The Permissions API is not supported in this browser.";
    document.body.appendChild(message);
  }
    // if (
    //   typeof DeviceMotionEvent !== "undefined" &&
    //   typeof DeviceMotionEvent.requestPermission === "function"
    // ) {
    //   // The Permissions API is supported
    //   DeviceMotionEvent.requestPermission()
    //     .then((permissionState) => {
    //       if (permissionState === "granted") {
    //         // The permission has been granted
    //         window.addEventListener("devicemotion", (e) => {
    //           const { x, y, z } = e.acceleration;
    //           document.getElementById("accelerometer-data").innerHTML = `X: ${x}, Y: ${y}, Z: ${z}`;
    //           console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
    //           // Use the x, y, and z values as needed
    //         });
    //       } else {
    //         console.log("Permission for accelerometer access denied");
    //       }
    //     })
    //     .catch(console.error);
    // } else {
    //   console.log("Accelerometer is not supported on this device");
    // }
}

// Function to start detecting accelerometer data
function startAccelerometer() {
  // Check for support for the Accelerometer API
  if ("Accelerometer" in window) {
    var accelerometer = new Accelerometer({ frequency: 60 });
    accelerometer.addEventListener("reading", function () {
      // Display the X, Y, and Z coordinates
      document.getElementById("accelerometer-data").textContent =
        "X: " +
        accelerometer.x.toFixed(2) +
        ", Y: " +
        accelerometer.y.toFixed(2) +
        ", Z: " +
        accelerometer.z.toFixed(2);
    });
    accelerometer.start();
  } else {
    // Accelerometer API not supported
    var message = document.createElement("p");
    message.textContent =
      "The Accelerometer API is not supported in this browser.";
    document.body.appendChild(message);
  }
}
