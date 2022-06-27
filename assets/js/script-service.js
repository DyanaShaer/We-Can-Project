var servicesSection=document.getElementById('servicesSection');
var services=[];
if( localStorage.getItem("serviceList") ==null){
    services=[];
  }
  else {services=JSON.parse(localStorage.getItem("serviceList"))
  }
  displayDatta();
  function displayDatta(){
    var resultt= "";
    for( var i=0 ; i<services.length ;i++){
    resultt += `    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
    <div class="service">
        <div class="row me-4 ">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 img-service ">
          ${services[i].image}
          </div>
          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 ">
            <h3 class="header-service" >${services[i].name}</h3>
          </div>
        </div>
        <p class="service-content">${services[i].description}</p>
    </div>
    </div>
    
   `
    }
  
    servicesSection.innerHTML = resultt;
    localStorage.setItem("serviceList",JSON.stringify(services));
  }


