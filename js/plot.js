// Generic interactive plotter.
// Unlike js/graph.js (which is specific to y = ax^2 + bx + c), this takes a
// config describing sliders and a scene function, and redraws on every input:
//
//   createPlot(container, {
//     xRange: [-6, 6], yRange: [-10, 10],       // default view window
//     xLabel: "x", yLabel: "y",                  // optional axis titles
//     sliders: [{ key, label, min, max, step, value }],
//     selects: [{ key, label, options: [{ value, label }], value }],
//     scene(state) -> {
//       curves: [{ fn, color, width, dash, from, to }],
//       points: [{ x, y, color, r, label }],
//       vlines: [{ x, color, dash }],
//       hlines: [{ y, color, dash }],
//       xRange, yRange                           // optional per-frame override
//     },
//     readout(state) -> html string,             // short key facts under the graph
//     extra(state)   -> html string,             // longer working-out panel (may contain $math$)
//     math: true                                 // re-run KaTeX on readout/extra after each update
//   });

(function () {
  const COLORS = {
    curve: "#2b59ff",
    ref: "#9aa0ad",
    vertex: "#7c3aed",
    yint: "#ff7a2b",
    xint: "#16a34a",
    line: "#ff5c7a",
    asym: "#d9b3ff",
    ink: "#111111",
    grid: "#f0f0f3",
    axis: "#cfd3da",
    halo: "#fff8de",
  };

  function niceStep(span, target) {
    const raw = span / target;
    const pow = Math.pow(10, Math.floor(Math.log10(raw)));
    const n = raw / pow;
    const m = n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10;
    return m * pow;
  }

  function fmtTick(v) {
    return Math.abs(v) < 1e-9 ? "0" : String(+v.toFixed(6));
  }

  function decimalsFor(step) {
    const s = String(step);
    return s.includes(".") ? s.split(".")[1].length : 0;
  }

  let uid = 0;

  function createPlot(container, cfg) {
    uid += 1;
    const base = container.id || `plot-${uid}`;
    container.id = base;

    const state = {};
    (cfg.sliders || []).forEach((s) => { state[s.key] = s.value; });
    (cfg.selects || []).forEach((s) => { state[s.key] = s.value !== undefined ? s.value : s.options[0].value; });

    container.innerHTML = `
      <div class="plot-controls"></div>
      <canvas></canvas>
      <div class="sliders"></div>
      <div class="graph-readout"></div>
      ${cfg.extra ? '<div class="plot-extra"></div>' : ""}
      <button type="button" class="graph-reset">Reset</button>
    `;

    const canvas = container.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const controlsWrap = container.querySelector(".plot-controls");
    const slidersWrap = container.querySelector(".sliders");
    const readout = container.querySelector(".graph-readout");
    const extra = container.querySelector(".plot-extra");
    let lastReadout = "";
    let lastExtra = "";

    function buildSelects() {
      controlsWrap.innerHTML = (cfg.selects || []).map((s) => `
        <label class="plot-select">
          <span>${s.label}</span>
          <select data-key="${s.key}">
            ${s.options.map((o) => `<option value="${o.value}"${o.value === state[s.key] ? " selected" : ""}>${o.label}</option>`).join("")}
          </select>
        </label>
      `).join("");
      controlsWrap.hidden = !(cfg.selects && cfg.selects.length);
      controlsWrap.querySelectorAll("select").forEach((sel) => {
        sel.addEventListener("change", () => {
          state[sel.dataset.key] = sel.value;
          draw();
        });
      });
    }

    function buildSliders() {
      slidersWrap.innerHTML = (cfg.sliders || []).map((s) => {
        const dec = decimalsFor(s.step);
        return `
          <div class="slider-row">
            <label for="${base}-${s.key}">${s.label}</label>
            <input type="range" id="${base}-${s.key}" min="${s.min}" max="${s.max}" step="${s.step}" value="${state[s.key]}">
            <span class="slider-value" data-for="${s.key}">${Number(state[s.key]).toFixed(dec)}</span>
          </div>
        `;
      }).join("");
      slidersWrap.hidden = !(cfg.sliders && cfg.sliders.length);
      (cfg.sliders || []).forEach((s) => {
        const input = slidersWrap.querySelector(`#${base}-${s.key}`);
        const label = slidersWrap.querySelector(`.slider-value[data-for="${s.key}"]`);
        const dec = decimalsFor(s.step);
        input.addEventListener("input", () => {
          const v = parseFloat(input.value);
          state[s.key] = v;
          label.textContent = v.toFixed(dec);
          draw();
        });
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function drawText(text, x, y, color, align, size) {
      ctx.font = `600 ${size || 11}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = align || "left";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 3;
      ctx.strokeStyle = COLORS.halo;
      ctx.strokeText(text, x, y);
      ctx.fillStyle = color || COLORS.ink;
      ctx.fillText(text, x, y);
    }

    function paint() {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h) return;

      const scene = cfg.scene(state);
      const xr = scene.xRange || cfg.xRange;
      const yr = scene.yRange || cfg.yRange;
      const sx = w / (xr[1] - xr[0]);
      const sy = h / (yr[1] - yr[0]);
      const toX = (x) => (x - xr[0]) * sx;
      const toY = (y) => h - (y - yr[0]) * sy;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.clip();

      // grid
      const xs = niceStep(xr[1] - xr[0], 12);
      const ys = niceStep(yr[1] - yr[0], 8);
      ctx.lineWidth = 1;
      ctx.strokeStyle = COLORS.grid;
      for (let gx = Math.ceil(xr[0] / xs) * xs; gx <= xr[1] + 1e-9; gx += xs) {
        ctx.beginPath(); ctx.moveTo(toX(gx), 0); ctx.lineTo(toX(gx), h); ctx.stroke();
      }
      for (let gy = Math.ceil(yr[0] / ys) * ys; gy <= yr[1] + 1e-9; gy += ys) {
        ctx.beginPath(); ctx.moveTo(0, toY(gy)); ctx.lineTo(w, toY(gy)); ctx.stroke();
      }

      // axes
      ctx.strokeStyle = COLORS.axis;
      ctx.lineWidth = 1.5;
      const ox = Math.min(Math.max(toX(0), 0), w);
      const oy = Math.min(Math.max(toY(0), 0), h);
      ctx.beginPath();
      ctx.moveTo(0, oy); ctx.lineTo(w, oy);
      ctx.moveTo(ox, 0); ctx.lineTo(ox, h);
      ctx.stroke();

      // tick labels
      for (let gx = Math.ceil(xr[0] / xs) * xs; gx <= xr[1] + 1e-9; gx += xs) {
        if (Math.abs(gx) < 1e-9) continue;
        if (toX(gx) < 16 || toX(gx) > w - 16) continue; // would be clipped at the edge
        drawText(fmtTick(gx), toX(gx), Math.min(oy + 10, h - 7), "#6b7280", "center", 10);
      }
      for (let gy = Math.ceil(yr[0] / ys) * ys; gy <= yr[1] + 1e-9; gy += ys) {
        if (Math.abs(gy) < 1e-9) continue;
        if (toY(gy) < 22 || toY(gy) > h - 10) continue; // top gap leaves room for the y label
        const onLeft = ox > w - 28;
        drawText(fmtTick(gy), onLeft ? ox - 5 : Math.max(ox + 5, 3), toY(gy), "#6b7280", onLeft ? "right" : "left", 10);
      }
      if (cfg.xLabel) drawText(cfg.xLabel, w - 6, Math.max(oy - 12, 8), COLORS.ink, "right", 12);
      if (cfg.yLabel) drawText(cfg.yLabel, Math.min(ox + 8, w - 20), 10, COLORS.ink, "left", 12);

      // reference lines
      (scene.vlines || []).forEach((l) => {
        ctx.save();
        ctx.setLineDash(l.dash === false ? [] : [4, 5]);
        ctx.strokeStyle = l.color || COLORS.asym;
        ctx.lineWidth = l.width || 1.75;
        ctx.beginPath(); ctx.moveTo(toX(l.x), 0); ctx.lineTo(toX(l.x), h); ctx.stroke();
        ctx.restore();
      });
      (scene.hlines || []).forEach((l) => {
        ctx.save();
        ctx.setLineDash(l.dash === false ? [] : [4, 5]);
        ctx.strokeStyle = l.color || COLORS.asym;
        ctx.lineWidth = l.width || 1.75;
        ctx.beginPath(); ctx.moveTo(0, toY(l.y)); ctx.lineTo(w, toY(l.y)); ctx.stroke();
        ctx.restore();
      });

      // curves
      (scene.curves || []).forEach((c) => {
        ctx.save();
        ctx.strokeStyle = c.color || COLORS.curve;
        ctx.lineWidth = c.width || 2.5;
        ctx.lineJoin = "round";
        if (c.dash) ctx.setLineDash(c.dash);
        ctx.beginPath();
        let started = false;
        let lastPy = 0;
        for (let px = 0; px <= w; px += 1.5) {
          const x = xr[0] + px / sx;
          if ((c.from !== undefined && x < c.from) || (c.to !== undefined && x > c.to)) { started = false; continue; }
          const y = c.fn(x);
          if (!Number.isFinite(y)) { started = false; continue; }
          const py = toY(y);
          if (Math.abs(py) > 1e5) { started = false; continue; }
          // break the stroke across vertical asymptotes
          if (started && Math.abs(py - lastPy) > h * 1.5) started = false;
          if (!started) { ctx.moveTo(px, py); started = true; } else { ctx.lineTo(px, py); }
          lastPy = py;
        }
        ctx.stroke();
        ctx.restore();
      });

      // points
      (scene.points || []).forEach((p) => {
        const px = toX(p.x);
        const py = toY(p.y);
        ctx.fillStyle = p.color || COLORS.vertex;
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, p.r || 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if (p.label) {
          const above = p.below ? false : true;
          drawText(p.label, px + (p.dx || 8), py + (above ? -11 : 12) + (p.dy || 0), COLORS.ink, "left", 11);
        }
      });

      ctx.restore();
    }

    function updateText() {
      if (cfg.readout) {
        const html = cfg.readout(state);
        if (html !== lastReadout) {
          lastReadout = html;
          readout.innerHTML = html;
          if (cfg.math && window.renderMathIn) window.renderMathIn(readout);
        }
      }
      if (cfg.extra && extra) {
        const html = cfg.extra(state);
        if (html !== lastExtra) {
          lastExtra = html;
          extra.innerHTML = html;
          if (cfg.math && window.renderMathIn) window.renderMathIn(extra);
        }
      }
    }

    // canvas and text panels always update together
    function draw() {
      paint();
      updateText();
    }

    container.querySelector(".graph-reset").addEventListener("click", () => {
      (cfg.sliders || []).forEach((s) => { state[s.key] = s.value; });
      (cfg.selects || []).forEach((s) => { state[s.key] = s.value !== undefined ? s.value : s.options[0].value; });
      buildSelects();
      buildSliders();
      draw();
    });

    window.addEventListener("resize", resize);

    buildSelects();
    buildSliders();
    requestAnimationFrame(resize);

    return { redraw: draw, state };
  }

  window.createPlot = createPlot;
  window.PLOT_COLORS = COLORS;
})();
