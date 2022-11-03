// https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key};
let key = "dae6521ae39fc64f8d201f17c57efeb5";
let data;
let city;
let container = document.querySelector("#container");
let bottom = document.querySelector("#bottom");
let map = document.querySelector("#gmap_canvas");
let border = document.querySelector(".mapouter");
let date = new Date();
async function getWeather() {
  try {
    city = document.querySelector("#city").value;

    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    );
    let bottomRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${key}&units=metric`
    );
    data = await res.json();
    bottomData = await bottomRes.json();
    console.log(data);
    appendData(data);
    bottomAppend(bottomData);
  } catch (err) {
    console.log(err);
  }
}

function appendData(data) {
  container.innerHTML = "";

  let div = document.createElement("div");
  div.style.boxShadow =
    "rgba(0, 0, 0, 0.24) 0px 3px 8px";
  let line1 = document.createElement("p");
  line1.innerText = date.toDateString() + ", " + date.toLocaleTimeString();
  line1.style.color = "teal";
  let name = document.createElement("h2");
  name.innerText = `City - ${data.name}`;
  let icon = document.createElement("img");
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let temp = document.createElement("p");
  temp.innerText = `${data.main.temp}˚C`;
  temp.style.fontSize = "50px";
  let humidity = document.createElement("p");
  humidity.innerText = `Humidity - ${data.main.humidity}`;
  let pressure = document.createElement("p");
  pressure.innerText = `Pressure - ${data.main.pressure}`;

  div.append(line1, name, icon, temp, humidity, pressure);
  container.append(div);
  map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  border.style.boxShadow =
    "rgba(0, 0, 0, 0.24) 0px 3px 8px";
}

function bottomAppend(bottomData) {
  let all = bottomData.list;
  bottom.innerHTML = null;

    all.forEach(function(elem,i){
      let char = all[i];
      let box = document.createElement("div");
      box.style.boxShadow =
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px";
      let day = document.createElement("p");
      let date = new Date();
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let n = date.getDay();

      if (n + i >= 7) {
        day.innerText = days[n + i - 7];
      } else {
        day.innerText = days[n + i];
      }
      let logo = document.createElement("img");
      logo.src = `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;
      let max = document.createElement("p");
      max.innerText = `Max - ${elem.main.temp_max}˚C`;
      let min = document.createElement("p");
      min.innerText = `Min - ${elem.main.temp_min}˚C`;

      box.append(day, logo, max, min);
      bottom.append(box);
    })
    
  }


  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    const crd = pos.coords;
    
    try {
      city = document.querySelector("#city").value;
  
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${key}&units=metric`
      );
      let bottomRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&cnt=7&appid=${key}&units=metric`
      );
      data = await res.json();
      bottomData = await bottomRes.json();

      appendData(data);
      bottomAppend(bottomData);

    } catch (err) {
      console.log(err);
    }
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
console.log(`https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=0197b72d4fdc61f77775a49831e8dd55&units=metric`)
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
  