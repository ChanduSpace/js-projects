let weatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let apiKey = "&appid=2918d2bb3af32e91e128131a83c301e7";

let uviUrl = "https://currentuvindex.com/api/v1/uvi?";
// let timeUrl = "https://www.timeapi.io/api/Time/current/coordinate?";
let hour;
let minutes;
let date;
let month;
let day;
let monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let dayArray = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function dateTime(zone, d) {
  let dateAndTime = new Date((d + zone) * 1000);

  // let hour = (dateTime.getHours() % 12) - 3;
  // let AmPm = hour >= 12 ? 'pm' : 'am';

  hour = dateAndTime.getUTCHours();
  minutes = dateAndTime.getUTCMinutes();
  date = dateAndTime.getUTCDate();
  day = dayArray[dateAndTime.getUTCDay()];
  month = monthArray[dateAndTime.getUTCMonth()];
}

function dtToTime(dt, timezone) {
  let time = new Date((dt + timezone) * 1000);
  return `${time.getUTCHours()}:${time.getUTCMinutes()}`;
}
let img;
let main;
function mainImageFunction() {
  if (main == "Clear") {
    img = "clear";
  } else if (main == "Clouds") {
    img = "cloudy";
  } else if (main == "Rain") {
    img = "rain";
  } else if (main == "Mist") {
    img = "sunny";
  } else if (main == "Drizzle") {
    img = "drizzle";
  }
  return `pics/${img}.png`;
}

async function updateWeather(city) {
  let response = await fetch(weatherUrl + city + apiKey);
  let data = await response.json();
  console.log(data);
  let lat = data.coord.lat;
  let lon = data.coord.lon;
  let uviResponse = await fetch(
    uviUrl + "latitude=" + lat + "&longitude=" + lon
  );
  let uviData = await uviResponse.json();
  console.log(uviData);

  //////////////////////////////////////////////////////////
  //   let timeResponse = await fetch(
  //     timeUrl + "latitude=" + lat + "&longitude=" + lon
  //   );
  //   let timeData = await timeResponse.json();
  //   console.log(timeData);
  ////////////////////////////////////////////////////////////

  let timezone = data.timezone;
  let dt = data.dt;
  dateTime(timezone, dt);

  let temp = data.main.temp;
  document.querySelector(".inner-circle").classList.add("ani");
  document.querySelector(".sun-ellipse").classList.add("ani-progress");
  document.querySelector(".temp h1").innerHTML =
    Math.round(temp) + "°<span>c</span>";
  document.querySelector(".main").innerHTML = data.weather[0].description;
  main = data.weather[0].main;
  let mainImgPath = mainImageFunction();
  console.log(mainImgPath);

  document.querySelector(".date p").innerHTML = month + " " + date + ", " + day;
  console.log(month + " " + date + ", " + day);
  document.querySelector(".location p").innerHTML = data.name;
  document.querySelector(".time p").innerHTML = hour + ":" + minutes;

  /////////////         sun position       ////////////////////////
  let root = document.querySelector(":root");
  let sunrise = data.sys.sunrise;
  let sunset = data.sys.sunset;
  let sunPosition = ((dt - sunrise) * 100) / (sunset - sunrise);
  if (dt > sunrise && dt < sunset) {
    root.style.setProperty("--sun-position", sunPosition.toFixed(2));
  } else {
    root.style.setProperty("--sun-position", -1);
  }
  let sunriseTime = dtToTime(sunrise, timezone);
  let sunsetTime = dtToTime(sunset, timezone);
  document.querySelector(".rise").innerHTML = sunriseTime;
  document.querySelector(".set").innerHTML = sunsetTime;

  document.querySelector(".humidity-value").innerHTML =
    data.main.humidity + "%";
  root.style.setProperty("--humidity", data.main.humidity);
  document.querySelector(".wind-speed").innerHTML = data.wind.speed + " kmph";

  //   console.log(data.wind.deg > 0 && data.wind.deg < 90);
  //   console.log(157 > 180 && 157 < 270);
  //   console.log(0 < data.wind.deg < 90);                      this is not working

  if (data.wind.deg === 0) {
    document.querySelector(".wind-direction").innerHTML = "North";
  } else if (data.wind.deg > 0 && data.wind.deg < 90) {
    document.querySelector(".wind-direction").innerHTML = "North-East";
  } else if (data.wind.deg === 90) {
    document.querySelector(".wind-direction").innerHTML = "East";
  } else if (data.wind.deg > 90 && data.wind.deg < 180) {
    document.querySelector(".wind-direction").innerHTML = "South-East";
  } else if (data.wind.deg === 180) {
    document.querySelector(".wind-direction").innerHTML = "South";
  } else if (data.wind.deg > 180 && data.wind.deg < 270) {
    document.querySelector(".wind-direction").innerHTML = "South-West";
  } else if (data.wind.deg === 270) {
    document.querySelector(".wind-direction").innerHTML = "West";
  } else if (data.wind.deg > 270 && data.wind.deg < 360) {
    document.querySelector(".wind-direction").innerHTML = "North-West";
  }
  document.querySelector(".feel-like").innerHTML = Math.round(
    data.main.feels_like
  );
  document.querySelector(".uvi").innerHTML = uviData.now.uvi;
}

document.querySelector(".search-button").addEventListener("click", () => {
  document.querySelector(".main-container").classList.toggle("ani-flip");
  document.querySelector(".sun-ellipse").classList.remove("ani-progress");
  document.querySelector(".inner-circle").classList.remove("ani");
  updateWeather(document.querySelector(".input-box").value);
});
