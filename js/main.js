// ── Render helpers ──

function emptyState(text) {
  return `<p class="empty-state">${text}</p>`;
}

function renderGames() {
  const grid = document.getElementById("games-grid");
  if (!games.length) { grid.innerHTML = emptyState("No games yet."); return; }
  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-title">${game.title}</div>
      <div class="card-meta">${game.year}</div>
      <div class="card-desc">${game.description}</div>
      <div class="tags">${game.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      ${game.url ? `<a class="card-link" href="${game.url}" target="_blank" rel="noopener">Play →</a>` : ""}
    `;
    grid.appendChild(card);
  });
}

function renderLectures() {
  const grid = document.getElementById("lectures-grid");
  if (!lectures.length) { grid.innerHTML = emptyState("No lectures yet."); return; }
  lectures.forEach(lecture => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-title">${lecture.title}</div>
      <div class="card-meta">${lecture.platform} · ${lecture.year}</div>
      <div class="card-desc">${lecture.description}</div>
      <div class="tags"><span class="tag">${lecture.topic}</span></div>
      ${lecture.url ? `<a class="card-link" href="${lecture.url}" target="_blank" rel="noopener">Watch →</a>` : ""}
    `;
    grid.appendChild(card);
  });
}

function renderSites() {
  const grid = document.getElementById("sites-grid");
  if (!sites.length) { grid.innerHTML = emptyState("No sites yet."); return; }
  sites.forEach(site => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-title">${site.name}</div>
      ${site.tagline ? `<div class="card-tagline">${site.tagline}</div>` : ""}
      <div class="card-meta">${site.year}</div>
      <div class="card-desc">${site.description}</div>
      <div class="tags">${site.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      ${site.url ? `<a class="card-link" href="${site.url}" ${site.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>Visit →</a>` : ""}
    `;
    grid.appendChild(card);
  });
}

// ── Back to top ──

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 300);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── Active nav on scroll ──

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => observer.observe(s));

// ── Hamburger menu ──

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("main-nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  });
});

// ── Init ──

renderGames();
renderLectures();
renderSites();
