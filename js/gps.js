/**
 * Retrieves the geolocation (latitude and longitude) of the bike.
 * @returns {Promise<{ latitude: number, longitude: number }>} A promise that resolves to an object containing the latitude and longitude.
 */
export default function getLocation() {
  /**
   * Geolocation API watchPosition function that continuously monitors the position.
   * @callback GeolocationCallback
   * @param {Position} position - The current position object containing coordinates.
   */

  /**
   * Geolocation API error callback function.
   * @callback GeolocationErrorCallback
   * @param {PositionError} error - The error object containing details about the error.
   */

  /**
   * Geolocation options.
   * @type {Object}
   * @property {GeolocationCallback} success - The success callback function to execute when the position is successfully retrieved.
   * @property {GeolocationErrorCallback} error - The error callback function to execute when there is an error retrieving the position.
   */

  // Returns the geolocation of the bike as a promise
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        /**
         * Success callback function for retrieving the position.
         * @param {Position} position - The current position object containing coordinates.
         */
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        /**
         * Error callback function for retrieving the position.
         * @param {PositionError} error - The error object containing details about the error.
         */
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}
