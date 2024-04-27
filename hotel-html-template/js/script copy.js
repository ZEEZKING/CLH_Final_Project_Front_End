let id = localStorage.getItem("Id");
let _orderId = 0;

// Create input fields for email and phone
const emailInput = document.createElement("input");
emailInput.setAttribute("type", "text");
emailInput.setAttribute("id", "email");
emailInput.setAttribute("placeholder", "Enter your email");

const phoneInput = document.createElement("input");
phoneInput.setAttribute("type", "text");
phoneInput.setAttribute("id", "phone");
phoneInput.setAttribute("placeholder", "Enter your phone number");

// Create a button for initiating payment
const paymentButton = document.createElement("button");
paymentButton.textContent = "Initiate Payment";
paymentButton.addEventListener("click", () => {
    // Call your function to calculate booking price and initiate payment
    CalculateBookingRoomPrice({
        quantity: quantity ,
        perNight: perNight
    });
});

// Append the elements to the body of the HTML document
document.body.appendChild(emailInput);
document.body.appendChild(phoneInput);
document.body.appendChild(paymentButton);

function CalculateBookingRoomPrice(bookingDetails) {
    fetch(`https://localhost:7285/api/Room/GetRoom/${id}`)
        .then(data => data.json())
        .then(res => {
            if (res.data === "success") {
                const room = res.room;
                const { quantity, perNight } = bookingDetails;
                const totalBookingPrice = room.roomPrice * quantity * perNight;

                initiatePayment(_orderId, totalBookingPrice, id);
            }
        });
}

let initiatePayment = (_orderId, amount, id) => {
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const inputes = {
        amount: amount,
        email: email,
        phoneNumber: phone
    };

    // rest of the code...
};
