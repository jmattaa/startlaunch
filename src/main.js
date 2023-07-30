const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const titleName = urlParams.get('name');
const position = { lat: urlParams.get('lat'), lon: urlParams.get('lon') };

if (!position.lat && !position.lon) {
    // Null island :)
    position.lat = 0;
    position.lon = 0;
}

document.title = `${document.title} - ${titleName || "Jonathan"}`;


fetch("https://goweather.herokuapp.com/weather/Stockholm")
    .then(res => res.json().then(data => {
        document.getElementById("temp").innerHTML = data.temperature;
    }));

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function showTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    setTimeout(showTime, 1000);
}

const searchBox = document.getElementById("search");

searchBox.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        const { value } = searchBox;
        if (value.replace(/ /gm, "").length > 0) location.href = `https://duckduckgo.com/?q=${value}`;
        else searchBox.value = "";
    }
});

showTime();
