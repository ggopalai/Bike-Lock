/**
 * The email value obtained from local storage.
 * @type {string}
 */
let email = localStorage.getItem('email');

/**
 * Represents the post-registration locked div element.
 * @type {HTMLElement}
 */
const postregLockedDiv = document.getElementById('postreg-locked');

/**
 * Represents the display status element.
 * @type {HTMLElement}
 */
const displayStatus = document.getElementById('status');

/**
 * The URL used for the EventSource.
 * @type {string}
 */
const url = "https://kastner.1921682.xyz/api?email=" + email;

/**
 * Represents the EventSource for receiving server-sent events.
 * @type {EventSource}
 */
const evtSource = new EventSource(url);

/**
 * Event handler for the message event received from the EventSource.
 * @param {MessageEvent} event - The message event object.
 */
evtSource.onmessage = (event) => {
  console.log("in sse");
  console.log(event);
  let data = event.data;
  try {
    data = JSON.parse(data);
  } catch(e) {
    console.log("Error encountered", e); 
  }
  let newState = data[email];
  console.log(newState);
  if (newState == false || newState == "false") {
    console.log("bike is locked");
    localStorage.setItem("state", 0);
    displayStatus.textContent = 'Bike is Unlocked';
    postregLockedDiv.style.display = 'none';
  } else if (newState == true || newState == "true") {
    console.log("locked");
    localStorage.setItem("state", 1);
    displayStatus.textContent = 'BIKE LOCKED';
    postregLockedDiv.style.display = 'block';
  }
};
