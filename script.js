const DEFAULT_REDIRECT_URL =
  "https://www.effectivecpmnetwork.com/t0m145b9yu?key=ac68ab4a64ab8250d289874d21b65980";

const videos = Array.from({ length: 50 }, (_, index) => {
  const slotNumber = index + 1;

  return {
    title: `Video slot ${slotNumber} - add title later`,
    thumbnail: `assets/thumbnails/video-${slotNumber}.jpg`,
    channel: "Chatpati Duniya",
    meta: "Description will be added later",
    duration: "--:--",
    url: DEFAULT_REDIRECT_URL,
  };
});

const videoGrid = document.querySelector("#videoGrid");
const emptyState = document.querySelector("#emptyState");
const searchForm = document.querySelector(".search-shell");
const searchInput = document.querySelector("#searchInput");

function createVideoCard(video) {
  const card = document.createElement("button");
  card.className = "video-card";
  card.type = "button";
  card.setAttribute("aria-label", `Open ${video.title}`);

  const thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail";

  const fallback = document.createElement("div");
  fallback.className = "thumbnail-fallback";
  fallback.textContent = "Drop thumbnail image here";

  const image = document.createElement("img");
  image.src = video.thumbnail;
  image.alt = "";
  image.loading = "lazy";
  image.addEventListener("load", () => {
    fallback.hidden = true;
  });
  image.addEventListener("error", () => {
    image.remove();
  });

  const duration = document.createElement("span");
  duration.className = "duration";
  duration.textContent = video.duration;

  thumbnail.append(fallback, image, duration);

  const copy = document.createElement("div");
  copy.className = "video-copy";

  const details = document.createElement("div");

  const title = document.createElement("h2");
  title.className = "video-title";
  title.textContent = video.title;

  const channel = document.createElement("p");
  channel.className = "video-channel";
  channel.textContent = video.channel;

  const meta = document.createElement("p");
  meta.className = "video-meta";
  meta.textContent = video.meta;

  details.append(title, channel, meta);
  copy.append(details);
  card.append(thumbnail, copy);

  card.addEventListener("click", () => {
    window.location.href = video.url || DEFAULT_REDIRECT_URL;
  });

  return card;
}

function renderVideos(list) {
  videoGrid.replaceChildren(...list.map(createVideoCard));
  emptyState.hidden = list.length > 0;
}

function filterVideos(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return videos;
  }

  return videos.filter((video) => {
    const searchableText = `${video.title} ${video.channel} ${video.meta}`;
    return searchableText.toLowerCase().includes(normalizedQuery);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderVideos(filterVideos(searchInput.value));
});

searchInput.addEventListener("input", () => {
  renderVideos(filterVideos(searchInput.value));
});

renderVideos(videos);
