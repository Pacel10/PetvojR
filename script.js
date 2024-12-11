document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const resultsList = document.getElementById("results-list");
  const playlistList = document.getElementById("playlist-list");

  // Search for songs using Centova Cast widget
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    resultsList.innerHTML = ""; // Clear previous results

    if (!query) {
      resultsList.innerHTML = "<li>Please enter a search term.</li>";
      return;
    }

    // Trigger Centova Cast request search widget
    const searchWidget = document.querySelector(".cc_requests");
    if (searchWidget) {
      searchWidget.setAttribute("data-query", query);

      // Allow Centova Cast widget to handle the search
      const searchEvent = new Event("change");
      searchWidget.dispatchEvent(searchEvent);
    } else {
      resultsList.innerHTML = "<li>Search widget is not configured correctly.</li>";
    }
  });

  // Show playlist details (Centova Cast On-Demand Widget)
  playlistList.addEventListener("click", event => {
    if (event.target.tagName === "LI") {
      const playlistName = event.target.textContent;
      const playlistWidget = document.querySelector(".cc_ondemand_content");

      resultsList.innerHTML = ""; // Clear search results
      if (playlistWidget) {
        playlistWidget.setAttribute("data-query", playlistName);

        // Allow Centova Cast widget to handle the playlist display
        const playlistEvent = new Event("change");
        playlistWidget.dispatchEvent(playlistEvent);
      } else {
        resultsList.innerHTML = "<li>Playlist widget is not configured correctly.</li>";
      }
    }
  });
});
