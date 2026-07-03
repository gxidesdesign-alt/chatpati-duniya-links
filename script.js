const DEFAULT_REDIRECT_URL =
  "https://www.effectivecpmnetwork.com/ax0sp9dn?key=17a1bc7eaea0915028ca7da79b95b0fe";

const videoTitles = [
  "Dost ki mummy ke sath sex",
  "Indian Girl hot snap",
  "dost ki bandi ko choda",
  "behn ke sath ki chudai",
  "hotel bathroom leaked mms",
  "honeymoon me biwi ke sath chudai",
  "Pahadi Girl MMS video",
  "Randi ko choda",
  "Behn aur jiju ka sex Clip",
  "Horny girl Snap",
  "Viral girl mms in bathroom",
  "Bandi ko lita ke choda",
  "Bestfriend ne diya BJ",
  "NRI randi ki chut maari",
  "Thailand me Ladki ko choda",
  "Randi ke sath raat bhar sex kiya",
  "Muslim bhabhi ke sath sex",
  "College Friend sex Clip",
  "Hot Girl Armpits sex",
  "Sexy girl Club Sex",
  "choti behn ke sath chudayi",
  "randi ko lauda chusaya",
  "anjali arora viral mms",
  "bande ne pura din choda",
  "bandi ke mu me mota loda",
  "Viral girl mms 2",
  "pakastani viral mms actor",
  "2 Bull hard Sex",
  "Delhi me ladki ke sath sex",
  "chote bhai ke upar",
  "after honeymoon scenes",
  "Virl pink pussy girl",
  "Shubhashree sahu viral mms",
  "sassy poonam viral mms",
  "poonam pandey bra video",
  "shubhashree perfume bottle girl video",
  "hot girl pune video",
  "behn ki chuchi",
  "dost ko randi bana kr choda",
  "bandi ke sath sex",
  "pune girl viral video",
  "bhojpuri actress viral video",
  "midnight sex craving girl",
  "hot boobs masturbation",
  "hot chick MMS",
  "hot mom ke sath sex",
  "badi behn nikli randi",
  "cute girl viral video",
  "padosan ke sath sex",
  "roommate ke mu me lauda",
];

const videos = Array.from({ length: 50 }, (_, index) => {
  const slotNumber = index + 1;
  const views = 300 + ((slotNumber * 37) % 201);
  const likes = 20 + ((slotNumber * 23) % 81);
  const durationInSeconds = 30 + ((slotNumber * 31) % 90);
  const duration = `${String(Math.floor(durationInSeconds / 60)).padStart(2, "0")}:${String(durationInSeconds % 60).padStart(2, "0")}`;

  return {
    title: videoTitles[index],
    thumbnail: `assets/thumbnails/video-${slotNumber}.webp`,
    channel: "Chatpati Duniya",
    meta: `${views}K views • ${likes}K likes`,
    duration,
    url: DEFAULT_REDIRECT_URL,
  };
});

const videoGrid = document.querySelector("#videoGrid");
const emptyState = document.querySelector("#emptyState");
const searchForm = document.querySelector(".search-shell");
const searchInput = document.querySelector("#searchInput");

function createVideoCard(video, index) {
  const card = document.createElement("button");
  card.className = "video-card";
  card.type = "button";
  card.setAttribute("aria-label", `Open ${video.title}`);

  const thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail";

  const image = document.createElement("img");
  image.src = video.thumbnail;
  image.alt = `${video.title} thumbnail`;
  image.width = 1600;
  image.height = 900;
  image.decoding = "async";
  image.loading = index < 4 ? "eager" : "lazy";
  if (index === 0) image.fetchPriority = "high";
  image.addEventListener("error", () => {
    image.remove();
  });

  const duration = document.createElement("span");
  duration.className = "duration";
  duration.textContent = video.duration;

  thumbnail.append(image, duration);

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

function createSponsoredCard() {
  const card = document.createElement("a");
  card.className = "sponsored-card";
  card.href = DEFAULT_REDIRECT_URL;
  card.target = "_blank";
  card.rel = "sponsored noopener noreferrer";
  card.setAttribute("aria-label", "Open sponsored link");

  const visual = document.createElement("div");
  visual.className = "sponsored-visual";

  const label = document.createElement("span");
  label.className = "sponsored-card-label";
  label.textContent = "Advertisement";

  const message = document.createElement("strong");
  message.textContent = "Featured sponsor";

  const action = document.createElement("span");
  action.className = "sponsored-card-action";
  action.textContent = "Visit sponsor ↗";

  visual.append(label, message, action);
  card.append(visual);
  return card;
}

function renderVideos(list) {
  const cards = [];

  list.forEach((video, index) => {
    cards.push(createVideoCard(video, index));
    if ((index + 1) % 10 === 0 && index < list.length - 1) {
      cards.push(createSponsoredCard());
    }
  });

  videoGrid.replaceChildren(...cards);
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
