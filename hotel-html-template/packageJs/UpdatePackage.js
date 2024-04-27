async function fetchData() {
    try {
        await fetch('https://localhost:7285/api/Package/GetAll')
      .then(data => data.json())
      .then(res => renderRoom(res))
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  fetchData();
  async function renderRoom(rooms) {
  
    const container = document.querySelector('.row');
  
    let allItems = '';
    console.log(rooms.data);
   rooms.data.forEach(room => {
     const items =  `
     <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
     <div class="room-item shadow rounded overflow-hidden">
         <div class="position-relative">
             <img class="img-fluid room-image" src="https://localhost:7285/images/${room.images}" alt="room_Image">
             <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">₦${room.price}/BookingDays</small>
         </div>
         <div class="p-4 mt-2">
             <div class="d-flex justify-content-between mb-3">
                 <h5 class="mb-0">${room.name}</h5>
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
                 <small class="me-3 pe-3">Types : ${room.types}</small>
             </div>
              <div class="d-flex justify-content-between">
               <a class="btn btn-sm btn-primary rounded py-2 px-4 Update-Room<"onclick="singleRoom(${room.id});location.href = 'http://127.0.0.1:5501/hotel-html-template/UpdatePackagePage.html?id=${room.id}'">Update</a>
               <a class="btn btn-sm btn-primary rounded py-2 px-4 Delete-Room" onclick="singleRoom(${room.id});" href="http://127.0.0.1:5501/hotel-html-template/deletePackage.html?id=${room.id}">Delete</a>
              </div>
         </div>
     </div>
 </div>
      `;
      allItems += items;
    });
  container.innerHTML = allItems
  }

