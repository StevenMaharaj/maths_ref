// Interactive quadratic graph widget.
// Draws onto a <canvas> and reacts to sliders, in either:
//   general form  y = ax^2 + bx + c       (sliders a, b, c)
//   vertex form   y = a(x - h)^2 + k      (sliders a, h, k)
// Internally the curve is always evaluated as general-form (a, b, c); vertex
// mode just derives b and c from (a, h, k) before drawing, so switching
// modes mid-way never jumps the curve.

function createQuadraticGraph(container, opts = {}) {
  const defaults = { a: 1, b: 0, c: 0 };
  const state = { ...defaults, ...opts };
  let mode = "general"; // "general" | "vertex"

  const sliderConfig = {
    general: {
      a: { min: -3, max: 3, step: 0.1 },
      b: { min: -10, max: 10, step: 0.5 },
      c: { min: -10, max: 10, step: 0.5 },
    },
    vertex: {
      a: { min: -3, max: 3, step: 0.1 },
      h: { min: -8, max: 8, step: 0.5 },
      k: { min: -8, max: 8, step: 0.5 },
    },
  };

  container.innerHTML = `
    <div class="graph-mode-toggle" role="tablist">
      <button type="button" class="mode-btn active" data-mode="general">y = ax&sup2; + bx + c</button>
      <button type="button" class="mode-btn" data-mode="vertex">y = a(x &minus; h)&sup2; + k</button>
    </div>
    <canvas></canvas>
    <div class="sliders"></div>
    <div class="graph-readout"></div>
    <button type="button" class="graph-reset">Reset</button>
  `;

  const canvas = container.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const readout = container.querySelector(".graph-readout");
  const slidersWrap = container.querySelector(".sliders");
  const modeButtons = container.querySelectorAll(".mode-btn");

  let sliders = {};
  let sliderValues = {};

  // Derived vertex-form params, kept in sync with (a, b, c).
  function getHK() {
    const { a, b, c } = state;
    const h = Math.abs(a) > 1e-9 ? -b / (2 * a) : 0;
    const k = Math.abs(a) > 1e-9 ? c - (b * b) / (4 * a) : c;
    return { h, k };
  }

  function buildSliders() {
    const keys = mode === "general" ? ["a", "b", "c"] : ["a", "h", "k"];
    const labels = mode === "general"
      ? { a: "a", b: "b", c: "c" }
      : { a: "a", h: "h", k: "k" };
    const cfg = sliderConfig[mode];
    const values = mode === "general" ? state : { a: state.a, ...getHK() };

    slidersWrap.innerHTML = keys.map((key) => `
      <div class="slider-row">
        <label for="${container.id}-${key}">${labels[key]}</label>
        <input type="range" id="${container.id}-${key}"
          min="${cfg[key].min}" max="${cfg[key].max}" step="${cfg[key].step}"
          value="${values[key]}">
        <span class="slider-value" data-for="${key}">${values[key].toFixed(1)}</span>
      </div>
    `).join("");

    sliders = {};
    sliderValues = {};
    keys.forEach((key) => {
      sliders[key] = container.querySelector(`#${container.id}-${key}`);
      sliderValues[key] = slidersWrap.querySelector(`.slider-value[data-for="${key}"]`);
      sliders[key].addEventListener("input", () => {
        const val = parseFloat(sliders[key].value);
        sliderValues[key].textContent = val.toFixed(1);
        applySliderChange(key, val);
      });
    });
  }

  // Translate a change in whichever sliders are showing back into (a, b, c).
  function applySliderChange(key, val) {
    if (mode === "general") {
      state[key] = val;
      animateTo({ a: state.a, b: state.b, c: state.c });
      return;
    }
    // vertex mode: current h, k come from sliders (or derive for the untouched ones)
    const current = getHK();
    const a = key === "a" ? val : state.a;
    const h = key === "h" ? val : current.h;
    const k = key === "k" ? val : current.k;
    const b = -2 * a * h;
    const c = a * h * h + k;
    state.a = a;
    state.b = b;
    state.c = c;
    animateTo({ a, b, c });
  }

  function switchMode(newMode) {
    if (newMode === mode) return;
    mode = newMode;
    modeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === mode));
    buildSliders();
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchMode(btn.dataset.mode));
  });

  // Animation state for a smooth morph whenever a slider changes.
  let animFrom = { ...state };
  let animTo = { ...state };
  let animStart = 0;
  const animDuration = 220;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(currentAnimated());
  }

  function currentAnimated() {
    const t = Math.min(1, (performance.now() - animStart) / animDuration);
    const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
    return {
      a: animFrom.a + (animTo.a - animFrom.a) * ease,
      b: animFrom.b + (animTo.b - animFrom.b) * ease,
      c: animFrom.c + (animTo.c - animFrom.c) * ease,
      done: t >= 1,
    };
  }

  function worldToScreen(x, y, w, h, scale) {
    return {
      x: w / 2 + x * scale,
      y: h / 2 - y * scale,
    };
  }

  function draw(vals) {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const { a, b, c } = vals;
    const range = 10; // world units shown roughly on x-axis half-width
    const scale = (w / 2) / range;

    // grid
    ctx.strokeStyle = "#f0f0f3";
    ctx.lineWidth = 1;
    for (let gx = -range; gx <= range; gx++) {
      const p = worldToScreen(gx, 0, w, h, scale);
      ctx.beginPath();
      ctx.moveTo(p.x, 0);
      ctx.lineTo(p.x, h);
      ctx.stroke();
    }
    for (let gy = -range; gy <= range; gy++) {
      const p = worldToScreen(0, gy, w, h, scale);
      ctx.beginPath();
      ctx.moveTo(0, p.y);
      ctx.lineTo(w, p.y);
      ctx.stroke();
    }

    // axes
    ctx.strokeStyle = "#cfd3da";
    ctx.lineWidth = 1.5;
    const origin = worldToScreen(0, 0, w, h, scale);
    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(w, origin.y);
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, h);
    ctx.stroke();

    // axis of symmetry (dashed)
    if (Math.abs(a) > 1e-9) {
      const xVertex = -b / (2 * a);
      const vp = worldToScreen(xVertex, 0, w, h, scale);
      ctx.save();
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = "#d9b3ff";
      ctx.beginPath();
      ctx.moveTo(vp.x, 0);
      ctx.lineTo(vp.x, h);
      ctx.stroke();
      ctx.restore();
    }

    // parabola curve
    ctx.strokeStyle = "#2b59ff";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= w; px += 2) {
      const xWorld = (px - w / 2) / scale;
      const yWorld = a * xWorld * xWorld + b * xWorld + c;
      const sp = worldToScreen(xWorld, yWorld, w, h, scale);
      if (sp.y < -2000 || sp.y > h + 2000) { started = false; continue; }
      if (!started) { ctx.moveTo(sp.x, sp.y); started = true; }
      else ctx.lineTo(sp.x, sp.y);
    }
    ctx.stroke();

    // vertex point
    if (Math.abs(a) > 1e-9) {
      const xVertex = -b / (2 * a);
      const yVertex = a * xVertex * xVertex + b * xVertex + c;
      const vp = worldToScreen(xVertex, yVertex, w, h, scale);
      ctx.fillStyle = "#7c3aed";
      ctx.beginPath();
      ctx.arc(vp.x, vp.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // y-intercept
    const yInt = worldToScreen(0, c, w, h, scale);
    ctx.fillStyle = "#ff7a2b";
    ctx.beginPath();
    ctx.arc(yInt.x, yInt.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // x-intercepts (roots), if real
    const disc = b * b - 4 * a * c;
    if (Math.abs(a) > 1e-9 && disc >= 0) {
      const sq = Math.sqrt(disc);
      const r1 = (-b + sq) / (2 * a);
      const r2 = (-b - sq) / (2 * a);
      ctx.fillStyle = "#16a34a";
      [r1, r2].forEach((r) => {
        const rp = worldToScreen(r, 0, w, h, scale);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    updateReadout(a, b, c, disc);

    if (!vals.done) {
      requestAnimationFrame(() => draw(currentAnimated()));
    }
  }

  function updateReadout(a, b, c, disc) {
    const xVertex = Math.abs(a) > 1e-9 ? (-b / (2 * a)).toFixed(2) : "—";
    const yVertex = Math.abs(a) > 1e-9
      ? (a * (-b / (2 * a)) * (-b / (2 * a)) + b * (-b / (2 * a)) + c).toFixed(2)
      : "—";
    let rootsText = "none (complex)";
    if (Math.abs(a) > 1e-9) {
      if (disc > 1e-9) {
        const sq = Math.sqrt(disc);
        const r1 = (-b + sq) / (2 * a);
        const r2 = (-b - sq) / (2 * a);
        rootsText = `${Math.min(r1, r2).toFixed(2)}, ${Math.max(r1, r2).toFixed(2)}`;
      } else if (Math.abs(disc) <= 1e-9) {
        rootsText = `${(-b / (2 * a)).toFixed(2)} (repeated)`;
      }
    }
    readout.innerHTML = `
      <span>Vertex: <b>(${xVertex}, ${yVertex})</b></span>
      <span>y-intercept: <b>${c.toFixed(1)}</b></span>
      <span>Roots: <b>${rootsText}</b></span>
      <span>&Delta;: <b>${disc.toFixed(2)}</b></span>
    `;
  }

  function animateTo(newVals) {
    animFrom = currentAnimated();
    animTo = { ...animFrom, ...newVals };
    animStart = performance.now();
    requestAnimationFrame(() => draw(currentAnimated()));
  }

  container.querySelector(".graph-reset").addEventListener("click", () => {
    state.a = defaults.a;
    state.b = defaults.b;
    state.c = defaults.c;
    buildSliders();
    animateTo({ ...defaults });
  });

  window.addEventListener("resize", resize);

  buildSliders();

  // initial paint once layout settles
  requestAnimationFrame(resize);

  return { redraw: () => draw(currentAnimated()) };
}
