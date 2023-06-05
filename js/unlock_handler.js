const lockButton = document.getElementById("lock");
const passcodeInput = document.getElementById("passcode");

lockButton.addEventListener("click", function (event) {
  event.preventDefault();
  const passcode_entered = passcodeInput.value;
  const passcode_stored = localStorage.getItem("passcode");

  if (parseInt(passcode_entered) === parseInt(passcode_stored)) {
    location.href = "./index.html";
    localStorage.removeItem("passcode");
    localStorage.removeItem("email");
  } else {
    alert("ERROR: Wrong Passcode");
  }
});
