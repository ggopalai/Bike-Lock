export default function getAccelerometerData() {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    // The Permissions API is supported
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          // The permission has been granted
          window.addEventListener("devicemotion", (e) => {
            const { x, y, z } = e.acceleration;
            document.getElementById("accelerometer-data").innerHTML = `X: ${x}, Y: ${y}, Z: ${z}`;
            console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
            // Use the x, y, and z values as needed
          });
        } else {
          console.log("Permission for accelerometer access denied");
        }
      })
      .catch(console.error);
  } else {
    console.log("Accelerometer is not supported on this device");
  }
}
