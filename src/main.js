const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const titleName = urlParams.get('name');
const position = { lat: urlParams.get('lat'), lon: urlParams.get('lon') };

if (!position.lat && !position.lon)
{
    // Null island :)
    position.lat = 0;
    position.lon = 0;
}

document.title = `${document.title} - ${titleName || "Jonathan"}`;

fetch(`https://api.open-meteoo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => console.log(data));

const searchBox = document.getElementById("search");

searchBox.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        const { value } = searchBox;
        if (value.replace(/ /gm, "").length > 0) location.href = `https://duckduckgo.com/?q=${value}`;
        else searchBox.value = "";
    }
});
