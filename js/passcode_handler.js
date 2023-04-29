const lockButton = document.getElementById("lock");
const passcodeInput = document.getElementById("passcode");
const emailInput = document.getElementById("email");

lockButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Get the passcode entered by the user
  const passcode = passcodeInput.value;
  const email = emailInput.value;

  // Store the passcode in local storage
  localStorage.setItem("passcode", passcode);
  localStorage.setItem("email", email);

  // Clear the passcode input field
  //   passcodeInput.value = "";

  //Change pages
  location.href = "./locked.html";
});
