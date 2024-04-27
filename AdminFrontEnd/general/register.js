let error = document.querySelector("#error-message");
const confirmPasswordInput = document.getElementById("confirm-password");

let checkingForPassword = (confirmpassword) => {
  if (confirmpassword != confirmPasswordInput.value) {
    error.InnerText = "Password not match";
  } else {
    error.InnerText = "";
  }
};
document
  .getElementById("yourButtonId")
  .addEventListener("click", function () {
    // Disable the button
    this.disabled = true;
    console.log("e enter ooooo");

    // Optionally, you can change the text to provide feedback
    //this.innerText = "Processing...";

    const form = document.getElementById("sign-up-form");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Collect form data
      const formData = new FormData(form);

      // Make an API request to send the form data
      fetch("https://localhost:7285/api/Customer/RegisterCustomer", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the API response (e.g., show a success message)
          console.log(data);
          if(data.sucesss == true){
            localStorage.setItem("registrationid", data.id);
          // Update the button text after successful registration
          document.getElementById("yourButtonId").innerText =
            "Registered!";
          // Redirect or show a success message
          location.href =
            "http://127.0.0.1:5501/AdminFrontEnd/verification.html";
          window.alert("Successfully registered");
          }
          
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          // Reset the button text in case of an error
          document.getElementById("yourButtonId").innerText = "Register";
          // Re-enable the button
          this.disabled = false;
        });
    });
  });
