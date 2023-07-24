
const apiKey = "8ea90c3595cd31b9fa7392eb8829f923";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.whether-icon');
const error =  document.querySelector('.error');
const weather =  document.querySelector('.weather');


async function checkWeather(city){
    const response  = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(searchBox.value === '' || response.status == 404){
        searchBox.style.borderColor = 'red';
        searchBox.style.borderWidth = '2px';
        weather.style.display ="none";
    
    if(response.status == 404){
       error.innerHTML  = "Invalid city name";
    } else{
        error.innerHTML  = "Search bar cannot be empty";
    } 

    } else {
    let data = await response.json();
    
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + " °c";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "./images/clouds.png"
    }else  if(data.weather[0].main == "Clear"){
        weatherIcon.src = "./images/clear.png";
    } else  if(data.weather[0].main == "Rain"){
        weatherIcon.src = "./images/rain.png"
    } else  if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "./images/drizzle.png";
    } else  if(data.weather[0].main == "Mist"){
        weatherIcon.src = "./images/mist.png";
    }  
    weather.style.display ="block";
    error.innerHTML  = "";
    }
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})
