// Renders window.MATH_TOPICS into the sidebar nav + reading column,
// and handles view switching between the home hero and a topic's content.

function renderMathIn(el) {
  if (window.renderMathInElement) {
    renderMathInElement(el, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  }
}
window.renderMathIn = renderMathIn;

function buildTopicPage(topic) {
  const page = document.createElement("article");
  page.className = "topic-page";
  page.id = `topic-${topic.id}`;
  page.hidden = true;

  const toc = topic.sections.map((section, i) => {
    const anchor = `sec-${topic.id}-${i}`;
    const label = section.heading.replace(/^\d+\.\s*/, "");
    return `<a href="#${anchor}" class="toc-chip" data-anchor="${anchor}">${label}</a>`;
  }).join("");

  const sections = topic.sections.map((section, i) => `
    <section class="section card" id="sec-${topic.id}-${i}">
      <h3>${section.heading}</h3>
      ${section.html}
    </section>
  `).join("");

  page.innerHTML = `
    <header class="topic-page-header">
      <p class="hero-kicker">topic quest</p>
      <h2 class="topic-page-title">${topic.title}</h2>
      <p class="topic-page-blurb">${topic.blurb || ""}</p>
    </header>
    <nav class="toc" aria-label="Sections in ${topic.title}">${toc}</nav>
    <div class="topic-sections">${sections}</div>
  `;

  page.querySelectorAll(".toc-chip").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById(link.dataset.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  return page;
}

function buildNavItem(topic) {
  const li = document.createElement("li");
  li.className = "topic-nav-item";
  li.innerHTML = `
    <a href="#${topic.id}" class="topic-nav-link" data-nav="${topic.id}">
      <span class="nav-link-title">${topic.title}</span>
      <span class="nav-link-arrow" aria-hidden="true">&rarr;</span>
    </a>
  `;
  return li;
}

document.addEventListener("DOMContentLoaded", () => {
  const topics = window.MATH_TOPICS || [];
  const navList = document.getElementById("topic-list");
  const topicsContainer = document.getElementById("topics-container");
  const homeSection = document.getElementById("home");
  const benefitsSection = document.getElementById("benefits");
  const ctaSection = document.querySelector(".final-cta");
  const navLinks = document.querySelectorAll('[data-nav]');
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarScrim = document.getElementById("sidebar-scrim");

  const pagesById = {};

  topics.forEach((topic, idx) => {
    navList.appendChild(buildNavItem(topic));
    const page = buildTopicPage(topic);
    page.style.animationDelay = `${idx * 0.05}s`;
    topicsContainer.appendChild(page);
    pagesById[topic.id] = { topic, page, rendered: false };
  });

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === id);
    });
  }

  function showHome() {
    homeSection.hidden = false;
    benefitsSection.hidden = false;
    ctaSection.hidden = false;
    Object.values(pagesById).forEach(({ page }) => { page.hidden = true; });
    setActiveNav("home");
    closeMobileSidebar();
  }

  function showTopic(id) {
    const entry = pagesById[id];
    if (!entry) { showHome(); return; }

    homeSection.hidden = true;
    benefitsSection.hidden = true;
    ctaSection.hidden = true;
    Object.values(pagesById).forEach(({ page }) => { page.hidden = true; });
    entry.page.hidden = false;

    if (!entry.rendered) {
      entry.rendered = true;
      entry.topic.sections.forEach((section, i) => {
        if (typeof section.afterRender === "function") {
          const sectionEl = document.getElementById(`sec-${id}-${i}`);
          section.afterRender(sectionEl);
        }
      });
      renderMathIn(entry.page);
    }

    setActiveNav(id);
    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function routeFromHash() {
    const id = location.hash.replace("#", "");
    if (!id || id === "home" || id === "benefits") {
      showHome();
    } else if (pagesById[id]) {
      showTopic(id);
    } else {
      showHome();
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.dataset.nav;
      if (id === "home") {
        e.preventDefault();
        location.hash = "";
        showHome();
      } else if (pagesById[id]) {
        e.preventDefault();
        location.hash = id;
        showTopic(id);
      }
      // other hash links (e.g. #benefits) fall through to default anchor behaviour
    });
  });

  window.addEventListener("hashchange", routeFromHash);

  // ---------- Mobile sidebar ----------
  function openMobileSidebar() {
    sidebar.classList.add("open");
    sidebarToggle.setAttribute("aria-expanded", "true");
    sidebarScrim.classList.add("visible");
  }
  function closeMobileSidebar() {
    sidebar.classList.remove("open");
    sidebarToggle.setAttribute("aria-expanded", "false");
    sidebarScrim.classList.remove("visible");
  }
  sidebarToggle.addEventListener("click", () => {
    if (sidebar.classList.contains("open")) closeMobileSidebar();
    else openMobileSidebar();
  });
  sidebarScrim.addEventListener("click", closeMobileSidebar);

  routeFromHash();
});
