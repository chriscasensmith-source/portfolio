/* Reveal: images wipe in once, the approach rail draws once. Content is visible without JS. */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-in");
    io.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

/* Header rule appears once the page has moved */
const header = document.querySelector(".top");
const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Workshops: one open item per series */
document.querySelectorAll(".series").forEach((series) => {
  series.addEventListener("toggle", (e) => {
    if (!e.target.open) return;
    series.querySelectorAll("details[open]").forEach((d) => { if (d !== e.target) d.open = false; });
  }, true);
});

/* Voice agent sample */
const lines = {
  en: [
    "Yeah, I know I've been late a few times. I'm not trying to make it a habit.",
    "I know I've been a little late, but I still get my work done. Other people are late too, so I don't get why this is suddenly a big deal.",
    "So I'm the one getting written up? Four years I've kept that line running. Go talk to everybody else who walks in late first.",
  ],
  es: [
    "Sí, ya sé que he llegado tarde algunas veces. No quiero que se vuelva costumbre.",
    "Sé que he llegado un poco tarde, pero igual hago mi trabajo. Otros también llegan tarde, así que no entiendo por qué de repente es un problema.",
    "¿Entonces al que van a reportar es a mí? Llevo cuatro años sacando adelante esa línea. Primero hable con todos los demás que llegan tarde.",
  ],
};
let lang = "en";
let sev = 1;
const lineEl = document.getElementById("voiceLine");
const wave = document.getElementById("wave");
for (let i = 0; i < 56; i++) {
  const bar = document.createElement("i");
  bar.style.setProperty("--d", `${(i % 11) * 0.08}s`);
  bar.style.setProperty("--h", `${18 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.31)) * 82}%`);
  wave.appendChild(bar);
}
const renderVoice = () => {
  lineEl.textContent = `“${lines[lang][sev]}”`;
  lineEl.lang = lang;
  wave.dataset.sev = sev;
  lineEl.classList.remove("is-new");
  void lineEl.offsetWidth;
  lineEl.classList.add("is-new");
};
document.querySelectorAll(".voice-demo .seg button").forEach((b) => {
  b.addEventListener("click", () => {
    b.parentElement.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    if (b.dataset.lang) lang = b.dataset.lang;
    if (b.dataset.sev) sev = Number(b.dataset.sev);
    renderVoice();
  });
});
renderVoice();
