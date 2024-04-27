let id = localStorage.getItem("Id");
let profile_image = document.querySelector('#profileimage');
let profile_name = document.querySelector('#name');
let profile_email = document.querySelector('#emails');
var username = document.querySelector('#username');
var name = document.querySelector('#name');
var email = document.querySelector('#email');
var phone = document.querySelector('#phonenumber');
var address = document.querySelector('#address');
let IMAAGETEMPLATE = `<div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="http://127.0.0.1:5501/wwwroot/Images/{{PROFILEIMAGE}}">
<div class="input--file">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3.2"/>
            <path d="M9 2l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
            <path d="M0 0h24v24h-24z" fill="none"/>
          </svg>
        </span>
        <input name="Select File" type="file" name="profileimage" id="profileimage" onchange="changePics()"/>
<span class="font-weight-bold" id="name">{{NAME}}</span>
<span class="text-black-50" id="emails">{{EMAIL}}</span><span> </span></div>
`
let viewProfile = () => {

    fetch(`https://localhost:7285/api/Manager/GetManager/${id}`)
    .then(response => response.json())
    .then(function(response){
        profile_image.innerHTML = "";
            username.value = response.data.username;
            name.value = response.data.Name;
            email.value = response.data.email;
            phone.value = response.data.phoneNumber;
            address.value = response.data.address;
            let image = IMAAGETEMPLATE
            .replace('{{PROFILEIMAGE}}',response.data.profileimage)
            .replace('{{NAME}}',response.data.Name)
            .replace('{{EMAIL}}',response.data.email)
            profile_image.innerHTML = image;
            
    })
} 
"This \"a goat\""

function changePics() {
    fetch(`https://localhost:7285/api/Manager/GetManager/${id}`)
    .then(response => response.json())
    .then(function(response){
        let pics = document.querySelector("#profileimage")
        profile_image.innerHTML = "";
            user_name.value = response.data.username;
            name.value = response.data.Name;
            email.value = response.data.email;
            phone.value = response.data.phoneNumber;
            // window.alert(pics.value.split("\\")[2])
            let image = IMAAGETEMPLATE
            .replace('{{PROFILEIMAGE}}',pics.value.split("\\")[2])
            .replace('{{NAME}}',response.data.Name)
            .replace('{{EMAIL}}',response.data.email)
            profile_image.innerHTML = image;
            
    })
}

viewProfile();