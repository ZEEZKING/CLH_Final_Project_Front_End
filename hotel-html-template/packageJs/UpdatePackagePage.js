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
  const myform = document.getElementById("package-update-form"); // Select the form by its ID
  const sendForm = new FormData(myform); // Pass the form element to FormData

  fetch(`https://localhost:7285/api/Package/Update/${id}`, {
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
      "http://127.0.0.1:5501/hotel-html-template/Updatepackage.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


console.log("ID:", id);

function singleRoom(id) {
  fetch(`https://localhost:7285/api/Package/GetById/${id}`)
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

  const singleContainer = document.getElementById("package-update-form");

  const room = `
        <form id="package-update-form" method="POST" enctype="multipart/form-data">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value="${data.name}" required>
    </div>
    <div class="form-group">
        <label for="description">Description</label>
        <input type="text" id="description" name="description" value="${data.description}" required>
    </div>
    <div class="form-group">
        <label for="types">Types</label>
        <input type="text" id="types" name="types" value="${data.types}" required>
    </div>
    <div class="form-group">
        <label for="Price">Price</label>
        <input type="number" id="Price" name="Price" value="${data.price}" required>
    </div>
    <div class="form-group"> 
        <label for="PackageImage">FacilitiesPics</label> 
        <input type="file" id="PackageImage" name="PackageImage" value="${data.images}" accept="image/*">
    </div>
    <button type="button" id="update-room" onclick="updateRoom(${data.id})">Update</button>
    <button type="button">
        <a href="http://127.0.0.1:5501/hotel-html-template/UpdatePackage.html">Back</a>
    </button>
</form>
    
`;

  singleContainer.innerHTML += room;
}

{/* <form id="package-update-form" method="POST">
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
                <label for="images">FacilitiesPics</label> 
                <input type="file" id="images" name="images" value="${data.image}" accept="image/*">
            </div> 
            </form>
            <button type="button" id="update-room" onclick="updateRoom(${data.id})">Update</button>
             <button type="button">
             <a href="http://127.0.0.1:5501/hotel-html-template/UpdatePackage.html">Back</a>
           </button>
            </form> */}