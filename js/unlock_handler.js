const lockButton = document.getElementById("lock");
const passcodeInput = document.getElementById("passcode");

lockButton.addEventListener("input", () => {
  passcodeInput.setCustomValidity("");
  passcodeInput.checkValidity();
});

lockButton.addEventListener("invalid", () => {
  const passcode_entered = passcodeInput.value;

  const passcode_stored = localStorage.getItem("passcode");
  if (passcodeInput.value === "") {
    passcodeInput.setCustomValidity("Enter your passcode!");
  } else if (parseInt(passcode_entered) != parseInt(passcode_stored)) {
    passcodeInput.setCustomValidity("Passcode Mismatch");
  }
});

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

  // Clear the passcode input field
  //   passcodeInput.value = "";

  //Change pages
});
