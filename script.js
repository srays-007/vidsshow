const PASSWORD = "lermein";

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    document.getElementById("password-protect").style.display = "none";
    document.getElementById("content").style.display = "block";
    loadVideos();
  } else {
    alert("Incorrect password");
  }
}

async function loadVideos() {
  const res = await fetch("videos.json");
  const videos = await res.json();
  const gallery = document.getElementById("video-gallery");
  videos.forEach(video => {
    const div = document.createElement("div");
    div.innerHTML = `
      <a href="${video.url}" target="_blank">
        <img src="${video.thumbnail}" width="200">
        <p>${video.title}</p>
      </a>`;
    gallery.appendChild(div);
  });
}

document.getElementById("add-video-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("video-url").value;
  const category = document.getElementById("video-category").value;

  const res = await fetch("/api/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
