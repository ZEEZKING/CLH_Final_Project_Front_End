function resetCartCount() {
    // Clear the cart items from localStorage
    localStorage.removeItem('cartItems');

    // Update the UI with the new count (in this case, it will be zero)
    updateCartCount();
}


// Add this function to your existing code
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCountElement = document.getElementById('cartCount');

    // Update the UI with the count of items in the cart
    cartCountElement.textContent = cartItems.length;
}

async function fetchData() {
    await fetch("https://localhost:7285/api/Room/GetAllRooms")
        .then((data) => data.json())
        .then((res) => renderRoom(res));
}
fetchData();

async function renderRoom(rooms) {
    const container = document.querySelector(".row");

    let allItems = "";
    rooms.data.forEach((room) => {
        const items = `
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
                <!-- Room details... -->
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
                        <button class="btn btn-sm btn-primary rounded py-2 px-4 view-details" onclick="singleRoom(${room.id}); location.href = 'http://127.0.0.1:5501/hotel-html-template/viewdetails.html?id=${room.id}'">View Detail</button>
                        <button class="btn btn-sm btn-primary rounded py-2 px-4 book-now" onclick="validateAndBook(${room.id}, ${room.quantity})">Book Now</button>
                    </div>
                </div>
            </div>
            </div>
        `;

        allItems += items;
    });
    container.innerHTML = allItems;

    // Display the initial cart count
    updateCartCount();
}

function validateAndBook(roomId, maxQuantity) {
    const checkin = new Date().toISOString(); // Use current time as default
    const checkout = new Date().toISOString(); // Use current time as default
    const duration = 1; // Default duration
    const quantity = 1; // Default quantity

    // Additional validation: Check if the quantity exceeds the available quantity
    if (quantity > maxQuantity) {
        alert('Cannot book more than available quantity.');
        return;
    }

    // Create a booking object
    const booking = {
        roomId,
        checkin,
        checkout,
        duration,
        quantity
    };

    // Add the booking object to the cart (you can customize this based on your needs)
    addToCartLocalStorage(booking);

    // Optionally, you can navigate to the booking page
    window.location.href = `http://127.0.0.1:5501/AdminFrontEnd/booking.html?id=${roomId}`;
}


function addToCartLocalStorage(booking) {
    // Retrieve existing cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the new booking to the cart
    cartItems.push(booking);

    // Save the updated cart back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
