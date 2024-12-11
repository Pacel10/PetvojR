// URL to fetch files from Centova Cast's media directory
const MEDIA_URL = "https://control.internet-radio.com:2199/client/index.php?page=filemanager&path=media/";

// Allowed audio file types
const ALLOWED_EXTENSIONS = [".mp3", ".m4a"];

// Fetch and display songs dynamically
async function fetchMediaFiles() {
    try {
        // Fetch HTML of the directory page
        const response = await fetch(MEDIA_URL);
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(await response.text(), "text/html");

        // Get all links and filter by file extensions
        const files = Array.from(htmlDoc.querySelectorAll("a"))
            .map(link => link.getAttribute("href"))
            .filter(file => ALLOWED_EXTENSIONS.some(ext => file.endsWith(ext)));

        return files;
    } catch (error) {
        console.error("Error fetching media files:", error);
        return [];
    }
}

// Populate the song list
async function displaySongs() {
    const songList = document.getElementById("songs");
    const audioPlayer = document.getElementById("audio-player");

    const songs = await fetchMediaFiles();
    songs.forEach(song => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `${MEDIA_URL}${song}`;
        link.textContent = decodeURIComponent(song);
        link.addEventListener("click", event => {
            event.preventDefault();
            audioPlayer.src = link.href;
            audioPlayer.play();
        });
        li.appendChild(link);
        songList.appendChild(li);
    });
}

// Initialize song list
displaySongs();
