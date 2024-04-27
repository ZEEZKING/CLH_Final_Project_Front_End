
// const url = new URL(window.location.href);
// const searchParams = url.searchParams;

// const id = searchParams.get("id");
// console.log(id);
// const upt = document.getElementById("update-form");


const id = localStorage.getItem("Id");

function showAlert(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: 1800000,
    confirmButtonText: "OK",
  });
}


async function updateProfile() {
  console.log("Before fetch");

  const myform = document.getElementById("update-form");
  const sendForm = new FormData(myform);

  try {
    const response = await fetch(`https://localhost:7285/api/Manager/UpdateManager/${id}`, {
      method: "PUT",
      body: sendForm,
    });

    console.log("After fetch");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Response data:", data);

    if (data.sucesss) {
      //showAlert("Success", "Profile updated successfully", "success");
      window.alert('UPDATED SUCESSFULLY')
      setTimeout(() => {
        console.log("Redirecting...");
        window.location.href = "viewProfile.html";
      }, 1000);
    } else {
      showAlert("Error", "Failed to update profile", "error");
    }

    // Redirect to the view profile page after a short delay
    // Delay in milliseconds
  } catch (error) {
    console.error("Error:", error);
  }
}




// console.log("ID:", id);

fetch(`https://localhost:7285/api/Manager/GetManager/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((managerData) => {
          console.log("API Response:", managerData);
          if (managerData.sucesss) {
           renderManagerProfile(managerData.data);
            //window.alert("sucessfully found");
          } else {
            console.error(
              `Error fetching manager data: ${managerData.message}`
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching manager data:", error);
        });



function renderManagerProfile(data) {
  console.log(data);

  const singleContainer = document.getElementById("update-form");

  const info = `
            <form id="update-form" method="POST">
            <div class="user-details">
            <div class="input-box">
                <span class="details">Full Name</span>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value =${data.name}
                    required
                />
            </div>
            <div class="input-box">
                <span class="details">Username</span>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value =${data.userName}
                    required
                />
            </div>
            <div class="input-box">
                <span class="details">Email</span>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value =${data.email}
                    required
                />
            </div>
            <div class="input-box">
                <span class="details">Phone Number</span>
                <input
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    placeholder="Enter your number"
                    value =${data.phoneNumber}
                    required
                />
            </div>
            <div class="input-box">
                <span class="details">Enter Your Address</span>
                <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your Address"
                    required
                    value =${data.address}
                />
            </div>
            <div class="input-box">
                <label class="details">Profile Picture</label>
                <input type="file" id="profileimage" name="profileimage" value =${data.profileimage}required />
            </div>
            <div class="button">
                <input type="button" value="Update" onclick="updateProfile()" />
            </div>
        </div>
        
`;

  singleContainer.innerHTML += info;
}






