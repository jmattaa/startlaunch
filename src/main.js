const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const titleName = urlParams.get('name');
const widgets = document.getElementById("widgets-container");

const darkmodeToggle = document.getElementById("darkmode-toggle");

let today = new Date();
const currentDay = today.getDate();

let currentVerse;

document.title = `${document.title} - ${titleName || "Jonathan"}`;

if (localStorage.getItem("lastFetchedVerseDate") != currentDay && !localStorage.getItem("todaysVerse")) {
    fetch("https://beta.ourmanna.com/api/v1/get")
        .then(data => data.text().then(verse => {
            currentVerse = verse;
            localStorage.setItem("lastFetchedVerseDate", currentDay);
            localStorage.setItem("todaysVerse", verse);
            const verseElement = document.createElement("div");
            verseElement.classList.add("medium-font");
            verseElement.innerText = currentVerse;
            widgets.appendChild(verseElement);
        }));
} else {
    currentVerse = localStorage.getItem("todaysVerse");
    const verseElement = document.createElement("div");
    verseElement.classList.add("medium-font");
    verseElement.innerText = currentVerse;
    widgets.appendChild(verseElement);
}

function checkTheme() {
    if (darkmodeToggle.checked) {
        document.documentElement.style.setProperty("--colorscheme", "dark");
        document.documentElement.style.setProperty("--toggle-bg", "#fafafa");
    } else {
        document.documentElement.style.setProperty("--colorscheme", "light");
        document.documentElement.style.setProperty("--toggle-bg", "#131313");
    }
    localStorage.setItem("darkmode", darkmodeToggle.checked ? "dark" : "light");
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function showTime() {
    today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    setTimeout(showTime, 1000);
}

showTime();

if (localStorage.getItem("darkmode") === "dark")
    darkmodeToggle.checked = true;
else
    darkmodeToggle.checked = false;
checkTheme();
darkmodeToggle.addEventListener("change", () => {
    checkTheme();
});

