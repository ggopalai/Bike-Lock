export default function getLocation() {

  //Returns Geolocation of the Bike
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          reject(error);
        }
      );
    } 
    else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });

}
  