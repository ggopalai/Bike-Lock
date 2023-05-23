const regBtn = document.getElementById('reg-btn');
const displayStatus = document.getElementById('status');
const preregDiv = document.getElementById('prereg');
const postregDiv = document.getElementById('postreg');
const postregLockedDiv = document.getElementById('postreg-locked');
const cls = document.getElementById('cls');

function toggleDiv() {
    let stateValue = localStorage.getItem('state');
    if (stateValue) {
        displayStatus.textContent = 'The device is locked.';
        postregLockedDiv.style.display = 'block';
    } else {
        displayStatus.textContent = 'The device is unlocked.';
        postregLockedDiv.style.display = 'none';
    }
}

var state;
// State is 0 if unlocked, 1 if locked
if ('state' in localStorage) {
    state = JSON.parse(localStorage.getItem('state'));
    console.log('State:', state);
} else {
    state = 0;
    localStorage.setItem('state', state);
}

// if (state == 0) {
//     displayStatus.textContent = 'The device is unlocked.';
//     postregLockedDiv.style.display = 'none';
// }
// else {
//     displayStatus.textContent = 'The device is locked.';
//     postregLockedDiv.style.display = 'block';
// }

// chose what to display based on whether email exists in local storage
if ('email' in localStorage) {
    console.log('Email found in local storage')
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

// event listener for register button
regBtn.addEventListener('click', function() {
    let emailInput = document.getElementById('email-input');
    let email = emailInput.value;
    console.log('Email:', email);
    localStorage.setItem('email', email);
    preregDiv.style.display = 'none';
    postregDiv.style.display = 'block';
    toggleDiv();
});

// utility, remove after testing
cls.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});