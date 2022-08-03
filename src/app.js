function formatDate(timestamp){
  let date=new Date(timestamp);
  let hours=date.getHours();
    if (hours < 10){
    hours=`0 ${hours}`;
  }
  let minutes=date.getMinutes();
  if (minutes < 10){
    minutes=`0 ${minutes}`;
  }

  let days=[
  "Sunday", 
  "Monday", 
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
  let day=days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}


function displayTemperature(response){
     let dateElement=document.querySelector("#date");
    let temperatureElement=document.querySelector("#currentTemperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let iconElement=document.querySelector("#icon");

    celsiusTemperature= response.data.main.temp;

 dateElement.innerHTML=formatDate(response.data.dt*1000);
temperatureElement.innerHTML=Math.round (response.data.main.temp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=Math.round (response.data.wind.speed);
iconElement.setAttribute(
"src", 
`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search (city) {
let apiKey= "eada887ccbd6462c016357c4150a3af7";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let searchInputElement= document.querySelector("#search-input");
    search(searchInputElement.value);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let currentTemperatureElement= document.querySelector("#currentTemperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature* 9) / 5 + 32;
    currentTemperatureElement.innerHTML= Math.round (fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
 event.preventDefault();
 let currentTemperatureElement= document.querySelector("#currentTemperature");
 celsiusLink.classList.add("active");
 fahrenheitLink.classList.remove("active");
 currentTemperatureElement.innerHTML= Math.round ( celsiusTemperature);
}
let celsiusTemperature= null;

let form= document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search ("Tokyo");