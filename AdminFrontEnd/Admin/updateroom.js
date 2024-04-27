const myform = document.querySelector('#room-update-form');
const upt = document.getElementById("update-room");
const del = document.getElementById("delete-room");
//let id = localStorage.getItem("RoomId");

// const url = new URL(window.location.href);
// const searchParams = url.searchParams;

// const ide = searchParams.get('id');
// console.log(ide);


const url = new URL(window.location.href);
const searchParams = url.searchParams;

console.log("Full URL: " + window.location.href);  // Debugging statement

const ide = searchParams.get('id');
console.log("ID from URL: " + ide);  // Debugging statement

if (!ide) {
    console.error("ID is not present in the URL");
    // Handle the case where 'id' is missing from the URL, such as showing an error message.
}



function showAlert(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: "OK"
    });
}

function updateRoom() {
    event.preventDefault();
    const sendForm = new FormData(myform);
    fetch(`https://localhost:7285/api/Room/UpdateRoom/${ide}`, {
        method: "PUT",
        body: sendForm,
    })
    .then((res) => res.json())
    .then(data => {
        if (data.sucesss) {
            showAlert("Success", "Room updated successfully", "success");
        } else {
            showAlert("Error", "Failed to update room", "error");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteRoom() {
    Swal.fire({
        title: "Delete Room",
        text: "Are you sure you want to delete this room?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "No, keep it",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://localhost:7285/api/Room/Delete/${ide}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if (data.sucesss) {
                    showAlert("Success", "Room deleted successfully", "success");
                } else {
                    showAlert("Error", "Failed to delete room", "error");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
}

//upt.addEventListener('click', updateRoom);
//del.addEventListener('click', deleteRoom);



















































// const myform = document.querySelector('#room-update-form');
// const upt = document.getElementById("update-room");
// const del = document.getElementById("delete-room");
// let id = localStorage.getItem("RoomId")
// function showAlert(title, text, icon) {
//     Swal.fire({
//         title: title,
//         text: text,
//         icon: icon,
//         confirmButtonText: "OK"
//     });
// }
// upt.addEventListener('click',(event) => {
//     event.preventDefault();
//     console.log(myform);
//     let sendForm = new FormData(myform);
//     fetch(`https://localhost:7285/api/Room/UpdateRoom/${id}`,
//     {
//         method: "PUT",
//         body: sendForm,
//     })
//     .then((res) =>{
//         console.log(res);
//         return res.json();
//     })

//     .then(data => {
//         // Check the response data for success or error
//         console.log(data);
//         if (data.sucesss) {
//             showAlert("Success", "Room updated successfully", "success");
//         } else {
//             showAlert("Error", "Failed to update room", "error");
//         }
//     })
//     .catch((res) =>{
//         window.alert("UnAuthorized")
//     })
//        //localStorage.clear();
// })
// // Event listener for the "Delete Room" button
// del.addEventListener("click", function () {
//     // Show a confirmation dialog
//     Swal.fire({
//         title: "Delete Room",
//         text: "Are you sure you want to delete this room?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it",
//         cancelButtonText: "No, keep it",
//     }).then((result) => {
//         if (result.isConfirmed) {
//             // Replace 'your_delete_api_endpoint' with the actual URL to delete a room
//             fetch(`https://localhost:7285/api/Room/Delete/${id}`, {
//                 method: 'DELETE',
//             })
//             .then(response => response.json())
//             .then(data => {
//                 // Check the response data for success or error
//                 if (data.sucesss) {
//                     showAlert("Success", "Room deleted successfully", "success");
//                 } else {
//                     showAlert("Error", "Failed to delete room", "error");
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//         }
//     });
// });