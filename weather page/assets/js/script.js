var weatherPage=document.getElementById("weatherPage");
var weather={};
var weatherName =[];
getWeather("Jenin");
async function getWeather(city){
var response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}%2Cpalestine&APPID=65806d931d4a1a4c859f8fc11d6292ef&fbclid=IwAR1JDWdVb22F9HDZWE39zQ4tiMVDDNIpq5bqYQrizdfVH7p0TgD1XXr0tZg`);
weather = await response.json();
displayData();

}

function displayData(){
    weatherPage.innerHTML=`    <section class="home min-vh-100 ">
    <nav class="navbar navbar-expand-lg fixed-top ">
        <div class="container-fluid">
          <a class="navbar-brand text-capitalize" href="#">Today's weather in palestine</a>
          <div class="input-group inputGroup ">
            <span class="input-group-text spanInput" id="spanInput"><i class="fa-solid fa-magnifying-glass icon"></i></span>
            <input type="text" class="input" id="weatherInput" placeholder=" Search for a city" aria-describedby="basic-addon1">
          </div>
        </div>
      </nav>
        <span class="headerspan"> <span class="city">${weather.name}</span><br/> <span class="tempheader">${weather.main.temp}</span><br/> <span class="skyheader">${weather.weather[0].description}</span></span> 
</section>

  <section class="tableSection">
    <p class="des">Today's weather in <span>${weather.name}</span> :<span><br/> <br/> <span class="temp">${weather.main.temp}</span><br/> <span>${weather.weather[0].description}</span></span> </p>
       <table class="table  w-75 m-auto ">
        <tbody >
          <tr>
            <th class="text-capitalize" ><img src="assets/img/1.PNG"/>temp_min</th>
            <td>${weather.main.temp_min}</td>
            <th class="text-capitalize"><img src="assets/img/4.PNG"/>visibility</th>
            <td>${weather.visibility}</td>
    
          </tr>
          <tr>
            <th class="text-capitalize"><img src="assets/img/1.PNG"/>temp_max</th>
            <td>${weather.main.temp_max}</td>
            <th class="text-capitalize"><img src="assets/img/5.PNG"/>wind-speed</th>
            <td>${weather.wind.speed}</td>
    
          </tr>
          <tr>
            <th class="text-capitalize"><img src="assets/img/2.PNG"/>pressure</th>
            <td>${weather.main.pressure}</td>
            <th class="text-capitalize"><img src="assets/img/5.png"/>wind-deg</th>
            <td>${weather.wind.deg}</td>
            
          </tr>
          <tr>
            <th class="text-capitalize"><img src="assets/img/3.PNG"/>humidity</th>
            <td>${weather.main.humidity}</td>
            <th class="text-capitalize"><img src="assets/img/5.PNG"/>wind-gust</th>
            <td>${weather.wind.gust}</td>
    
          </tr>
        </tbody>
      </table>
      <p class="bottomTable"></p> 

    </section>
    `
    var weatherInput=document.getElementById("weatherInput");
    var spanInput=document.getElementById("spanInput");
  
    spanInput.onclick = function(){
    addCity();


  }
  function addCity(cityname){
    var service ={ 
      name:weatherInput.value,
    }
      weatherName.push(service);
      for( var i=0 ; i<weatherName.length ;i++){
        var cityname =weatherName[i].name;
      }   
      console.log(cityname);
      getWeather(cityname);
  }
  }
// getWeather(weatherInput.value); 

