//let roomId = document.querySelector('#')


fetch('https://localhost:7285/api/Room/GetAllRooms',{
    method:"GET",
    
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