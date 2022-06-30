var loginForm=document.getElementById('loginForm');
var emailLogin=document.getElementById('emailLogin');
var passwordLogin=document.getElementById('passwordLogin');
var loginButton=document.getElementById('loginButton');
var exampleModal=document.getElementById('exampleModal');
var listitem=document.getElementById('listitem');

var admins=[];
if( localStorage.getItem("adminList") ==null){
  admins=[];
  }
  else {admins=JSON.parse(localStorage.getItem("adminList"))
  }

var Logins=[];
function addLogin(){
    var Login ={ 
      Email:emailLogin.value,
      Password:passwordLogin.value,
    }
  
    Logins.push(Login);
console.log(Logins);  
  } 

 
  
loginButton.onclick =function(){
  if(loginButton.innerHTML=="Login"){
    loginModal.onclick = function(){
      addLogin();
      displayData();
    }      
  }
  else{
    dropdown.innerHTML=``;
    listitem.style.maxWidth="720px";
  }
}


  function displayData(){
    for( var i=0 ; i<admins.length; i++){
      for(var j=0 ; j<Logins.length; j++){
        if(admins[i].email==Logins[j].Email && admins[i].password==Logins[j].Password) {
          loginButton.innerHTML="logOut";
          loginButton.removeAttribute("data-bs-target");
          loginButton.removeAttribute("data-bs-toggle");
          loginButton.setAttribute("href","index.html");



          dropdown.innerHTML=` <a class="dropdown-toggle " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="admin/index.html">Home</a></li>
          <li><a class="dropdown-item" href="admin/admin.html">Admin</a></li>
          <li><a class="dropdown-item" href="admin/service.html">Services</a></li>
          <li><a class="dropdown-item" href="#">Clients</a></li>
          <li><a class="dropdown-item" href="#">Careers</a></li>

        </ul>
          `
          listitem.style.maxWidth="860px";
          
        }
      }
    }
  }



  