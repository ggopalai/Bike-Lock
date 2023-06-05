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
 * Event listener for the click event on the lock button.
 * @param {MouseEvent} event - The click event object.
 */
lockButton.addEventListener("click", function (event) {
  event.preventDefault();

  /**
   * The passcode entered by the user.
   * @type {string}
   */
  const passcode_entered = passcodeInput.value;

  /**
   * The passcode stored in local storage.
   * @type {string}
   */
  const passcode_stored = localStorage.getItem("passcode");

  if (parseInt(passcode_entered) === parseInt(passcode_stored)) {
    location.href = "./index.html";
    localStorage.removeItem("passcode");
    localStorage.removeItem("email");
  } else {
    alert("ERROR: Wrong Passcode");
  }
});
