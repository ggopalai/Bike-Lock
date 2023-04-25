const lockButton = document.getElementById("lock");
const passcodeInput = document.getElementById("passcode");

lockButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Get the passcode entered by the user
  const passcode = passcodeInput.value;

  // Store the passcode in local storage
  localStorage.setItem("passcode", passcode);

  // Clear the passcode input field
  passcodeInput.value = "";
});
