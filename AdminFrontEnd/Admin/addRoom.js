let room = document.querySelector('#addroom-form');

const form = document.getElementById('addroom-form');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);

            // Make an API request to send the form data
            fetch('https://localhost:7285/api/Room/CreateRoom', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle the API response (e.g., show a success message)
                console.log(data);
                console.log(data.sucesss);
                if(data.sucesss){
                    // swal("Success", `${data.message}`, "success")
                        // location.href = "./index.html"
                       // viewProfile();
                       //localStorage.setItem("Id", data.id);
                       localStorage.setItem("RoomId", data.id);
                       window.alert('Sucessfully Created')
                       location.href =
                         "http://127.0.0.1:5501/hotel-html-template/roomUpt.html";
                }
                else{
                    // swal("Opps!", `${data.message}`, "warning");
                    window.alert(' Not Sucessfully Created')
                }
             

            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
        });
