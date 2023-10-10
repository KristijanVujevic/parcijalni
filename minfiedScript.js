document.addEventListener("DOMContentLoaded", function () {
  let e = document.getElementById("searchTerm"),
    t = document.getElementById("searchEntity"),
    n = document.getElementById("results"),
    l = document.getElementById("searchButton"),
    s = document.getElementById("loader");
  l.addEventListener("click", function () {
    s.style.display = "block";
    let l = e.value,
      r = t.value,
      a = `https://itunes.apple.com/search?term=${l}&entity=${r}`;
    fetch(a)
      .then((e) => e.json())
      .then((l) => {
        setTimeout(() => {
          (s.style.display = "none"),
            (function e(t) {
              if (
                ((n.innerHTML = ""), t && t.results && t.results.length > 0)
              ) {
                let l = document.createElement("table");
                t.results.forEach((e) => {
                  let t = l.insertRow();
                  (t.insertCell().textContent = e.artistName),
                    (t.insertCell().textContent = e.trackName),
                    (t.insertCell().innerHTML = `<audio controls><source src="${e.previewUrl}" type="audio/mpeg"></audio>`),
                    (t.insertCell().textContent = e.collectionName);
                }),
                  n.appendChild(l);
              } else n.innerHTML = "<p>No results found.</p>";
            })(l),
            (e.value = ""),
            (t.value = "");
        }, 1e3);
      })
      .catch((e) => {
        var t;
        (s.style.display = "none"),
          (t = e),
          (n.innerHTML = `<p>Something went wrong: ${t.message}</p>`);
      });
  });
});
