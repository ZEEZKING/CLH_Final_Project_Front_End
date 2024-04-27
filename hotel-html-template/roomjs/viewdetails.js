
        const url = new URL(window.location.href);
        const searchParams = url.searchParams;

        const id = searchParams.get('id');

        //console.log('ID:', id);
// console.log("dsjhjh",id,urlSearchParams);
function  singleRoom(id) {
    fetch(`https://localhost:7285/api/Room/GetRoom/${id}`)
    .then(data => data.json())
    .then(res => displaySingleRoom(res.data));
    
  }

singleRoom(id);

function displaySingleRoom(data) {
    //console.log(data);
    

    const singleContainer = document.getElementById("roomDetails");
    
   const room =  `
            <div>
            <img src="https://localhost:7285/images/${data.image}" alt="Room Image" class="room-image" id="image">
          </div>
          <p><strong>Room Name:</strong> <span>${data.roomName}</span></p>
          <p><strong>Room Number:</strong> <span>${data.roomNumber}</span></span></p>
          <p><strong>Description:</strong> <span>${data.description}</span></span></p>
          <p><strong>Price:</strong> <span>₦${data.price}</span> per night</p>
          <p><strong>Occupancy:</strong> Maximum occupancy: <span>${data.occupancy}</span> guests</p>
          <p><strong>Availability:</strong> <span> ${data.isAvailable}</span></p>
          </div>
    `;
    singleContainer.innerHTML +=room;
  }
