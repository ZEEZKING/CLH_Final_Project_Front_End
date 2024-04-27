let name = document.querySelector('#role');
const myform = document.querySelector('#add-manager-form');
myform.addEventListener('submit', (x) => {
    x.preventDefault();
    console.log(myform);
    // let Token = localStorage.getItem("token");
    // console.log(Token);
    let sendForm = new FormData(myform);
    fetch(`https://localhost:7285/api/Manager/RegisterManager`,
        {
            method: "POST",
            body: sendForm,
            
        })
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then(function (value) {
            console.log(value.sucesss);
            if (value.sucesss) {
                window.alert(value.message);
                // Redirect to the specified URL
                window.location.replace('http://127.0.0.1:5501/bootstrap-admin-template-free/bootstrap-admin-template-free/index.html');
            }
            
            else {
                window.alert(value.message);
            }

        })
        .catch((res) => {
            window.alert("UnAuthorized")

            // localStorage.clear();
            // location.href = "/Login/login.html"
        })

})