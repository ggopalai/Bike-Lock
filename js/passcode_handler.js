/**
 * Represents the lock button element.
 * @type {HTMLElement}
 */
const lockButton = document.getElementById("lock");

/**
 * Represents the passcode input element.
 * @type {HTMLInputElement}
 */
const passcodeInput = document.getElementById("passcode");

/**
 * Represents the email input element.
 * @type {HTMLInputElement}
 */
const emailInput = document.getElementById("email");

/**
 * Event listener callback function for the lock button click event.
 * @callback LockButtonClickCallback
 * @param {Event} event - The click event object.
 */

/**
 * Add an event listener to the lock button for the click event.
 * @param {string} type - The event type, in this case, "click".
 * @param {LockButtonClickCallback} listener - The event listener callback function to execute when the button is clicked.
 * @param {boolean | AddEventListenerOptions} options - An options object that specifies characteristics about the event listener.
 */
lockButton.addEventListener("click", function (event) {
  /**
   * Event object representing the click event.
   * @typedef {Event} ClickEvent
   */

  /**
   * Prevents the default action of the event.
   * @method
   */
  event.preventDefault();

  // Get the passcode entered by the user
  /**
   * The passcode entered by the user.
   * @type {string}
   */
  const passcode = passcodeInput.value;

  /**
   * The email entered by the user.
   * @type {string}
   */
  const email = emailInput.value;

  // Store the passcode and email in local storage
  localStorage.setItem("passcode", passcode);
  localStorage.setItem("email", email);

  // Change pages
  location.href = "./locked.html";
});
