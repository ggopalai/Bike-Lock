let email = localStorage.getItem('email');
const postregLockedDiv = document.getElementById('postreg-locked');
const displayStatus = document.getElementById('status');
const url = "http://localhost:3000/api?email=" + email;
const evtSource = new EventSource(
  url
);

evtSource.onmessage = (event) => {
  let newState = JSON.parse(event.data)[email];
  if (newState=="false") {
    localStorage.setItem("state", 0);
    displayStatus.textContent = 'The device is unlocked.';
    postregLockedDiv.style.display = 'none';
  }
  else if (newState=="true") {
    localStorage.setItem("state", 1);
    displayStatus.textContent = 'The device is locked.';
    postregLockedDiv.style.display = 'block';
  }
};
