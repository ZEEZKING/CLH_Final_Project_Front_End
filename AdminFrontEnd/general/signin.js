// let role = document.querySelector('#admin_role');

// function Submit(){
//     let inputemail = document.querySelector('#email');
//     let inputpassword = document.querySelector('#password');

//     const user = {
//         email: inputemail.value,
//         password: inputpassword.value,
//     }
//     const options ={
//         method:'POST',
//         body:JSON.stringify(user),
//         headers:{
//             'Content-Type': 'application/json'
//         }
//     }
//     if (options) {
//         try {
//             const jsonData = JSON.parse(options);
//             // Your code to work with jsonData goes here
//         } catch (error) {
//             console.error("Error parsing JSON:", error);
//         }
//     } else {
//         console.error("Empty JSON data received.");
//     }
    
//     fetch('https://localhost:7285/api//User/Login',options)
//     .then(res => res.json())
//     .then(function (res){
//         if(res.success == true){
//             localStorage.setItem("Id",res.data.id);
//             localStorage.setItem("Role",res.data.role);
//             //localStorage.setItem("Token",res.data.token)

//             window.swal({
//                 title: "Checking...",
//                 text: "Please wait",
//                 imageUrl: "images/ajaxloader.gif",
//                 showConfirmButton: false,
//                 allowOutsideClick: false
//               });
//               setTimeout(() => {
//                 window.swal({
//                   icon: "success",
//                   title: "Successfuly logged in!",
//                   showConfirmButton: false,
//                   timer: 2000
//                 });
//               }, 2000);
//         }
//         if(res.success == true && res.data.role =="customer"){
//             location.href = "http://127.0.0.1:5500/marian-master/index.html"
//         }
//         window.alert('Sucessfull')

//     })
// }


function Submit() {
    let inputemail = document.querySelector('#email');
    let inputpassword = document.querySelector('#password');

    const user = {
        email: inputemail.value,
        password: inputpassword.value,
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // No need to parse the options object, as it's not JSON data.

    fetch('https://localhost:7285/api/User/Login', options)
        .then(res => res.json())
        .then(function (res) {
            if (res.sucesss === true) {
                localStorage.setItem("Id", res.data.id);
                localStorage.setItem("Role", res.data.role);

                window.swal({
                    title: "Checking...",
                    text: "Please wait",
                    imageUrl: "images/ajaxloader.gif",
                    showConfirmButton: false,
                    allowOutsideClick: false
                });
                setTimeout(() => {
                    window.swal({
                        icon: "success",
                        title: "Successfully logged in!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }, 2000);
            }
            if (res.sucesss === true && res.data.role === "customer") {
                location.href = "http://127.0.0.1:5502/hotel-html-template/index.html";
            }
            else if (res.sucesss === true && res.data.role === "manager") {

                location.href = "http://127.0.0.1:5502/Manager-DashBoard/index.html";
            }
            else if (res.sucesss === true && res.data.role === "salesmanager") {

               location.href = "http://127.0.0.1:5502/Manager-DashBoard/index.html";
            }
            else if (res.sucesss === true && res.data.role === "superadmin") {

                location.href = "http://127.0.0.1:5502/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html";
            }
            else{
                window.alert('Invalid credentials Please Try Again');
            }
          

            console.log("res.sucesss:", res.sucesss);
            console.log("res.data.role:", res.data.role);
            console.log("Response:", res);
            window.alert('Successful');
        })
        .catch(error => {
            console.error("Error in fetch:", error);
        });
}
