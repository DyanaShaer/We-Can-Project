var serviceNameInput=document.getElementById("serviceName");
var serviceDescriptionInput=document.getElementById("serviceDescription");
var serviceImageInput=document.getElementById("serviceImage");
var addBtn =document.getElementById("click");
var inputs =document.getElementsByClassName("inputs");
var deleteBtn =document.getElementById("deleteBtn");
var data =document.getElementById("data");
var clrBtn =document.getElementById("clrBtn");
var nameAlert =document.getElementById("nameAlert");
var descriptionAlert =document.getElementById("descriptionAlert");
const imagee =document.getElementById('imagee');
var currentIndex=0;
var services=[];
if( localStorage.getItem("serviceList") ==null){
  services=[];
}
else {services=JSON.parse(localStorage.getItem("serviceList"))
displayData();
}

addBtn.onclick = function(){
  if(addBtn.innerHTML=="add service"){
    addService();
  }
  else{ updateService();
  }
   displayData();
   clearForm();
}

serviceImageInput=imagee.innerHTML=' <img id="display-image"/>'
let reader = new FileReader();
serviceImage.addEventListener("change", function() {
  reader.addEventListener("load", () => {
    let uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
    localStorage.setItem("display-image", reader.result);
  });
   reader.readAsDataURL(this.files[0]);
}
);



function addService(){
document.querySelector("#display-image").src=localStorage.getItem('display-image');
  var service ={ 
    name:serviceNameInput.value,
    description:serviceDescriptionInput.value,
    image:imagee.innerHTML,
  }

  services.push(service);
 localStorage.setItem("serviceList",JSON.stringify(services));
  Swal.fire({
   position: 'top-end',
   icon: 'success',
   title: 'services is added succecfully',
   showConfirmButton: false,
   timer: 1500
 })
 addBtn.setAttribute("disabled","true");
 serviceName.classList.remove("is-valid");
 serviceDescription.classList.remove("is-valid");

}

function displayData(){
  var result= "";
  for( var i=0 ; i<services.length ;i++){
  result += 
  `<tr>
    <td>${i}</td>
    <td>${services[i].name}</td>
    <td>${services[i].description}</td>
    <td>${services[i].image}</td>
    <td><button class="btn btn-outline-info" onclick="getServiceData(${i})">update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteData(${i})">delete</button></td>
  </tr>`
  }

  data.innerHTML = result;
  localStorage.setItem("serviceList",JSON.stringify(services));
}

function clearForm(){
  for(var i=0;i<inputs.length;i++){
    inputs[i].value="";
    imagee.innerHTML=' <img id="display-image"/>'
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
      services.splice(index,1);
      localStorage.setItem("serviceList",JSON.stringify(services));
      displayData();
      Swal.fire(
        'Deleted!',
        'service has been deleted.',
        'success'
      )
    }
  })
}

deleteBtn.onclick = function(){
  if( services== ""){
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
        localStorage.removeItem("serviceList")
        services=[];
        data.innerHTML="";
       localStorage.setItem("serviceList",JSON.stringify(services));    
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
  for( var i=0 ;i<services.length ;i++){
    if(services[i].name.toLowerCase().includes(searchText.toLowerCase())){
      result += 
      `<tr>
        <td>${i}</td>
        <td>${services[i].name}</td>
        <td>${services[i].description}</td>
        <td>${services[i].image}</td>
        <td><button class="btn btn-outline-info" onclick=" getServiceData(${i})">update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteData(${i})">delete</button></td>
      </tr>`
      }
    }
  
  data.innerHTML = result;
}

function getServiceData(index){
  var service = services[index];
  serviceNameInput.value= service.name;
  serviceDescriptionInput.value= service.description;
  service.image =imagee.innerHTML=' <img id="display-image"/>';
 addBtn.innerHTML="update course"; 
 currentIndex =index;
 document.querySelector("#display-image").src=localStorage.getItem('display-image');

 
}

function updateService(){
  document.querySelector("#display-image").src=localStorage.getItem('display-image');
  var service = { 
    name:serviceNameInput.value,
    description:serviceDescriptionInput.value,
    image:imagee.innerHTML,
};
services[currentIndex].name=service.name;
services[currentIndex].description=service.description;
services[currentIndex].image=service.image;
localStorage.setItem("serviceList",JSON.stringify(services));
addBtn.innerHTML="add service"; 
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})
addBtn.setAttribute("disabled","true");
 serviceName.classList.remove("is-valid");
 serviceDescription.classList.remove("is-valid");


}

serviceName.onkeyup = function(){
  var namePattern=/^[A-Z][a-z- & A-Z]{2,24}$/;
  if(namePattern.test(serviceName.value)){
    addBtn.removeAttribute("disabled");
    serviceName.classList.add("is-valid");
    serviceName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  }
  else{
    addBtn.setAttribute("disabled","true");
    serviceName.classList.add("is-invalid");
    serviceName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
  }
}
serviceDescription.onkeyup = function(){
  var descriptionPattern=/^[A-Z][a-z- & , . < > _ A-Z 0-9 ']{48,180}$/;
  if(descriptionPattern.test(serviceDescription.value)){
    addBtn.removeAttribute("disabled");
    serviceDescription.classList.add("is-valid");
    serviceDescription.classList.remove("is-invalid");
    descriptionAlert.classList.add("d-none");
    
    }
  else{
    addBtn.setAttribute("disabled","true");
    serviceDescription.classList.add("is-invalid");
    serviceDescription.classList.remove("is-valid");
    descriptionAlert.classList.remove("d-none");

  }
}

clrBtn.onclick = function() {

  serviceNameInput.value="";
  serviceDescriptionInput.value="";
  serviceImageInput.value="";
}


