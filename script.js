const eventDetails = {
  shortTitle: "Hana",
  kicker: "Jeni të ftuar",
  title: "Hana's Bride to Be Party",
  couple: "Bridal Shower",
  intro:
    "Ejani të festojmë Hanën me një pasdite të ëmbël, elegante dhe plot kujtime të bukura.",
  message:
    "Tema është baby pink. Vishuni bukur, sillni energjinë më të mirë dhe bëhuni gati për një festë të paharrueshme.",
  footer: "Mezi presim të festojmë me ju.",
  partyDate: "2026-06-11T16:00:00+02:00",
  weddingDate: "2026-06-11T16:00:00+02:00",
  weekday: "E enjte",
  displayDate: "11 qershor",
  displayTime: "Nga ora 16:00",
  venue: "Lokacioni",
  address: "Hapeni lokacionin në Google Maps",
  mapTitle: "Lokacioni i festës",
  mapUrl: "https://maps.app.goo.gl/fDBL8BHfCVdxiJM79",
  schedule: [
    {
      time: "16:00",
      title: "Mirëpritja",
      description: "Mblidhemi, përshëndetemi dhe nisim festën me foto e pije.",
    },
    {
      time: "17:00",
      title: "Momenti për Hanën",
      description: "Një moment special për nusen e ardhshme dhe kujtime të bukura bashkë.",
    },
    {
      time: "18:00",
      title: "Ushqim dhe ëmbëlsira",
      description: "Shijojmë ushqimin, ëmbëlsirat dhe bisedat me njerëzit më të dashur.",
    },
    {
      time: "19:00",
      title: "Festë",
      description: "Muzikë, vallëzim dhe një dolli për Hanën.",
    },
  ],
};

const textTargets = document.querySelectorAll("[data-event]");

textTargets.forEach((target) => {
  const key = target.dataset.event;
  if (eventDetails[key]) {
    target.textContent = eventDetails[key];
  }
});

const timeline = document.querySelector("#timeline");

eventDetails.schedule.forEach((item) => {
  const row = document.createElement("li");
  row.innerHTML = `
    <time>${item.time}</time>
    <article>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `;
  timeline.appendChild(row);
});

const mapLink = document.querySelector("#mapLink");
const mapPreview = document.querySelector("#mapPreview");

mapLink.href = eventDetails.mapUrl;
mapPreview.href = eventDetails.mapUrl;

const calendarLink = document.querySelector("#calendarLink");
const partyStart = new Date(eventDetails.partyDate);
const partyEnd = new Date(partyStart.getTime() + 5 * 60 * 60 * 1000);

const toCalendarStamp = (date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const calendarParams = new URLSearchParams({
  action: "TEMPLATE",
  text: eventDetails.title,
  dates: `${toCalendarStamp(partyStart)}/${toCalendarStamp(partyEnd)}`,
  details: eventDetails.intro,
  location: `${eventDetails.venue}, ${eventDetails.address}`,
});

calendarLink.href = `https://calendar.google.com/calendar/render?${calendarParams.toString()}`;
calendarLink.target = "_blank";
calendarLink.rel = "noreferrer";

const countdownIds = ["days", "hours", "minutes", "seconds"];
const countdownNodes = Object.fromEntries(
  countdownIds.map((id) => [id, document.querySelector(`#${id}`)])
);
const weddingDate = new Date(eventDetails.weddingDate);

function updateCountdown() {
  const now = new Date();
  const distance = Math.max(0, weddingDate - now);
  const seconds = Math.floor(distance / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  countdownNodes.days.textContent = String(days).padStart(2, "0");
  countdownNodes.hours.textContent = String(hours).padStart(2, "0");
  countdownNodes.minutes.textContent = String(minutes).padStart(2, "0");
  countdownNodes.seconds.textContent = String(remainingSeconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (event) => {
  glow.style.opacity = "1";
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

window.addEventListener("pointerleave", () => {
  glow.style.opacity = "0";
});
