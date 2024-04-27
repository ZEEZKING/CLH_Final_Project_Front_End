//let room = document.querySelector('#booking-form');

// const url = new URL(window.location.href);
// const searchParams = url.searchParams;

// const id = searchParams.get("id");
// console.log(id);

let customId =  localStorage.getItem("Id");
console.log(customId);

const form = document.getElementById('bookingForm');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);

            // Make an API request to send the form data
            fetch(`https://localhost:7285/api/Booking/CreateBooking/${customId}`, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(function(res){
                console.log(res);
                console.log("BookingId to be saved:", res.data.id);
                localStorage.setItem("BookingId", res.data.id); 
                console.log("Before saving BookingId");

                if(res.sucesss===true){
                    console.log("BookingId to be saved:", res.data.id);
                    alert("BookingId to be saved: " + res.data.id);
                    localStorage.setItem("BookingId", res.data.id);
                    alert("Booking Created Successfully");
                }
            
                // location.href =""
            })
            .catch(error => { 
                // Handle errors
                console.error(error);
            });
        });


        // function singleRoom(id) {
        //     fetch(`https://localhost:7285/api/Room/GetRoom/${id}`)
        //       // .then(data => data.json())
        //       // .then(res => displaySingleRoom(res.data));
        //       .then((data) => data.json())
        //       .then((res) => {
        //         if (res.data) {
        //           displaySingleRoom(res.data);
        //         } else {
        //           console.error("Data not found in the response:", res);
        //           // You can handle the error here, e.g., display a message to the user.
        //         }
        //       });
        //   }
          
        //   singleRoom(id);