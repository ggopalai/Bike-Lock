/**
 * Represents the register button element.
 * @type {HTMLElement}
 */
const regBtn = document.getElementById('reg-btn');

/**
 * Represents the display status element.
 * @type {HTMLElement}
 */
const displayStatus = document.getElementById('status');

/**
 * Represents the preregistration div element.
 * @type {HTMLElement}
 */
const preregDiv = document.getElementById('prereg');

/**
 * Represents the post-registration div element.
 * @type {HTMLElement}
 */
const postregDiv = document.getElementById('postreg');

/**
 * Represents the post-registration locked div element.
 * @type {HTMLElement}
 */
const postregLockedDiv = document.getElementById('postreg-locked');

/**
 * Represents the clear storage button element.
 * @type {HTMLElement}
 */
const cls = document.getElementById('cls');

/**
 * Toggles the visibility of div elements based on the state value in local storage.
 * If state is 1, display post-registration locked div; otherwise, hide it.
 */
function toggleDiv() {
    /**
     * The state value stored in local storage.
     * @type {string}
     */
    let stateValue = localStorage.getItem('state');

    if (stateValue === '1') {
        console.log("state is true");
        displayStatus.textContent = 'BIKE LOCKED';
        postregLockedDiv.style.display = 'block';
    } else {
        console.log("state is false");
        displayStatus.textContent = 'Bike is Unlocked';
        postregLockedDiv.style.display = 'none';
    }
}

/**
 * The current state value (0 if unlocked, 1 if locked) obtained from local storage.
 * @type {number}
 */
var state;

// Check if the state value exists in local storage
if ('state' in localStorage) {
    state = JSON.parse(localStorage.getItem('state'));
    console.log('State:', state);
} else {
    // Default state is unlocked
    state = 0;
    localStorage.setItem('state', 0);
    displayStatus.textContent = 'Bike is Unlocked';
    postregLockedDiv.style.display = 'none';
}

toggleDiv();

// Display status and post-registration locked div based on the current state
if (state === 0) {
    console.log("state is false");
    displayStatus.textContent = 'Bike is Unlocked';
    postregLockedDiv.style.display = 'none';
} else {
    console.log("state is true");
    displayStatus.textContent = 'BIKE LOCKED';
    postregLockedDiv.style.display = 'block';
}

// Choose what to display based on whether email exists in local storage
if ('email' in localStorage) {
    console.log('Email found in local storage')
    /**
     * The email value stored in local storage.
     * @type {string}
     */
    let email = localStorage.getItem('email');
    console.log('Email:', email);
    preregDiv.style.display = 'none';
    postregDiv.style.display = 'block';
    toggleDiv();
} else {
    // Email doesn't exist in local storage
    console.log('Email not found in local storage');
    preregDiv.style.display = 'block';
    postregDiv.style.display = 'none';
}

/**
 * Event listener callback function for the register button click event.
 * @callback RegisterButtonClickCallback
 */

/**
 * Add an event listener to the register button for the click event.
 * @param {string} type - The event type, in this case, "click".
 * @param {RegisterButtonClickCallback} listener - The event listener callback function to execute when the button is clicked.
 * @param {boolean | AddEventListenerOptions} options - An options object that specifies characteristics about the event listener.
 */
regBtn.addEventListener('click', function() {
    /**
     * The email input element.
     * @type {HTMLInputElement}
     */
    let emailInput = document.getElementById('email-input');

    /**
     * The email value entered by the user.
     * @type {string}
     */
    let email = emailInput.value;
    console.log('Email:', email);
    localStorage.setItem('email', email);
    preregDiv.style.display = 'none';
    postregDiv.style.display = 'block';
    postregLockedDiv.style.display = 'none';
    toggleDiv();
    window.location.reload();
});

/**
 * Event listener callback function for the clear storage button click event.
 * @callback ClearStorageButtonClickCallback
 */

/**
 * Add an event listener to the clear storage button for the click event.
 * @param {string} type - The event type, in this case, "click".
 * @param {ClearStorageButtonClickCallback} listener - The event listener callback function to execute when the button is clicked.
 * @param {boolean | AddEventListenerOptions} options - An options object that specifies characteristics about the event listener.
 */
cls.addEventListener('click', () => {
    // Clear all items in local storage
    localStorage.clear();
    window.location.reload();
});
