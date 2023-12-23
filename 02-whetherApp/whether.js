let weatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let apiKey = "&appid=2918d2bb3af32e91e128131a83c301e7";

async function updateWeather(city) {
  let response = await fetch(weatherUrl + city + apiKey);
  let data = await response.json();
  let temp = data.main.temp;
  console.log(data);
  document.querySelector(".temp h1").innerHTML =
    Math.round(temp) + "°<span>c</span>";
  document.querySelector(".main").innerHTML = data.weather[0].description;
  document.querySelector(".location p").innerHTML = data.name;
  document.querySelector(".humidity-value").innerHTML =
    data.main.humidity + "%";
  let root = document.querySelector(":root");
  root.style.setProperty("--humidity", data.main.humidity);
}

document.querySelector(".search-button").addEventListener("click", () => {
  updateWeather(document.querySelector(".input-box").value);
});
