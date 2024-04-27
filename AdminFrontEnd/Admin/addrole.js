
// let values = name.value;
// const options ={
//     method: "POST",
//     body: JSON.stringify(values),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }
// fetch('https://localhost:7285/api/Role/CreateRole',options)
// .then((res) => {
//     console.log(res);
//     return res.json();
// })
// .then(function(value){
//     console.log(value.sucesss);
//     window.alert(value.message);
// })
const form = document.getElementById('add-role');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);

            // Make an API request to send the form data
            fetch('https://localhost:7285/api/Role/CreateRole', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle the API response (e.g., show a success message)
                console.log(data);
                if(data.sucesss == true){
                    window.alert('Sucessfully Created')
                }
                else{
                    window.alert("Not Created either Role Already Exist")
                }
                

            }).then(() => {
                // window.location.href = './getCustomerById.html';
                location = 'http://127.0.0.1:5501/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html';
               
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
        });