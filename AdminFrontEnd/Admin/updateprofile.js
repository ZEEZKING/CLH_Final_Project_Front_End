const myform = document.querySelector('#update-form');
let id = localStorage.getItem('Id')
myform.addEventListener('submit',(event) => {
    event.preventDefault();
    console.log(myform);
    let sendForm = new FormData(myform);
    console.log(sendForm.get("username"));
    console.log(sendForm.get("imageUrl"));
    fetch(`https://localhost:7285/api/Manager/UpdateManager/${id}`,
    {
        method: "PUT",
        body: sendForm,
    })
    .then((res) =>{
        console.log(res);
        return res.json();
    })
    .then(function(value){
        console.log(value.sucesss);
        if(value.sucesss){
            swal("Success", `${value.message}`, "success")
                // location.href = "./index.html"
                viewProfile();
        }
        else{
            swal("Opps!", `${value.message}`, "warning");
        }
    })
    .catch((res) =>{
        window.alert("UnAuthorized")
    })
       //localStorage.clear();
})