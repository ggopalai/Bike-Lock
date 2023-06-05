let email = localStorage.getItem('email');
const postregLockedDiv = document.getElementById('postreg-locked');
const displayStatus = document.getElementById('status');
const url = "https://kastner.1921682.xyz/api?email=" + email;

const evtSource = new EventSource(
  url
);

evtSource.onmessage = (event) => {
  console.log("in sse");
  console.log(event);
  let data = event.data;
  try{
    data = JSON.parse(data);
  }
  catch(e) {
    console.log("Error encountered",e); 
  }
  let newState = data[email];
  console.log(newState);
  if (newState == false || newState=="false") {
    console.log("bike is locked");
    localStorage.setItem("state", 0);
    displayStatus.textContent = 'Bike is Unlocked';
    postregLockedDiv.style.display = 'none';
  }
  else if (newState == true || newState=="true") {
    console.log("locked");
    localStorage.setItem("state", 1);
    displayStatus.textContent = 'BIKE LOCKED';
    postregLockedDiv.style.display = 'block';
  }
};
