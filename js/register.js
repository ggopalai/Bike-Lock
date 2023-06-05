const regBtn = document.getElementById('reg-btn');
const displayStatus = document.getElementById('status');
const preregDiv = document.getElementById('prereg');
const postregDiv = document.getElementById('postreg');
const postregLockedDiv = document.getElementById('postreg-locked');
const cls = document.getElementById('cls');

function toggleDiv() {
    let stateValue = localStorage.getItem('state');
    if (stateValue=='1') {
        console.log("state is true");
        displayStatus.textContent = 'BIKE LOCKED';
        postregLockedDiv.style.display = 'block';
    } else {
        console.log("state is false");
        displayStatus.textContent = 'Bike is Unlocked';
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
    localStorage.setItem('state', 0);
    displayStatus.textContent = 'Bike is Unlocked';
    postregLockedDiv.style.display = 'none';
}

toggleDiv();
if (state == '0') {
    console.log("state is false");
    displayStatus.textContent = 'Bike is Unlocked';
    postregLockedDiv.style.display = 'none';
}
else {
    console.log("state is true");
    displayStatus.textContent = 'BIKE LOCKED';
    postregLockedDiv.style.display = 'block';
}

// Choose what to display based on whether email exists in local storage
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

// Event listener for register button
regBtn.addEventListener('click', function() {
    let emailInput = document.getElementById('email-input');
    let email = emailInput.value;
    console.log('Email:', email);
    localStorage.setItem('email', email);
    preregDiv.style.display = 'none';
    postregDiv.style.display = 'block';
    postregLockedDiv.style.display = 'none';
    toggleDiv();
    window.location.reload();
});

cls.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});