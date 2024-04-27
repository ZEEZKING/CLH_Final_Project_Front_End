
let bookingIds = localStorage.get('bookingId');
        
let urlParam = new URLSearchParams(window.location.search);
let orderIds = urlParams.get('OrderId');

        let payment_info = document.querySelector("#payment-info");
        let cart_info = document.querySelector("#cart-info");
        let total = document.querySelector('.total');
        let orderId = orderIds;
        let bookingId = bookingIds;
        //let authorizationURL = "https://checkout.paystack.com/pi2hkdf6jdfwop2" ;

        let cartItems = `
            <tr>
                <td>{{Q}}</td>
                <td>{{PRODUCT-NAME}}</td>
                <td class="right">₦{{TOTAL}}</td>
                <td class="bold">₦{{TOTAL}}</td>
            </tr>`;

        let PaymentInfo = `
            <tr>
                <td>Status</td>
                <td class="right">{{STATUS}}</td>
            </tr>
            <!-- Other payment details here -->`;

        function initiatePayment() {
            // Redirect to Paystack checkout page with necessary parameters
            window.location.href = `${authorizationURL}/${orderId}/${bookingId}`;
        }

        // Function to fetch and update order details
        let fetchOrderDetails = () => {
            // Your existing code for fetching order details
            fetch(`https://localhost:5001/api/Order/Get/${orderId}`)
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    cart_info.innerHTML = "";
                    let t = 0;

                    response.data.orderDtos.forEach(x => {
                        let ct = cartItems
                            .replace('{{Q}}', x.quantityBought)
                            .replace('{{PRODUCT-NAME}}', x.productDto.name)
                            .replaceAll('{{TOTAL}}', x.amountPaid);

                        t += x.amountPaid;
                        cart_info.innerHTML += ct;
                    });

                    total.innerText = "₦" + t;
                })
                .catch(error => console.error("Error fetching order details:", error));
        };

        // Function to fetch and update payment details
        let fetchPaymentDetails = () => {
            // Your existing code for fetching payment details
            fetch(`https://localhost:5001/api/Payment/Get/${orderId}`)
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    let p = PaymentInfo
                        .replace('{{STATUS}}', response.data.gateway_response.toUpperCase());

                    payment_info.innerHTML = p;
                })
                .catch(error => console.error("Error fetching payment details:", error));
        };

        // Fetch and update both order and payment details
        fetchOrderDetails();
        fetchPaymentDetails();