import getLocation from "./gps.js";
import sendMail from "./camera.js";
const video = document.getElementById('videoElement');
const canvas = document.getElementById('canvasElement');

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

          alert("sending mail");
          sendMail(lat,long);

      //     canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    
      //     const maxImageWidth = 600; // Maximum width for the compressed image
      //     const maxImageHeight = 600; // Maximum height for the compressed image
          
      //     // Create a new canvas element for the compressed image
      //     const compressedCanvas = document.createElement('canvas');
      //     const compressedContext = compressedCanvas.getContext('2d');
          
      //     // Calculate the dimensions for the compressed image while preserving aspect ratio
      //     let compressedWidth = canvas.width;
      //     let compressedHeight = canvas.height;
      //     if (compressedWidth > maxImageWidth) {
      //         compressedWidth = maxImageWidth;
      //         compressedHeight = (canvas.height / canvas.width) * compressedWidth;
      //     }
      //     if (compressedHeight > maxImageHeight) {
      //         compressedHeight = maxImageHeight;
      //         compressedWidth = (canvas.width / canvas.height) * compressedHeight;
      //     }
          
      //     // Set the dimensions of the compressed canvas
      //     compressedCanvas.width = compressedWidth;
      //     compressedCanvas.height = compressedHeight;
          
      //     // Draw the image onto the compressed canvas
      //     compressedContext.drawImage(video, 0, 0, compressedWidth, compressedHeight);
          
      //     // Get the compressed image data as a Blob object
      //     compressedCanvas.toBlob((blob) => {
      //     const reader = new FileReader();
      //     reader.onloadend = () => {
      //     // Get the compressed image data as base64 string
      //     const compressedPhotoData = reader.result;
      //     const recipient = recipient;
      //     const subject = 'ALERT!!!!';
      //     const message = 'YOUR BIKE IS BEING STOLEN!!!!!';
      //     const gps_lat = lat;
      //     const gps_long = long;
        
      //   // Send POST request to endpoint
      //   fetch('https://y0d50hlxmi.execute-api.us-west-1.amazonaws.com/beta/email', {
      //     method: 'POST',
      //     mode: 'no-cors',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       subject,
      //       message,
      //       recipient,
      //       gps_lat,
      //       gps_long,
      //       photoData: compressedPhotoData,
      //   }),
      //   })
      //   .then(response => response.json())
      //   .then(data => function () {
      //     console.log(data);
      //     document.getElementById("sandbox").textContent = data;
      //   })
      //   // .catch(error => function () {
      //   //   console.error(error)
      //   //   document.getElementById("sandbox").textContent = data;
      //   // });
      // };
      //   reader.readAsDataURL(blob);
      // }, 'image/jpeg', 0.7); 
      // Specify the image format and compression quality (0.7 means 70% quality)
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
