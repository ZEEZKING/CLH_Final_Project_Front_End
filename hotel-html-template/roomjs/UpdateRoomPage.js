// let rname = document.querySelector('#roomName');
// let rnumber = document.querySelector('#RoomNumber');
// let occupy = document.querySelector('#occupancy');
// var price = document.querySelector('#Price');
// var image = document.querySelector('#image');

// let viewProfile = () => {
//     fetch(`https://localhost:7285/api/Room/GetRoom/${id}`)
//         .then(response => response.json())
//         .then(function(response) {
//             // image.innerHTML = "";
//             rname.value = response.data.roomName;
//             console.log(rname.value);
//             rnumber.value = response.data.roomNumber;
//             occupy.value = response.data.occupancy;
//             price.value = response.data.price;
//             image.value = response.data.image;
//             // let imageRoom = IMAAGETEMPLATE
//             // .replace('{{RoomIMAGE}}',response.data.roomimage)
//             // .replace('{{RoomNAME}}',response.data.roomname)
//             // image.innerHTML = image;
//         })
//         .catch(error => {
//             // Handle any errors that occurred during the fetch or JSON parsing.
//             console.error('Error:', error);
//         });
// }

// viewProfile();

const url = new URL(window.location.href);
const searchParams = url.searchParams;

const id = searchParams.get("id");
console.log(id);
const upt = document.getElementById("update-room");

function showAlert(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: 1800000,
    confirmButtonText: "OK",
  });
}

function updateRoom(id) {
  console.log("Scrip is loaded.");

  console.log("Update room button clicked");
  console.log("Event:", event);
  console.log("ID:", id);

  //event.preventDefault();
  const myform = document.getElementById("room-update-form"); // Select the form by its ID
  const sendForm = new FormData(myform); // Pass the form element to FormData

  fetch(`https://localhost:7285/api/Room/UpdateRoom/${id}`, {
    method: "PUT",
    body: sendForm,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.sucesss) {
        showAlert("Success", "Room updated successfully", "success");
        
      } else {
        showAlert("Error", "Failed to update room", "error");
      }
      location.href =
      "http://127.0.0.1:5501/hotel-html-template/roomUpt.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

console.log("ID:", id);

function singleRoom(id) {
  fetch(`https://localhost:7285/api/Room/GetRoom/${id}`)
    // .then(data => data.json())
    // .then(res => displaySingleRoom(res.data));
    .then((data) => data.json())
    .then((res) => {
      if (res.data) {
        displaySingleRoom(res.data);
      } else {
        console.error("Data not found in the response:", res);
        // You can handle the error here, e.g., display a message to the user.
      }
    });
}

singleRoom(id);

function displaySingleRoom(data) {
  console.log(data);

  const singleContainer = document.getElementById("room-update-form");

  const room = `
            <form id="room-update-form" method="POST">
            <div class="form-group">
            <label for="RoomName">RoomName</label>
            <input type="text" id="roomName" name="roomName" value="${data.roomName}" required>
            </div>
            <div class="form-group">
            <label for="RoomNumber">RoomNumber</label>
            <input type="number" id="RoomNumber" name="RoomNumber" value="${data.roomNumber}" required>
            </div>
            <div class="form-group">
            <label for="Description">Description</label>
            <input type="text" id="description" name="description" value="${data.description}" required>
            </div>
            <div class="form-group">
            <label for="Occupancy">Occupancy</label>
            <input type="number" id="occupancy" name="occupancy" value="${data.occupancy}" required>
            </div>
            <div class="form-group">
            <label for="Price">Price</label>
            <input type="number" id="Price" name="Price" value="${data.price}" required>
            </div>
            <div class="form-group"> 
                <label for="ImagePics">RoomPics</label> 
                <input type="file" id="image" name="ImagePics" value="${data.image}" accept="image/*">
            </div> 
            </form>
            <button type="button" id="update-room" onclick="updateRoom(${data.id})">Update Room</button>
             <button type="button">
             <a href="http://127.0.0.1:5501/hotel-html-template/roomUpt.html">Back</a>
           </button>
            </form>
`;

  singleContainer.innerHTML += room;
}

//  <div class="form-group">
// <label for="ImagePics">RoomPics</label>
// <input type="file" id="image" name="ImagePics" accept="image/*">
// </div>

// <!-- Set the value attribute using JavaScript to display the URL -->
// <script>
// const imageInput = document.getElementById("image");
// imageInput.value = "${data.image}";
// </script>
