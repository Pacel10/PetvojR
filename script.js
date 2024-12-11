// Sample playlist data (simulate search results)
const playlist = [
    { id: 1, artist: "Aqours", title: "MY LIST", album: "Love Live!" },
    { id: 2, artist: "Chika Takami", title: "MY LIST", album: "Love Live!" },
    { id: 3, artist: "Dia Kurosawa", title: "MY LIST", album: "Love Live!" },
    { id: 4, artist: "Hanamaru Kunikida", title: "MY LIST", album: "Love Live!" },
    { id: 5, artist: "Kanan Matsuura", title: "MY LIST", album: "Love Live!" },
];

// Elements
const searchBar = document.getElementById("search-bar");
const searchStatus = document.getElementById("search-status");
const results = document.getElementById("results");

// Search function
function searchSongs(query) {
    if (!query) return []; // Return empty array if query is empty
    return playlist.filter(song =>
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
    );
}

// Event listener for search bar
searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim();
    searchStatus.style.visibility = "visible"; // Show "Searching..." message

    setTimeout(() => {
        const resultsList = searchSongs(query);
        displayResults(resultsList);
        searchStatus.style.visibility = "hidden"; // Hide "Searching..." after results load
    }, 500);
});

// Display search results
function displayResults(resultsList) {
    results.innerHTML = ""; // Clear previous results

    if (resultsList.length === 0) {
        results.innerHTML = "<p>No songs found.</p>";
        return;
    }

    resultsList.forEach(song => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = `
            <span><strong>Artist:</strong> ${song.artist}</span>
            <span><strong>Title:</strong> ${song.title}</span>
            <span><strong>Album:</strong> ${song.album}</span>
        `;
        resultItem.addEventListener("click", () => {
            alert(`You selected: ${song.title} by ${song.artist}`);
        });
        results.appendChild(resultItem);
    });
}
