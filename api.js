const locationInput=document.querySelector('.location');
const findButton=document.getElementById('findBtn')
const today=document.querySelector('.now-day');
const todayDate=document.querySelector('.now-date');
const cityName=document.querySelector('.city');
const todayDeg=document.querySelector('.deg');
const todayState=document.querySelector('.first-state');
const todayIcon=document.querySelector('.first-icon')
const tomorrow=document.querySelector('.next-day');
const secondIcon=document.querySelector('.sec-icon');
const tomorrowDegFirst=document.querySelector('.sec-first-deg');
const tomorrowDegLast=document.querySelector('.sec-last-deg');
const tomorrowState=document.querySelector('.sec-state');
const thirdDay=document.querySelector('.third-day');
const thirdIcon=document.querySelector('.third-icon');
const thirdDegFirst=document.querySelector('.third-first-deg');
const thirdDegLast=document.querySelector('.third-last-deg');
const thirdState=document.querySelector('.third-state');
const emailInput=document.querySelector('.email-input')
const subButton=document.getElementById('subBtn')


let weatherData=[];



function supportError()
{
    Swal.fire({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        icon: "warning",
        title: "Your Device Doesn't Support Location",
    });

}

findButton.addEventListener('click',function(){
    if(navigator.geolocation)
        {
            weatherByCity(locationInput.value);
        }
        else{
            supportError();
        }
        
})

locationInput.addEventListener('input',function(){
   
});

async function weatherByCity(city)
{
    let response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2ce33231aa4a410e8f4194842243009&q=${city}&days=3`);
    let data = await response.json();
    weatherData=data;
    console.log(data);
    displayWeatherData();
}
function displayWeatherData(){
    today.innerHTML=dayOfWeek(weatherData.forecast.forecastday[0].date);
    todayDate.innerHTML=weatherData.forecast.forecastday[0].date;
    cityName.innerHTML = weatherData.location.name;
    todayDeg.innerHTML = weatherData.current.temp_c + '&degC';
    todayState.innerHTML = weatherData.current.condition.text;
    todayIcon.src=weatherData.current.condition.icon;
    tomorrow.innerHTML=dayOfWeek(weatherData.forecast.forecastday[1].date);
    secondIcon.src=weatherData.forecast.forecastday[1].day.condition.icon;
    tomorrowDegFirst.innerHTML=weatherData.forecast.forecastday[1].day.maxtemp_c + '&degC';
    tomorrowDegLast.innerHTML=weatherData.forecast.forecastday[1].day.mintemp_c + '&deg';
    tomorrowState.innerHTML=weatherData.forecast.forecastday[1].day.condition.text;
    thirdDay.innerHTML=dayOfWeek(weatherData.forecast.forecastday[2].date);
    thirdIcon.src=weatherData.forecast.forecastday[2].day.condition.icon;
    thirdDegFirst.innerHTML=weatherData.forecast.forecastday[2].day.maxtemp_c + '&degC';
    thirdDegLast.innerHTML=weatherData.forecast.forecastday[2].day.mintemp_c + '&deg';
    thirdState.innerHTML=weatherData.forecast.forecastday[2].day.condition.text;

}

function dayOfWeek(dateStr)
{
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let realDate=new Date(dateStr);
    let indexOfDay=realDate.getDay();
    let dayName=days[indexOfDay];
    return dayName;
}

subButton.addEventListener('click',function()
{
    location.reload();
})

window.onload = function() {
    weatherByCity('cairo');
    emailInput.value = '';
};

