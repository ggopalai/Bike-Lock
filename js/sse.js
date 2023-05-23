let email = localStorage.getItem('email');
const url = "http://localhost:3000/api?email=" + email;
const evtSource = new EventSource(
  url
);

evtSource.onmessage = (event) => {
  let newState = JSON.parse(event.data)[email];
  if (newState=="false") {
    localStorage.setItem("state", 0);
  }
  else if (newState=="true") {
    localStorage.setItem("state", 1);
  }
  toggleDiv();
  window.location.href = window.location.href;
};
