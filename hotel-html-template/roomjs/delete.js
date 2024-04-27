 var url = new URL(window.location.href);
 var searchParams = url.searchParams;
 var id = searchParams.get('id');


console.log(id);
const del = document.getElementById("delete-room");


// Swal.fire({
//     title: "Delete Room",
//     text: "Are you sure you want to delete this room?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Yes, delete it",
//     cancelButtonText: "No, keep it",
// })

// function deleteRoom(id) {
//     // console.log("Script is loaded.");

//     // console.log("Update room button clicked");
//     //  console.log("Event:", event);
//     //  console.log("ID:", id);

//     //event.preventDefault();
//     const myform = document.getElementById("room-delete-form"); // Select the form by its ID
//     const sendForm = new FormData(myform); // Pass the form element to FormData
  
//     fetch(`https://localhost:7285/api/Room/Delete/${id}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.sucesss) {
//           //showAlert("Success", "Room deleted successfully", "success");
//           window.alert("Deleted sucessfully")
//         } else {
//           showAlert("Error", "Failed to update room", "error");
//         }
//         location.href =
//         "http://127.0.0.1:5501/hotel-html-template/roomUpt.html";
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }

// function deleteRoom(id) {

//   console.log("e enter oooooo")
//   Swal.fire({
//       title: 'Confirm Deletion',
//       text: 'Are you sure you want to delete this role?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: 'hsl(210, 17%, 93%)',
//       cancelButtonColor: 'hsl(0, 100%, 60%)',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel'
//   }).then((result) => {
//       if (result.isConfirmed) {
//           // User confirmed, proceed with deletion
//           // Make a DELETE request to the API
//           fetch(`https://localhost:7285/api/Room/Delete/${id}`, {
//               method: 'DELETE',
//           })
//               .then(response => {
//                   if (!response.ok) {
//                       throw new Error("Network response was not ok");
//                   }
//                   return response.json();
//               })
//               .then(data => {
//                   // Check if the request was successful
//                   if (data.sucesss) {
//                       // Show success SweetAlert2 modal
//                       showSweetAlert(data.message);
//                   } else {
//                       // Handle error and show error SweetAlert2 modal
//                       showSweetAlertError(data.message);
//                   }
//               })
//               .catch(error => {
//                   console.error("Error:", error);
//                   // Handle network errors or other errors that may occur during the delete operation.
//               });
//       }
//   });
// }


function deleteRoom() {
  Swal.fire({
    title: 'Confirm Deletion',
    text: 'Are you sure you want to delete this room?',
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
      fetch(`https://localhost:7285/api/Room/Delete/${id}`, {
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
          if (data.sucesss) {
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




function  singleRoom(id) {
    fetch(`https://localhost:7285/api/Room/GetRoom/${id}`)
    .then(data => data.json())
    .then(res => displaySingleRoom(res.data));
    // .then((data) => data.json())
    //     .then((res) => {
    //       if (res.data) {
    //         displaySingleRoom(res.data);
    //       } else {
    //         console.error('Data not found in the response:', res);
    //         // You can handle the error here, e.g., display a message to the user.
    //       }
    //     })
    
    
    }
    
    singleRoom(id);

function displaySingleRoom(data) {
    console.log(data);
    
    
    const singleContainer = document.getElementById("room-delete-form");
    
    
    const room =  `
                <form id="room-delete-form" method="POST">
                <div class="form-group">
                <label for="RoomName">RoomName</label>
                <input type="text" id="roomName" name="roomName" value="${data.roomName}" required readonly>
                </div>
                <div class="form-group">
                <label for="RoomNumber">RoomNumber</label>
                <input type="number" id="RoomNumber" name="RoomNumber" value="${data.roomNumber}" required readonly>
                </div>
                <div class="form-group">
                <label for="Description">Description</label>
                <input type="text" id="description" name="description" value="${data.description}" required>
                </div>
                <div class="form-group">
                <label for="Occupancy">Occupancy</label>
                <input type="number" id="occupancy" name="occupancy" value="${data.occupancy}" required readonly>
                </div>
                <div class="form-group">
                <label for="Price">Price</label>
                <input type="number" id="Price" name="Price" value="${data.price}" required readonly>
                </div>
                <div class="form-group">
                    <label for="ImagePics">RoomPics</label>
                    <span id="image">${data.image}</span>
                </div>
                </form>
                <button class="delete-button" type="button" onclick="deleteRoom()">Delete Room</button>
                <button type="button">
                 <a href="http://127.0.0.1:5501/hotel-html-template/roomUpt.html">Back</a>
                </button>
               
                </form>
    `;
    
    singleContainer.innerHTML +=room;
    
    }


    //<div class="form-group">  
    // <label for="ImagePics">RoomPics</label> 
    // <input type="file" id="image" name="ImagePics" value="${data.image}" accept="image/* required readonly">
    // </div>


    // <div class="form-group">
    //                 <label for="ImagePics">RoomPics</label>
    //                 <input type="text" id="image" name="ImagePics" value="${data.image}"required readonly>
    //             </div>

  //   <button type="button" id="delete-room" onclick="deleteRoom(${data.id})">Delete Room</button>
  //   <button type="button">
  //   <a href="http://127.0.0.1:5501/hotel-html-template/roomUpt.html">Back</a>
  // </button>