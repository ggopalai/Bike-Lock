let email = localStorage.getItem('email');
const postregLockedDiv = document.getElementById('postreg-locked');
const displayStatus = document.getElementById('status');
const url = "https://kastner.1921682.xyz/api?email=" + email;
//"http://ec2-50-18-86-135.us-west-1.compute.amazonaws.com:3000/api?email=" + email; 
//"http://localhost:3000/api?email="+email;
console.log(url);

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
  if (newState == false) {
    console.log("bike is locked");
    localStorage.setItem("state", 0);
    displayStatus.textContent = 'Bike is Unlocked';
    postregLockedDiv.style.display = 'none';
  }
  else if (newState == true) {
    console.log("locked");
    localStorage.setItem("state", 1);
    displayStatus.textContent = 'BIKE LOCKED';
    postregLockedDiv.style.display = 'block';
  }
};
