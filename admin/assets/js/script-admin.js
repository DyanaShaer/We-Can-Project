var adminEmailInput=document.getElementById("adminEmail");
var adminPasswordInput=document.getElementById("adminPassword");
var addBtn =document.getElementById("click");
var inputs =document.getElementsByClassName("inputs");
var deleteBtn =document.getElementById("deleteBtn");
var data =document.getElementById("data");
var clrBtn =document.getElementById("clrBtn");
var emailAlert =document.getElementById("emailAlert");
var passwordAlert =document.getElementById("passwordAlert");
var currentIndex=0;
var admins=[];
if( localStorage.getItem("adminList") ==null){
  admins=[];
}
else {admins=JSON.parse(localStorage.getItem("adminList"))
displayData();
}

addBtn.onclick = function(){
  if(addBtn.innerHTML=="add admin"){
    addAdmin();
  }
  else{ updateAdmin();
  }
   displayData();
   clearForm();
}




function addAdmin(){
  var admin ={ 
    email:adminEmailInput.value,
    password:adminPasswordInput.value,
  }

  admins.push(admin);
 localStorage.setItem("adminList",JSON.stringify(admins));
  Swal.fire({
   position: 'top-end',
   icon: 'success',
   title: 'admins is added succecfully',
   showConfirmButton: false,
   timer: 1500
 })
 addBtn.setAttribute("disabled","true");
 adminEmail.classList.remove("is-valid");
 adminPassword.classList.remove("is-valid");

}

function displayData(){
  var result= "";
  for( var i=0 ; i<admins.length ;i++){
  result += 
  `<tr>
    <td>${i}</td>
    <td>${admins[i].email}</td>
    <td>${admins[i].password}</td>
    <td><button class="btn btn-outline-info" onclick="getAdminData(${i})">update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteData(${i})">delete</button></td>
  </tr>`
  }

  data.innerHTML = result;
  localStorage.setItem("adminList",JSON.stringify(admins));
}

function clearForm(){
  for(var i=0;i<inputs.length;i++){
    inputs[i].value="";
    displayData();
}
}
 function deleteData(index){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      admins.splice(index,1);
      localStorage.setItem("adminList",JSON.stringify(admins));
      displayData();
      Swal.fire(
        'Deleted!',
        'admin has been deleted.',
        'success'
      )
    }
  })
}

deleteBtn.onclick = function(){
  if( admins== ""){
    addBtn.setAttribute("disabled","true")

  }
  else{
    deleteBtn.removeAttribute("disabled");
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminList")
        admins=[];
        data.innerHTML="";
       localStorage.setItem("adminList",JSON.stringify(admins));    
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  
  }
}

function search(searchText){
  var result= "";
  for( var i=0 ;i<admins.length ;i++){
    if(admins[i].email.toLowerCase().includes(searchText.toLowerCase())){
      result += 
      `<tr>
        <td>${i}</td>
        <td>${admins[i].email}</td>
        <td>${admins[i].password}</td>
        <td><button class="btn btn-outline-info" onclick=" getAdminData(${i})">update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteData(${i})">delete</button></td>
      </tr>`
      }
    }
  
  data.innerHTML = result;
}

function getAdminData(index){
  var admin = admins[index];
  adminEmailInput.value= admin.email;
  adminPasswordInput.value= admin.password;
 addBtn.innerHTML="update admin"; 
 currentIndex =index;

 
}

function updateAdmin(){
  var admin = { 
    email:adminEmailInput.value,
    password:adminPasswordInput.value,
};
admins[currentIndex].email=admin.email;
admins[currentIndex].password=admin.password;
localStorage.setItem("adminList",JSON.stringify(admins));
addBtn.innerHTML="add admin"; 
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})
addBtn.setAttribute("disabled","true");
 adminEmail.classList.remove("is-valid");
 adminPassword.classList.remove("is-valid");


}

adminEmail.onkeyup = function(){
  var emailPattern=/^[a-zA-Z 0-9 . @]{5,30}$/;
  if(emailPattern.test(adminEmail.value)){
    addBtn.removeAttribute("disabled");
    adminEmail.classList.add("is-valid");
    adminEmail.classList.remove("is-invalid");
    emailAlert.classList.add("d-none");
  }
  else{
    addBtn.setAttribute("disabled","true");
    adminEmail.classList.add("is-invalid");
    adminEmail.classList.remove("is-valid");
    emailAlert.classList.remove("d-none");
  }
}
adminPassword.onkeyup = function(){
  var passwordPattern=/^[a-zA-Z 0-9 . ]{8,30}$/;
  if(passwordPattern.test(adminPassword.value)){
    addBtn.removeAttribute("disabled");
    adminPassword.classList.add("is-valid");
    adminPassword.classList.remove("is-invalid");
    passwordAlert.classList.add("d-none");
    
    }
  else{
    addBtn.setAttribute("disabled","true");
    adminPassword.classList.add("is-invalid");
    adminPassword.classList.remove("is-valid");
    passwordAlert.classList.remove("d-none");

  }
}

clrBtn.onclick = function() {

  adminEmailInput.value="";
  adminPasswordInput.value="";
}


