// JavaScript for populating category data into the table

let count = 1;
let tableBody = document.getElementById("roleTableBody");

fetch(`https://localhost:7285/api/Role/GetAllRolesAsync`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        data.data.forEach(role => {
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${role.name}</td>
                    <td>${role.description}</td>
                 <td><button  class="btn btn-primary mx-2"  id="${role.id}" onclick="displayUpdateForm(this.id)">Update</button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${role.id}" onclick="DeleteDetails(this.id)">  <i aria-hidden="true"></i> Delete </button> </td> 
                </tr>`;
            tableBody.innerHTML += row;
            count++;
        });
    })
    .catch(error => {
        console.error("Error:", error);
        // Display an error message to the user
        tableBody.innerHTML = `
            <tr>
                <td colspan="2" class="text-danger">An error occurred while fetching data.</td>
            </tr>`;
    });


// function displayUpdateForm(id) {
//     // Select the elements for role details
//     const body = document.querySelector(".body");
//     const data = getDataById(id);
//     body.innerHTML = `  <div class="container">
//         <div class="row justify-content-center">
//             <div class="col-md-6 form-container">

//                 <h3>Role<b>Update<b/></h3>

//                 <form id="updateRoleForm">

//                 <div class="form-group">
//                 <label for="roleName">Role Name:</label>
//                 <input type="text" class="form-control" id="name" name="name" value="${data.name}" placeholder="Name"
//                     required>
//             </div>

//             <div class="form-group">
//                 <label for="roleDescription">Role Description:</label>
//                 <input type="text" class="form-control" id="description" name="description"  value="${data.description}" placeholder="Description"
//                     required>
//             </div>

//                     <div class="text-center">
//                     <a href="http://127.0.0.1:5501/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html" class="btn btn-secondary">Back</a>
//                     <button type="submit" id="update-button" class="btn btn-primary">Update</button>
//                 </div>
                
//                 </form>
//                 <div id="updateResult" class="mt-3"></div>
//             </div>
//         </div>
//     </div>
//         `
//         ;

//     // Add event listener to the form
//     const form = document.getElementById("updateRoleForm");

//     // Remove any previous event listeners to avoid stacking
//     form.removeEventListener("submit", handleFormSubmit);

//     form.addEventListener("submit", function (event) {
//         handleFormSubmit(event, id); // Pass the id as an argument to handleFormSubmit
//     });
//     // Rest of your code
// }







// function displayUpdateForm(data) {
//     console.log('Data:', data);
//     console.log('Data:', data);

//     // Select the elements for role details
//     const body = document.querySelector(".body");
//     body.innerHTML = `
//         <div class="container">
//             <div class="row justify-content-center">
//                 <div class="col-md-6 form-container">
    
//                     <h3>Role Update</h3>
    
//                     <form id="updateRoleForm">
    
//                         <div class="form-group">
//                             <label for="roleName">Role Name:</label>
//                             <input type="text" class="form-control" id="name" name="name" value="${data.name}" placeholder="Name" required>
//                         </div>
    
//                         <div class="form-group">
//                             <label for="roleDescription">Role Description:</label>
//                             <input type="text" class="form-control" id="description" name="description" value="${data.description}" placeholder="Description" required>
//                         </div>
    
//                         <div class="text-center">
//                             <a href="http://127.0.0.1:5501/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html" class="btn btn-secondary">Back</a>
//                             <button type="submit" id="update-button" class="btn btn-primary">Update</button>
//                         </div>
    
//                     </form>
//                     <div id="updateResult" class="mt-3"></div>
//                 </div>
//             </div>
//         </div>
//     `;
//       // Add event listener to the form
//     const form = document.getElementById("updateRoleForm");

//     // Remove any previous event listeners to avoid stacking
//     form.removeEventListener("submit", handleFormSubmit);

//     form.addEventListener("submit", function (event) {
//         handleFormSubmit(event, id); // Pass the id as an argument to handleFormSubmit
//     });
//     // Rest of your code
// }




function displayUpdateForm(id) {
    // Select the elements for role details
    const body = document.querySelector(".body");
    body.innerHTML = `  <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 form-container">

                <h3>Role<b>Update<b/></h3>

                <form id="updateRoleForm">

                <div class="form-group">
                <label for="roleName">Role Name:</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Name"
                    required>
            </div>

            <div class="form-group">
                <label for="roleDescription">Role Description:</label>
                <input type="text" class="form-control" id="description" name="description" placeholder="Description"
                    required>
            </div>

                    <div class="text-center">
                    <a href="http://127.0.0.1:5501/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html" class="btn btn-secondary">Back</a>
                    <button type="submit" id="update-button" class="btn btn-primary">Update</button>
                </div>
                
                </form>
                <div id="updateResult" class="mt-3"></div>
            </div>
        </div>
    </div>
        `
        ;

    // Add event listener to the form
    const form = document.getElementById("updateRoleForm");

    // Remove any previous event listeners to avoid stacking
    form.removeEventListener("submit", handleFormSubmit);

    form.addEventListener("submit", function (event) {
        handleFormSubmit(event, id); // Pass the id as an argument to handleFormSubmit
    });
    // Rest of your code
}


function handleFormSubmit(event, id) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch(`https://localhost:7285/api/Role/Update/${id}`, {
        method: "PUT",
        body: formData,
    })
        .then((response) => {
            // Handle the response here
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {

            displayUpdateForm(data.data);

            // Check if the request was successful
            if (data.status) {
                // Show SweetAlert2 modal
                showSweetAlert(data.message);
            } else {
                // Handle error and show SweetAlert2 modal
                showSweetAlertError(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle the error here
        });
}



// Function to show success SweetAlert2 modal
function showSweetAlert(message) {
    Swal.fire({
        text: message,
        icon: 'success',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'CONTINUE',
        customClass: {
            popup: 'animated fadeIn', // Apply the fadeIn animation
            title: 'custom-title-class', // Create a custom class for title styling
            content: 'custom-content-class', // Create a custom class for content styling
            actions: 'custom-actions-class', // Create a custom class for action button styling
            // Apply custom classes to specific elements
            icon: 'swal-icon', // Custom class for the icon container
            confirmButton: 'swal-button', // Custom class for the confirm button
            confirmButtonText: 'swal-button-text', // Custom class for the confirm button text
        },
        background: 'rgb(1, 6, 28)',
    }).then(() => {
        // window.location.href = './getCustomerById.html';
        location = 'http://127.0.0.1:5501/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html';
       
    });
}

// Function to show error SweetAlert2 modal
function showSweetAlertError(message) {
    Swal.fire({
        text: message,
        icon: 'error',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'animated fadeIn', // Apply the fadeIn animation
            title: 'custom-title-class', // Create a custom class for title styling
            content: 'custom-content-class', // Create a custom class for content styling
            actions: 'custom-actions-class', // Create a custom class for action button styling
            // Apply custom classes to specific elements
            icon: 'swal-icon', // Custom class for the icon container
            confirmButton: 'swal-button', // Custom class for the confirm button
            confirmButtonText: 'swal-button-text', // Custom class for the confirm button text
        },
        background: 'rgb(1, 6, 28)',
    })
        .then(() => {
            location = 'http://127.0.0.1:5501/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html';

        });
}


////////////////////////////////



// Function to delete a role
function DeleteDetails(id) {
    Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this role?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        cancelButtonColor: 'hsl(0, 100%, 60%)',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // User confirmed, proceed with deletion
            // Make a DELETE request to the API
            fetch(`https://localhost:7285/api/Role/Delete/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    // Check if the request was successful
                    if (data.status) {
                        // Show success SweetAlert2 modal
                        showSweetAlert(data.message);
                    } else {
                        // Handle error and show error SweetAlert2 modal
                        showSweetAlertError(data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    // Handle network errors or other errors that may occur during the delete operation.
                });
        }
    });
}

function displayCustomerData(role) {

    const body = document.querySelector(".body");
    body.innerHTML = `
    <div class="container mt-5">
    <h1 class="text-center mb-4">Role Details</h1>
    <div class="row">
       
        <div class="col-md-8">
            <table class="table table-striped">
                <tbody id="roleTableBody">
                    <!-- Role data will be inserted here dynamically -->
                </tbody>
            </table>
        </div>
    </div>
</div>
    `

    const tableBody = document.getElementById("roleTableBody");

    // Clear any previous data in the table body
    tableBody.innerHTML = "";

    // Create rows for the other properties
    const properties = [
        { label: "Role Name", value: role.name},
        { label: "Role Description", value: role.description},
       
    ];

    properties.forEach(property => {
        const row = `
            <tr>
                <td>${property.label}</td>
                <td>${property.value}</td>
            </tr>`;
        tableBody.innerHTML += row;
    });

    // Add a Delete button row
    const deleteButtonRow = `
        <tr>
            <td colspan="2">
                <button class="btn btn-danger" onclick="deleteRole('${role.id}')">Delete</button>
            </td>
        </tr>`;
    tableBody.innerHTML += deleteButtonRow;
}



// Function to show success SweetAlert2 modal
function showSweetAlert(message) {
    Swal.fire({
        text: message,
        icon: 'success',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'animated fadeIn', // Apply the fadeIn animation
            title: 'custom-title-class', // Create a custom class for title styling
            content: 'custom-content-class', // Create a custom class for content styling
            actions: 'custom-actions-class', // Create a custom class for action button styling
            // Apply custom classes to specific elements
            icon: 'swal-icon', // Custom class for the icon container
            confirmButton: 'swal-button', // Custom class for the confirm button
            confirmButtonText: 'swal-button-text', // Custom class for the confirm button text
        },
        background: 'rgb(1, 6, 28)',
    }).then(() => {
        location = 'http://127.0.0.1:5501/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html';

    });
}
    // new DataTable('#Frut');

// Function to show error SweetAlert2 modal
function showSweetAlertError(message) {
    Swal.fire({
        text: message,
        icon: 'error',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'animated fadeIn', // Apply the fadeIn animation
            title: 'custom-title-class', // Create a custom class for title styling
            content: 'custom-content-class', // Create a custom class for content styling
            actions: 'custom-actions-class', // Create a custom class for action button styling
            // Apply custom classes to specific elements
            icon: 'swal-icon', // Custom class for the icon container
            confirmButton: 'swal-button', // Custom class for the confirm button
            confirmButtonText: 'swal-button-text', // Custom class for the confirm button text
        },
        background: 'rgb(1, 6, 28)',
    })
        .then(() => {
            location = 'http://127.0.0.1:5501/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html';

        });

}

// function getDataById(id) {
//     // Fetch data for the specified id
//     return fetch(`https://localhost:7285/api/Role/GetRole/${id}`)
//         .then(response => response.json())
//         .then(data => {
//             // Call displayUpdateForm with the retrieved data
//             displayUpdateForm(data);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// function getDataById(id) {
//     return fetch(`https://localhost:7285/api/Role/GetRole/${id}`)
//         .then(response => response.json())
//         .then(apiResponse => {
//             // Check if the API response was successful
//             if (apiResponse.success) {
//                 displayUpdateForm(apiResponse.data.data); // Access the 'data' property of the response
//             } else {
//                 console.error('API Error:', apiResponse.message);
//             }
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }


