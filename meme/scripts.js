const searchBtn = document.getElementById("searchBtn");
const memeSearch = document.getElementById("memeSearch");
const memeContainer = document.getElementById("memeContainer");

// Function to fetch memes from the API based on search term
const fetchMemes = async (searchTerm) => {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();

    // Check the structure of the API response
    console.log("API Data:", data);

    // Filter memes based on the search term
    const memes = data.data.memes.filter((meme) =>
      meme.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Clear previous search results
    memeContainer.innerHTML = "";

    // Check if memes are found
    if (memes.length === 0) {
      memeContainer.innerHTML = "<p>No memes found. Try another search.</p>";
      return;
    }

    // Display memes as cards
    memes.forEach((meme) => {
      const memeCard = document.createElement("div");
      memeCard.classList.add("meme-card");

      memeCard.innerHTML = `
        <img src="${meme.url}" alt="${meme.name}" />
        <h3>${meme.name}</h3>
        <p>Width: ${meme.width}px, Height: ${meme.height}px</p>
        <a href="${meme.url}" target="_blank">View Full Meme</a>
      `;

      memeContainer.appendChild(memeCard);
    });
  } catch (error) {
    console.error("Error fetching memes:", error);
    memeContainer.innerHTML =
      "<p>Failed to load memes. Please try again later.</p>";
  }
};

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  const searchTerm = memeSearch.value.trim();
  if (searchTerm) {
    fetchMemes(searchTerm);
  } else {
    alert("Please enter a meme name to search.");
  }
});

// Optional: Trigger search on pressing Enter key
memeSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Fetch all memes on initial page load (optional)
window.addEventListener("load", () => {
  fetchMemes(""); // Empty string will fetch all memes
});
