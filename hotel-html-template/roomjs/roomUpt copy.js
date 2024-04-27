let rooms;

async function fetchData() {
  try {
    const response = await fetch('https://localhost:7285/api/Room/GetAllRooms');
    const data = await response.json();
    rooms = data; // Assign data to the global rooms variable
    renderRoom(rooms);
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

fetchData();

function showAllRooms() {
  renderRoom(rooms);
}



  async function renderRoom(rooms) {
    console.log('Rendering rooms:', rooms);
    const container = document.querySelector('.row');
    const filterButtonsContainer = document.querySelector('.filter-buttons');
  
    const roomTypes = [...new Set(rooms.data.map(room => room.types))];
  
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.className = 'btn btn-primary';
    allButton.addEventListener('click', () => showAllRooms());
  
    const filterButtons = [allButton, ...roomTypes.map(roomType => {
      const button = document.createElement('button');
      button.textContent = roomType;
      button.className = 'btn btn-primary';
      button.addEventListener('click', () => filterRooms(roomType));
      return button;
    })];
  
     filterButtonsContainer.innerHTML = ''; // Clear previous buttons
  filterButtons.forEach(button => filterButtonsContainer.appendChild(button));

  let allItems = '';
  rooms.data.forEach(room => {
    const items = `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
        <!-- Your existing room HTML code -->
        <div class="room-item shadow rounded overflow-hidden">
        <div class="position-relative">
            <img class="img-fluid" src="https://localhost:7285/images/${room.image}" alt="room_Image">
            <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">₦${room.price}/Night</small>
        </div>
        <div class="p-4 mt-2">
            <div class="d-flex justify-content-between mb-3">
                <h5 class="mb-0">${room.roomName}</h5>
                <div class="ps-2">
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                </div>
            </div>
            <p class="text-body mb-3">Description : ${room.description}</p>
            <div class="d-flex mb-3">
                <small class="border-end me-3 pe-3">Occupancy : ${room.occupancy} </small>
                <small class="me-3 pe-3">Room NO : ${room.roomNumber}</small>
            </div>  
            <div class="d-flex mb-3">
                <small class="me-3 pe-3">Availablity : ${room.isAvailable}</small>
            </div>
            <div class="d-flex justify-content-between">
              <a class="btn btn-sm btn-primary rounded py-2 px-4 Update-Room<"onclick="singleRoom(${room.id});location.href = 'http://127.0.0.1:5501/hotel-html-template/updateRoom.html?id=${room.id}'">Update-Room</a>
              <a class="btn btn-sm btn-primary rounded py-2 px-4 Delete-Room" onclick="singleRoom(${room.id});" href="http://127.0.0.1:5501/hotel-html-template/deleteRoom.html?id=${room.id}">Delete-Room</a>

            </div>
        </div>
      </div>
      </div>
    `;
    allItems += items;
  });

  container.innerHTML = allItems;
}


function filterRooms(roomType) {
  console.log('Filtering rooms for type:', roomType);

  if (!roomType) {
    console.error('Room type is undefined or null.');
    return;
  }

  const filteredRooms = rooms.data.filter(room => room.types === roomType);
  console.log('Filtered rooms:', filteredRooms);

  // Check if the filtered rooms are not empty
  if (filteredRooms.length === 0) {
    console.warn('No rooms found for the selected type:', roomType);
  }

  // Render the filtered rooms
  renderRoom({ data: filteredRooms });
}











// // async function fetchData() {
// //   try {
// //       await fetch('https://localhost:7285/api/Room/GetAllRooms')
// //     .then(data => data.json())
// //     .then(res => renderRoom(res))
    
    
// //   } catch (error) {
// //     console.error('Error fetching data:', error);
// //     return [];
// //   }
// // }
// fetchData();
// async function renderRoom(rooms) {

//   const container = document.querySelector('.row');
//   const filterButtonsContainer = document.querySelector('.filter-buttons');

//   // Extract unique room types from the data
//   const roomTypes = [...new Set(rooms.data.map(room => room.Types))];

//   // Create filter buttons dynamically
//   const filterButtons = roomTypes.map(roomType => {
//     return `<button onclick="filterRooms('${roomType}')">${roomType}</button>`;
//   });

//   // Display filter buttons
//   filterButtonsContainer.innerHTML = filterButtons.join('');

//   let allItems = '';
//   console.log(rooms.data);
//  rooms.data.forEach(room => {
//    const items =  `
//       <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
//               <div class="room-item shadow rounded overflow-hidden">
//                           <div class="position-relative">
//                               <img class="img-fluid" src="https://localhost:7285/images/${room.image}" alt="room_Image">
//                               <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">₦${room.price}/Night</small>
//                           </div>
//                           <div class="p-4 mt-2">
//                               <div class="d-flex justify-content-between mb-3">
//                                   <h5 class="mb-0">${room.roomName}</h5>
//                                   <div class="ps-2">
//                                       <small class="fa fa-star text-primary"></small>
//                                       <small class="fa fa-star text-primary"></small>
//                                       <small class="fa fa-star text-primary"></small>
//                                       <small class="fa fa-star text-primary"></small>
//                                       <small class="fa fa-star text-primary"></small>
//                                   </div>
//                               </div>
//                               <p class="text-body mb-3">Description : ${room.description}</p>
//                               <div class="d-flex mb-3">
//                                   <small class="border-end me-3 pe-3">Occupancy : ${room.occupancy} </small>
//                                   <small class="me-3 pe-3">Room NO : ${room.roomNumber}</small>
//                               </div>  
//                               <div class="d-flex mb-3">
//                                   <small class="me-3 pe-3">Availablity : ${room.isAvailable}</small>
//                               </div>
//                               <div class="d-flex justify-content-between">
//                                 <a class="btn btn-sm btn-primary rounded py-2 px-4 Update-Room<"onclick="singleRoom(${room.id});location.href = 'http://127.0.0.1:5501/hotel-html-template/updateRoom.html?id=${room.id}'">Update-Room</a>
//                                 <a class="btn btn-sm btn-primary rounded py-2 px-4 Delete-Room" onclick="singleRoom(${room.id});" href="http://127.0.0.1:5501/hotel-html-template/deleteRoom.html?id=${room.id}">Delete-Room</a>

//                               </div>
//                           </div>
//               </div>
//       </div>
//     `;
//     allItems += items;
//   });
// container.innerHTML = allItems



// }
// // <a class="btn btn-sm btn-dark rounded py-2 px-4" href="">Book Now</a>

// function filterRooms(roomType) {
//   const filteredRooms = rooms.data.filter(room => room.Types === roomType);
//   renderRoom({ data: filteredRooms });
// }








