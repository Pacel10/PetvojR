document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const resultsList = document.getElementById("results-list");
  const playlistList = document.getElementById("playlist-list");

  // Example songs and playlists (mock data)
  const songs = [
    { title: "Shape of You", artist: "Ed Sheeran" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "Bad Habits", artist: "Ed Sheeran" },
  ];

  const playlists = {
    "Chill Vibes": ["Shape of You", "Levitating"],
    "Workout Mix": ["Blinding Lights", "Bad Habits"],
    "Top 2024 Hits": ["Shape of You", "Blinding Lights", "Levitating"],
  };

  // Search for songs
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    resultsList.innerHTML = ""; // Clear previous results

    if (!query) {
      resultsList.innerHTML = "<li>Please enter a search term.</li>";
      return;
    }

    const filteredSongs = songs.filter(
      song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    );

    if (filteredSongs.length > 0) {
      filteredSongs.forEach(song => {
        const li = document.createElement("li");
        li.textContent = `${song.title} by ${song.artist}`;
        resultsList.appendChild(li);
      });
    } else {
      resultsList.innerHTML = "<li>No results found.</li>";
    }
  });

  // Show playlist details
  playlistList.addEventListener("click", event => {
    if (event.target.tagName === "LI") {
      const playlistName = event.target.textContent;
      const playlistSongs = playlists[playlistName];

      resultsList.innerHTML = ""; // Clear search results
      if (playlistSongs) {
        playlistSongs.forEach(songTitle => {
          const li = document.createElement("li");
          li.textContent = songTitle;
          resultsList.appendChild(li);
        });
      } else {
        resultsList.innerHTML = "<li>Playlist is empty or unavailable.</li>";
      }
    }
  });
});
