const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const titleName = urlParams.get('name');

document.title = `${document.title} - ${titleName || "Jonathan"}`;


const searchBox = document.getElementById("search");

searchBox.addEventListener("keydown", (e) => {
	if (e.code == "Enter") {
		const { value } = searchBox;
		if (value.replace(/ /gm, "").length > 0) location.href = `https://duckduckgo.com/?q=${value}`;
		else searchBox.value = "";
	}
});
