var url = new URL(window.location.href);
var searchParams = url.searchParams;
var id = searchParams.get("id");

console.log(id);
const del = document.getElementById("delete-room");

Swal.fire({
  title: "Delete Facilities",
  text: "Are you sure you want to delete this Facilities?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it",
  cancelButtonText: "No, keep it",
});

function deleteRoom(id) {
  console.log("Script is loaded.");

  console.log("Update room button clicked");
  console.log("Event:", event);
  console.log("ID:", id);

  //event.preventDefault();
  const myform = document.getElementById("room-delete-form"); // Select the form by its ID
  const sendForm = new FormData(myform); // Pass the form element to FormData

  fetch(`https://localhost:7285/api/Package/Delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.sucesss) {
        showAlert("Success", "facilities deleted successfully", "success");
      } else {
        showAlert("Error", "Failed to delete facilities", "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function singleRoom(id) {
  fetch(`https://localhost:7285/api/Package/GetById/${id}`)
    .then((data) => data.json())
    .then((res) => displaySingleRoom(res.data));
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

  const room = `
   <form id="room-delete-form" method="POST">
   <div class="form-group">
   <label for="Name">Name</label>
   <input type="text" id="name" name="name" value="${data.name}" required>
   </div>
   <div class="form-group">
   <label for="Description">Description</label>
   <input type="text" id="description" name="description" value="${data.description}" required>
   </div>
   <div class="form-group">
   <label for="Types">Types</label>
   <input type="text" id="types" name="types" value="${data.types}" required>
   </div>
   <div class="form-group">
   <label for="Price">Price</label>
   <input type="number" id="Price" name="Price" value="${data.price}" required>
   </div>
   <div class="form-group">
        <label for="PackageImage">RoomPics</label>
        <span id="PackageImage">${data.images}</span>
    </div>
   </form>
   <button type="button" id="delete-room" onclick="deleteRoom(${data.id})">Delete Facilities</button>
    <button type="button">
    <a href="http://127.0.0.1:5501/hotel-html-template/UpdatePackage.html">Back</a>
  </button>
   </form>
   `;

  singleContainer.innerHTML += room;
}

//<div class="form-group">
// <label for="ImagePics">RoomPics</label>
// <input type="file" id="image" name="ImagePics" value="${data.image}" accept="image/* required readonly">
// </div>

// <div class="form-group">
//                 <label for="ImagePics">RoomPics</label>
//                 <input type="text" id="image" name="ImagePics" value="${data.image}"required readonly>
//             </div>
