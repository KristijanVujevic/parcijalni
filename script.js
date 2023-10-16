document.addEventListener("DOMContentLoaded", function () {
  const searchTermInput = document.getElementById("searchTerm");
  const resultsDiv = document.getElementById("results");
  const loader = document.getElementById("loader");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  let currentPage = 1;
  let debounceTimer;

  function fetchData() {
    loader.style.display = "block";
    const searchTerm = searchTermInput.value.trim();

    if (searchTerm === "") {
      loader.style.display = "none";
      resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
      return;
    }

    const apiUrl = `https://itunes.apple.com/search?term=${searchTerm}&limit=10&offset=${
      (currentPage - 1) * 10
    }`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        loader.style.display = "none";
        displayResults(data);
      })
      .catch((error) => {
        loader.style.display = "none";
        displayError(error);
      });
  }

  function displayResults(data) {
    resultsDiv.innerHTML = "";

    if (data && data.results && data.results.length > 0) {
      const table = document.createElement("table");
      table.classList.add("slideInTable");

      data.results.forEach((result, index) => {
        const row = table.insertRow();
        row.classList.add("slideInRow");
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
        row.style.animationDelay = `${0.1 * index}s`;
        resultsDiv.appendChild(table);
      });
    } else {
      resultsDiv.innerHTML = "<p>No results found.</p>";
    }
  }

  function displayError(error) {
    resultsDiv.innerHTML = `<p>Something went wrong: ${error.message}</p>`;
  }

  function debounceSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fetchData, 500);
  }

  searchTermInput.addEventListener("input", debounceSearch);

  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      fetchData();
    }
  });

  nextButton.addEventListener("click", function () {
    currentPage++;
    fetchData();
  });
});
