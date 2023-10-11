document.addEventListener("DOMContentLoaded", function () {
  const searchTermInput = document.getElementById("searchTerm");
  const searchEntityInput = document.getElementById("searchEntity");
  const resultsDiv = document.getElementById("results");
  const searchButton = document.getElementById("searchButton");
  const loader = document.getElementById("loader");

  searchButton.addEventListener("click", function () {
    // Show loader when search starts
    loader.style.display = "block";

    const searchTerm = searchTermInput.value;
    const searchEntity = searchEntityInput.value;
    const apiUrl = `https://itunes.apple.com/search?term=${searchTerm}&entity=${searchEntity}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Pause for 1 second (1000 milliseconds)
        setTimeout(() => {
          // Hide loader after pause
          loader.style.display = "none";
          // Handle the API response data here
          displayResults(data);
          // Clear input fields after displaying results
          searchTermInput.value = "";
          searchEntityInput.value = "";
        }, 1000);
      })
      .catch((error) => {
        // Hide loader in case of error
        loader.style.display = "none";
        displayError(error);
      });
  });

  function displayResults(data) {
    resultsDiv.innerHTML = ""; // Clear previous results

    if (data && data.results && data.results.length > 0) {
      const table = document.createElement("table");

      data.results.forEach((result) => {
        const row = table.insertRow();
        row.insertCell().textContent = result.artistName;
        row.insertCell().textContent = result.trackName;
        row.insertCell().innerHTML = `<audio controls><source src="${result.previewUrl}" type="audio/mpeg"></audio>`;
        row.insertCell().textContent = result.collectionName;

        const artworkCell = row.insertCell();
        const img = document.createElement("img");
        img.src = result.artworkUrl100;
        img.width = 150;
        img.height = 150;
        artworkCell.appendChild(img);
      });

      resultsDiv.appendChild(table);
    } else {
      resultsDiv.innerHTML = "<p>No results found.</p>";
    }
  }

  function displayError(error) {
    resultsDiv.innerHTML = `<p>Something went wrong: ${error.message}</p>`;
  }
});
