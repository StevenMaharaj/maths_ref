// Renders window.MATH_TOPICS into accordion cards and wires up interactions.

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

function buildTopic(topic) {
  const el = document.createElement("div");
  el.className = "topic";
  el.id = `topic-${topic.id}`;

  el.innerHTML = `
    <button class="topic-header" type="button" aria-expanded="false">
      <span>
        <div>${topic.title}</div>
      </span>
      <span class="chevron"></span>
    </button>
    <div class="topic-body-wrap">
      <div class="topic-body-inner">
        <div class="topic-body"></div>
      </div>
    </div>
  `;

  const body = el.querySelector(".topic-body");
  const sectionEls = [];

  // Table of contents chips
  const toc = document.createElement("div");
  toc.className = "toc";
  topic.sections.forEach((section, i) => {
    const anchor = `sec-${topic.id}-${i}`;
    const link = document.createElement("a");
    link.href = `#${anchor}`;
    link.textContent = section.heading.replace(/^\d+\.\s*/, "");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    toc.appendChild(link);
  });
  body.appendChild(toc);

  topic.sections.forEach((section, i) => {
    const sectionEl = document.createElement("div");
    sectionEl.className = "section";
    sectionEl.id = `sec-${topic.id}-${i}`;
    sectionEl.innerHTML = `<h3>${section.heading}</h3>${section.html}`;
    body.appendChild(sectionEl);
    sectionEls.push({ el: sectionEl, section });
  });

  const header = el.querySelector(".topic-header");
  header.addEventListener("click", () => {
    const willOpen = !el.classList.contains("open");
    el.classList.toggle("open");
    header.setAttribute("aria-expanded", String(willOpen));

    if (willOpen && !el.dataset.rendered) {
      el.dataset.rendered = "true";
      // Run any widget-mounting callbacks once, after the DOM is in the document.
      sectionEls.forEach(({ el: sectionEl, section }) => {
        if (typeof section.afterRender === "function") {
          section.afterRender(sectionEl);
        }
      });
      renderMathIn(body);
    }
  });

  return el;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("topics-container");
  const topics = window.MATH_TOPICS || [];

  topics.forEach((topic, idx) => {
    const topicEl = buildTopic(topic);
    topicEl.style.animationDelay = `${idx * 0.08}s`;
    container.appendChild(topicEl);
  });

  // Auto-open the first topic so there's something to see immediately.
  const first = container.querySelector(".topic");
  if (first) first.querySelector(".topic-header").click();
});
