// Helpers and interactive widgets for the "Parabolas, Functions & Graphs" topic.
// Depends on js/plot.js (createPlot, PLOT_COLORS). Exposed as window.PFG.

(function () {
  const C = window.PLOT_COLORS;
  const MINUS = "\u2212";

  // ---------- number / text formatting (plain text, for readouts) ----------

  function n2(v) {
    const r = +Number(v).toFixed(2);
    return String(Object.is(r, -0) ? 0 : r).replace("-", MINUS);
  }

  function isOne(v) { return Math.abs(v - 1) < 1e-9; }
  function isZero(v) { return Math.abs(v) < 1e-9; }

  // y = ax^2 + bx + c
  function polyText(a, b, c) {
    let s = "y = ";
    let first = true;
    const term = (coef, pow) => {
      if (isZero(coef)) return;
      const abs = Math.abs(coef);
      let body;
      if (pow === 0) body = n2(abs);
      else body = (isOne(abs) ? "" : n2(abs)) + (pow === 1 ? "x" : "x\u00B2");
      if (first) { s += (coef < 0 ? MINUS : "") + body; first = false; }
      else { s += (coef < 0 ? ` ${MINUS} ` : " + ") + body; }
    };
    term(a, 2); term(b, 1); term(c, 0);
    if (first) s += "0";
    return s;
  }

  function shiftInner(h) {
    if (isZero(h)) return "x";
    return h > 0 ? `(x ${MINUS} ${n2(h)})` : `(x + ${n2(-h)})`;
  }

  // y = a(x - h)^2 + k
  function tpText(a, h, k) {
    const aS = isOne(a) ? "" : isOne(-a) ? MINUS : n2(a);
    let s = `y = ${aS}${shiftInner(h)}\u00B2`;
    if (!isZero(k)) s += k > 0 ? ` + ${n2(k)}` : ` ${MINUS} ${n2(-k)}`;
    return s;
  }

  // y = a(x - p)(x - q)
  function factoredText(a, p, q) {
    const aS = isOne(a) ? "" : isOne(-a) ? MINUS : n2(a);
    if (p === q) return `y = ${aS}${shiftInner(p)}\u00B2`;
    return `y = ${aS}${shiftInner(p)}${shiftInner(q)}`;
  }

  // ---------- exact arithmetic helpers (LaTeX output) ----------

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = a % b; a = b; b = t; }
    return a || 1;
  }

  function rat(n, d) {
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d);
    return { n: n / g, d: d / g };
  }

  function ratTex(r) {
    if (r.d === 1) return String(r.n);
    return (r.n < 0 ? "-" : "") + `\\frac{${Math.abs(r.n)}}{${r.d}}`;
  }

  function ratAbsTex(r) { return ratTex({ n: Math.abs(r.n), d: r.d }); }

  // x - h written with the right sign, h rational
  function shiftTex(h) {
    if (h.n === 0) return "x";
    return h.n > 0 ? `x - ${ratTex(h)}` : `x + ${ratAbsTex(h)}`;
  }

  function simplifySurd(n) {
    let s = 1; let t = n;
    for (let f = 2; f * f <= t; f += 1) {
      while (t % (f * f) === 0) { t /= f * f; s *= f; }
    }
    return { s, t };
  }

  function isPerfectSquare(n) {
    if (n < 0) return false;
    const r = Math.round(Math.sqrt(n));
    return r * r === n;
  }

  // roots of ax^2 + bx + c = 0 when D = b^2 - 4ac > 0, as exact LaTeX
  function rootsTex(a, b, D) {
    if (isPerfectSquare(D)) {
      const r = Math.round(Math.sqrt(D));
      const rs = [rat(-b + r, 2 * a), rat(-b - r, 2 * a)].sort((p, q) => p.n / p.d - q.n / q.d);
      return `${ratTex(rs[0])} \\text{ or } ${ratTex(rs[1])}`;
    }
    const { s, t } = simplifySurd(D);
    const g = gcd(gcd(b, s), 2 * a);
    let p = -b / g; const q = s / g; let d = (2 * a) / g;
    if (d < 0) { p = -p; d = -d; }
    const surd = `${q === 1 ? "" : q}\\sqrt{${t}}`;
    const num = p === 0 ? `\\pm ${surd}` : `${p} \\pm ${surd}`;
    return d === 1 ? num : `\\frac{${num}}{${d}}`;
  }

  // ---------- section helpers ----------

  function checklist(lessonId, items) {
    return `<ul class="checklist">${items.map((text, i) => `
      <li><label><input type="checkbox" data-pfg="${lessonId}-${i}"><span>${text}</span></label></li>
    `).join("")}</ul>`;
  }

  function problems(sectionEl, list) {
    problemsInto(sectionEl.querySelector(".problems"), list);
  }

  function problemsInto(wrap, list) {
    if (!wrap) return;
    wrap.innerHTML = list.map((p, i) => `
      <div class="problem" data-idx="${i}">
        <div class="q">${p.tag ? `<span class="tag tag-small">${p.tag}</span> ` : ""}Q${i + 1}. ${p.q}</div>
        <div class="answer"><div class="answer-inner"><div class="answer-content">${p.a}</div></div></div>
      </div>
    `).join("");
    wrap.querySelectorAll(".problem").forEach((el) => {
      el.querySelector(".q").addEventListener("click", () => el.classList.toggle("revealed"));
    });
    if (window.renderMathIn) window.renderMathIn(wrap);
  }

  // Progress tracker: one localStorage key per checkbox. Storage can throw
  // (private windows, blocked cookies), so every access is wrapped.
  const STORE_PREFIX = "mathquest:pfg:";
  function readFlag(key) {
    try { return localStorage.getItem(STORE_PREFIX + key) === "1"; } catch (e) { return false; }
  }
  function writeFlag(key, on) {
    try {
      if (on) localStorage.setItem(STORE_PREFIX + key, "1");
      else localStorage.removeItem(STORE_PREFIX + key);
    } catch (e) { /* progress just won't persist */ }
  }

  function initTracker(sectionEl) {
    const page = sectionEl.closest(".topic-page");
    if (!page) return;
    const boxes = Array.from(page.querySelectorAll("input[data-pfg]"));
    const fill = sectionEl.querySelector(".progress-fill");
    const text = sectionEl.querySelector(".progress-text");

    function refresh() {
      const done = boxes.filter((b) => b.checked).length;
      const pct = boxes.length ? Math.round((done / boxes.length) * 100) : 0;
      if (fill) fill.style.width = `${pct}%`;
      if (text) text.textContent = `${done} of ${boxes.length} success criteria ticked (${pct}%)`;
    }

    boxes.forEach((box) => {
      box.checked = readFlag(box.dataset.pfg);
      box.addEventListener("change", () => {
        writeFlag(box.dataset.pfg, box.checked);
        refresh();
      });
    });

    const resetBtn = sectionEl.querySelector(".progress-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        boxes.forEach((box) => { box.checked = false; writeFlag(box.dataset.pfg, false); });
        refresh();
      });
    }
    refresh();
  }

  // ---------- widgets ----------

  const mount = {};

  function host(el, name) { return el.querySelector(`[data-plot="${name}"]`); }

  // 7A: y = ax^2 + c, the basic family, with y = x^2 as a ghost
  mount.basic = (el) => createPlot(host(el, "basic"), {
    xRange: [-6, 6], yRange: [-10, 10], xLabel: "x", yLabel: "y",
    sliders: [
      { key: "a", label: "a", min: -4, max: 4, step: 0.25, value: 1 },
      { key: "c", label: "c", min: -8, max: 8, step: 1, value: 0 },
    ],
    scene({ a, c }) {
      const flat = isZero(a);
      const curves = [
        { fn: (x) => x * x, color: C.ref, dash: [5, 5], width: 1.75 },
        { fn: (x) => a * x * x + c, color: C.curve },
      ];
      const points = [];
      if (!flat) {
        points.push({ x: 0, y: c, color: C.vertex, label: `turning point (0, ${n2(c)})`, dx: 10 });
        if (-c / a >= 0 && !isZero(c)) {
          const r = Math.sqrt(-c / a);
          [-r, r].forEach((x) => points.push({ x, y: 0, color: C.xint }));
        }
      }
      return { curves, points, vlines: [{ x: 0 }] };
    },
    readout({ a, c }) {
      if (isZero(a)) return "<span>a = 0 gives a straight line, not a parabola.</span>";
      const r2 = -c / a;
      let xints;
      if (r2 < -1e-9) xints = "none";
      else if (isZero(r2)) xints = "one, at (0, 0)";
      else xints = `two, at x = ${MINUS}${n2(Math.sqrt(r2))} and ${n2(Math.sqrt(r2))}`;
      const shape = Math.abs(a) > 1 ? "narrower than y = x\u00B2" : Math.abs(a) < 1 ? "wider than y = x\u00B2" : "same width as y = x\u00B2";
      return `
        <span>Rule: <b>${polyText(a, 0, c)}</b></span>
        <span>Opens: <b>${a > 0 ? "up (minimum)" : "down (maximum)"}</b></span>
        <span>Turning point: <b>(0, ${n2(c)})</b></span>
        <span>Axis of symmetry: <b>x = 0</b></span>
        <span>Shape: <b>${shape}</b></span>
        <span>x-intercepts: <b>${xints}</b></span>`;
    },
  });

  // 7B: y = a(x - h)^2 + k with y = x^2 as a ghost
  mount.transform = (el) => createPlot(host(el, "transform"), {
    xRange: [-8, 8], yRange: [-10, 10], xLabel: "x", yLabel: "y",
    sliders: [
      { key: "a", label: "a", min: -3, max: 3, step: 0.25, value: 1 },
      { key: "h", label: "h", min: -6, max: 6, step: 0.5, value: 0 },
      { key: "k", label: "k", min: -8, max: 8, step: 0.5, value: 0 },
    ],
    scene({ a, h, k }) {
      const flat = isZero(a);
      const curves = [
        { fn: (x) => x * x, color: C.ref, dash: [5, 5], width: 1.75 },
        { fn: (x) => a * (x - h) * (x - h) + k, color: C.curve },
      ];
      const points = [];
      if (!flat) {
        points.push({ x: h, y: k, color: C.vertex, label: `(${n2(h)}, ${n2(k)})`, dx: 10 });
        points.push({ x: 0, y: a * h * h + k, color: C.yint });
        if (-k / a > 1e-9) {
          const r = Math.sqrt(-k / a);
          [h - r, h + r].forEach((x) => points.push({ x, y: 0, color: C.xint }));
        } else if (isZero(k)) {
          points.push({ x: h, y: 0, color: C.xint });
        }
      }
      return { curves, points, vlines: flat ? [] : [{ x: h }] };
    },
    readout({ a, h, k }) {
      if (isZero(a)) return "<span>a = 0 gives a horizontal line, not a parabola.</span>";
      const steps = [];
      if (!isOne(Math.abs(a))) steps.push(`dilation from the x-axis by factor ${n2(Math.abs(a))}`);
      if (a < 0) steps.push("reflection in the x-axis");
      if (!isZero(h)) steps.push(`translation ${n2(Math.abs(h))} ${h > 0 ? "right" : "left"}`);
      if (!isZero(k)) steps.push(`translation ${n2(Math.abs(k))} ${k > 0 ? "up" : "down"}`);
      const yint = a * h * h + k;
      let xints;
      if (-k / a > 1e-9) {
        const r = Math.sqrt(-k / a);
        xints = `${n2(h - r)} and ${n2(h + r)}`;
      } else if (isZero(k)) xints = `one, at x = ${n2(h)}`;
      else xints = "none";
      return `
        <span>Rule: <b>${tpText(a, h, k)}</b></span>
        <span>Transformations of y = x\u00B2: <b>${steps.length ? steps.join(", ") : "none"}</b></span>
        <span>Turning point: <b>(${n2(h)}, ${n2(k)})</b> (${a > 0 ? "minimum" : "maximum"})</span>
        <span>Axis: <b>x = ${n2(h)}</b></span>
        <span>y-intercept: <b>${n2(yint)}</b></span>
        <span>x-intercepts: <b>${xints}</b></span>`;
    },
  });

  // 7C: y = a(x - p)(x - q)
  mount.factored = (el) => createPlot(host(el, "factored"), {
    xRange: [-8, 8], yRange: [-16, 16], xLabel: "x", yLabel: "y",
    sliders: [
      { key: "a", label: "a", min: -3, max: 3, step: 0.5, value: 1 },
      { key: "p", label: "p", min: -6, max: 6, step: 1, value: -2 },
      { key: "q", label: "q", min: -6, max: 6, step: 1, value: 4 },
    ],
    scene({ a, p, q }) {
      const flat = isZero(a);
      const mid = (p + q) / 2;
      const curves = [{ fn: (x) => a * (x - p) * (x - q) }];
      const points = [];
      if (!flat) {
        points.push({ x: p, y: 0, color: C.xint, label: `(${p}, 0)`, below: true, dx: -4 });
        if (p !== q) points.push({ x: q, y: 0, color: C.xint, label: `(${q}, 0)`, below: true, dx: -4 });
        points.push({ x: mid, y: a * (mid - p) * (mid - q), color: C.vertex });
        points.push({ x: 0, y: a * p * q, color: C.yint });
      }
      return { curves, points, vlines: flat ? [] : [{ x: mid }] };
    },
    readout({ a, p, q }) {
      if (isZero(a)) return "<span>a = 0 gives a horizontal line, not a parabola.</span>";
      const mid = (p + q) / 2;
      const vy = a * (mid - p) * (mid - q);
      return `
        <span>Factored: <b>${factoredText(a, p, q)}</b></span>
        <span>Expanded: <b>${polyText(a, -a * (p + q), a * p * q)}</b></span>
        <span>x-intercepts: <b>${p === q ? `one (touches), x = ${p}` : `x = ${p} and x = ${q}`}</b></span>
        <span>Axis: <b>x = ${n2(mid)}</b> (halfway between)</span>
        <span>Turning point: <b>(${n2(mid)}, ${n2(vy)})</b></span>
        <span>y-intercept: <b>${n2(a * p * q)}</b></span>`;
    },
  });

  // 7D: completing the square, with exact working
  function completeSteps(a, b, c) {
    if (a === 0) return '<p class="note">With a = 0 this is a straight line, so there is nothing to complete.</p>';
    if (b === 0) {
      return `<p class="steps-title">Working, step by step</p><p>There is no $x$ term ($b = 0$), so this is already in turning point form with $h = 0$:</p><p>$$y = ${a === 1 ? "" : a === -1 ? "-" : a}x^2${c === 0 ? "" : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`}$$</p><p>Turning point: $(0,\\ ${c})$.</p>`;
    }
    const half = rat(b, 2 * a);                // coefficient inside (x + half)
    const halfSq = rat(b * b, 4 * a * a);      // (half)^2
    const B = rat(b, a);                       // coefficient of x inside the bracket
    const h = rat(-b, 2 * a);
    const k = rat(4 * a * c - b * b, 4 * a);
    const aTex = a === 1 ? "" : a === -1 ? "-" : String(a);
    const xTerm = (r) => (r.n === 0 ? "" : r.n > 0 ? ` + ${r.n === 1 && r.d === 1 ? "" : ratTex(r)}x` : ` - ${Math.abs(r.n) === 1 && r.d === 1 ? "" : ratAbsTex(r)}x`);
    const cTerm = (v) => (v === 0 ? "" : v > 0 ? ` + ${v}` : ` - ${Math.abs(v)}`);
    const constTex = (r) => (r.n === 0 ? "" : r.n > 0 ? ` + ${ratTex(r)}` : ` - ${ratAbsTex(r)}`);
    const sq = half.n === 0 ? "x^2" : `(x ${half.n > 0 ? "+" : "-"} ${ratAbsTex(half)})^2`;
    const bracketOpen = a === 1 ? "" : "\\left[";
    const bracketClose = a === 1 ? "" : "\\right]";

    let html = "<p class=\"steps-title\">Working, step by step</p>";
    html += `<p>1. Start with the rule:</p><p>$$y = ${a === 1 ? "" : aTex}x^2${xTerm(rat(b, 1))}${cTerm(c)}$$</p>`;
    if (a !== 1) {
      html += `<p>2. Take out the factor $a = ${a}$ from the $x^2$ and $x$ terms:</p>`;
      html += `<p>$$y = ${aTex}\\left[x^2${xTerm(B)}\\right]${cTerm(c)}$$</p>`;
    }
    html += `<p>${a === 1 ? "2" : "3"}. Half the coefficient of $x$ is $${ratTex(half)}$. Add and subtract its square, $${ratTex(halfSq)}$, inside the bracket:</p>`;
    html += `<p>$$y = ${aTex}${bracketOpen}${sq} - ${ratTex(halfSq)}${bracketClose}${cTerm(c)}$$</p>`;
    html += a === 1
      ? "<p>3. Combine the constants:</p>"
      : `<p>4. Expand the bracket (multiply the subtracted term by $a = ${a}$) and tidy up:</p>`;
    html += `<p>$$y = ${aTex}${sq}${constTex(k)}$$</p>`;
    html += `<p><b>Turning point form:</b> $a = ${a}$, $h = ${ratTex(h)}$, $k = ${ratTex(k)}$, so the turning point is $\\left(${ratTex(h)},\\ ${ratTex(k)}\\right)$.</p>`;
    html += `<p>Check: $h = -\\dfrac{b}{2a}$ and $k = c - \\dfrac{b^2}{4a}$.</p>`;
    return html;
  }

  mount.complete = (el) => createPlot(host(el, "complete"), {
    xRange: [-10, 10], yRange: [-14, 14], xLabel: "x", yLabel: "y", math: true,
    sliders: [
      { key: "a", label: "a", min: -3, max: 3, step: 1, value: 1 },
      { key: "b", label: "b", min: -10, max: 10, step: 1, value: 6 },
      { key: "c", label: "c", min: -10, max: 10, step: 1, value: 2 },
    ],
    scene({ a, b, c }) {
      const curves = [{ fn: (x) => a * x * x + b * x + c }];
      const points = [];
      if (a !== 0) {
        const h = -b / (2 * a);
        const k = c - (b * b) / (4 * a);
        points.push({ x: h, y: k, color: C.vertex, label: `(${n2(h)}, ${n2(k)})`, dx: 10 });
        points.push({ x: 0, y: c, color: C.yint });
        const D = b * b - 4 * a * c;
        if (D >= 0) {
          const sq = Math.sqrt(D);
          [(-b + sq) / (2 * a), (-b - sq) / (2 * a)].forEach((x) => points.push({ x, y: 0, color: C.xint }));
        }
        return { curves, points, vlines: [{ x: h }] };
      }
      return { curves, points };
    },
    readout({ a, b, c }) {
      if (a === 0) return "<span>a = 0: a straight line.</span>";
      const h = -b / (2 * a);
      const k = c - (b * b) / (4 * a);
      return `
        <span>General: <b>${polyText(a, b, c)}</b></span>
        <span>Turning point form: <b>${tpText(a, h, k)}</b></span>`;
    },
    extra({ a, b, c }) { return completeSteps(a, b, c); },
  });

  // 7E: the quadratic formula and the discriminant
  function formulaSteps(a, b, c) {
    if (a === 0) return '<p class="note">With a = 0 this is a straight line, so the quadratic formula does not apply.</p>';
    const D = b * b - 4 * a * c;
    const xv = rat(-b, 2 * a);
    const yv = rat(-D, 4 * a);
    let html = '<p class="steps-title">Working, step by step</p>';
    html += `<p>Discriminant: $$\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${D}$$</p>`;
    if (D > 0) {
      html += `<p>$\\Delta &gt; 0$, so there are <b>two</b> $x$-intercepts.</p>`;
      html += `<p>$$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$$</p>`;
      html += `<p>$$x = \\frac{-(${b}) \\pm \\sqrt{${D}}}{2(${a})} = ${rootsTex(a, b, D)}$$</p>`;
      const sq = Math.sqrt(D);
      const r1 = (-b + sq) / (2 * a);
      const r2 = (-b - sq) / (2 * a);
      html += `<p>As decimals: $x \\approx ${n2(Math.min(r1, r2)).replace(MINUS, "-")}$ and $x \\approx ${n2(Math.max(r1, r2)).replace(MINUS, "-")}$.</p>`;
    } else if (D === 0) {
      html += `<p>$\\Delta = 0$, so there is <b>one</b> repeated $x$-intercept (the graph touches the axis at its turning point).</p>`;
      html += `<p>$$x = -\\frac{b}{2a} = ${ratTex(xv)}$$</p>`;
    } else {
      html += `<p>$\\Delta &lt; 0$, so there are <b>no</b> $x$-intercepts. The parabola ${a > 0 ? "sits entirely above" : "hangs entirely below"} the $x$-axis.</p>`;
    }
    html += `<p>Turning point: $\\left(-\\dfrac{b}{2a},\\ -\\dfrac{\\Delta}{4a}\\right) = \\left(${ratTex(xv)},\\ ${ratTex(yv)}\\right)$</p>`;
    return html;
  }

  mount.formula = (el) => createPlot(host(el, "formula"), {
    xRange: [-10, 10], yRange: [-14, 14], xLabel: "x", yLabel: "y", math: true,
    sliders: [
      { key: "a", label: "a", min: -5, max: 5, step: 1, value: 1 },
      { key: "b", label: "b", min: -10, max: 10, step: 1, value: -4 },
      { key: "c", label: "c", min: -10, max: 10, step: 1, value: -3 },
    ],
    scene({ a, b, c }) {
      const curves = [{ fn: (x) => a * x * x + b * x + c }];
      const points = [];
      if (a !== 0) {
        const h = -b / (2 * a);
        const k = c - (b * b) / (4 * a);
        points.push({ x: h, y: k, color: C.vertex });
        points.push({ x: 0, y: c, color: C.yint });
        const D = b * b - 4 * a * c;
        if (D >= 0) {
          const sq = Math.sqrt(D);
          [(-b + sq) / (2 * a), (-b - sq) / (2 * a)].forEach((x) => points.push({ x, y: 0, color: C.xint, label: n2(x), below: true, dx: -10 }));
        }
        return { curves, points, vlines: [{ x: h }] };
      }
      return { curves, points };
    },
    readout({ a, b, c }) {
      if (a === 0) return "<span>a = 0: a straight line.</span>";
      const D = b * b - 4 * a * c;
      const n = D > 0 ? "2" : D === 0 ? "1" : "0";
      return `
        <span>Rule: <b>${polyText(a, b, c)}</b></span>
        <span>&Delta;: <b>${D}</b></span>
        <span>x-intercepts: <b>${n}</b></span>`;
    },
    extra({ a, b, c }) { return formulaSteps(a, b, c); },
  });

  // 7F: fixed fencing, three sides of a paddock
  mount.fence = (el) => createPlot(host(el, "fence"), {
    xRange: [-2, 32], yRange: [-60, 500], xLabel: "width x (m)", yLabel: "area A (m\u00B2)",
    sliders: [{ key: "x", label: "x", min: 0, max: 30, step: 0.5, value: 10 }],
    scene({ x }) {
      const A = (w) => w * (60 - 2 * w);
      return {
        curves: [{ fn: A, from: 0, to: 30 }],
        points: [
          { x: 15, y: 450, color: C.vertex, label: "maximum (15, 450)", dx: 10 },
          { x, y: A(x), color: C.yint },
        ],
        vlines: [{ x: 15 }],
      };
    },
    readout({ x }) {
      const len = 60 - 2 * x;
      return `
        <span>Width x: <b>${n2(x)} m</b></span>
        <span>Length 60 ${MINUS} 2x: <b>${n2(len)} m</b></span>
        <span>Area: <b>${n2(x * len)} m\u00B2</b></span>
        <span>${x === 15 ? "<b>This is the maximum.</b>" : "Slide towards the turning point."}</span>`;
    },
  });

  // 7F: projectile h(t) = -5t^2 + vt + h0
  mount.ball = (el) => createPlot(host(el, "ball"), {
    xRange: [-1, 8], yRange: [-8, 52], xLabel: "time t (s)", yLabel: "height h (m)",
    sliders: [
      { key: "v", label: "v", min: 5, max: 30, step: 1, value: 20 },
      { key: "h0", label: "h\u2080", min: 0, max: 5, step: 0.5, value: 1.5 },
    ],
    scene({ v, h0 }) {
      const h = (t) => -5 * t * t + v * t + h0;
      const tMax = v / 10;
      const tEnd = (v + Math.sqrt(v * v + 20 * h0)) / 10;
      return {
        curves: [
          { fn: h, color: C.ref, dash: [4, 5], width: 1.75 },
          { fn: h, from: 0, to: tEnd },
        ],
        points: [
          { x: tMax, y: h(tMax), color: C.vertex, label: `max ${n2(h(tMax))} m at ${n2(tMax)} s`, dx: 10 },
          { x: 0, y: h0, color: C.yint },
          { x: tEnd, y: 0, color: C.xint, label: `lands ${n2(tEnd)} s`, below: true, dx: -30 },
        ],
        vlines: [{ x: tMax }],
      };
    },
    readout({ v, h0 }) {
      const tMax = v / 10;
      const tEnd = (v + Math.sqrt(v * v + 20 * h0)) / 10;
      return `
        <span>Model: <b>h = ${MINUS}5t\u00B2 + ${v}t${h0 ? ` + ${n2(h0)}` : ""}</b></span>
        <span>Starts at: <b>${n2(h0)} m</b></span>
        <span>Max height: <b>${n2(-5 * tMax * tMax + v * tMax + h0)} m</b> at t = ${n2(tMax)} s</span>
        <span>Lands at: <b>t \u2248 ${n2(tEnd)} s</b></span>
        <span>Sensible domain: <b>0 \u2264 t \u2264 ${n2(tEnd)}</b></span>`;
    },
  });

  // 7G: line y = mx + d against the fixed parabola y = x^2 - 2x - 3
  mount.intersect = (el) => createPlot(host(el, "intersect"), {
    xRange: [-6, 8], yRange: [-12, 14], xLabel: "x", yLabel: "y",
    sliders: [
      { key: "m", label: "m", min: -6, max: 6, step: 0.5, value: 1 },
      { key: "d", label: "d", min: -10, max: 6, step: 0.5, value: -1 },
    ],
    scene({ m, d }) {
      const D = (2 + m) * (2 + m) + 4 * (3 + d);
      const tangent = Math.abs(D) < 1e-9;
      const points = [];
      if (D >= -1e-9) {
        const sq = Math.sqrt(Math.max(D, 0));
        const xs = tangent ? [(2 + m) / 2] : [(2 + m + sq) / 2, (2 + m - sq) / 2];
        xs.forEach((x) => points.push({ x, y: m * x + d, color: tangent ? C.yint : C.xint, r: 6, label: `(${n2(x)}, ${n2(m * x + d)})`, dx: 10 }));
      }
      return {
        curves: [
          { fn: (x) => x * x - 2 * x - 3 },
          { fn: (x) => m * x + d, color: C.line },
        ],
        points,
      };
    },
    readout({ m, d }) {
      const D = (2 + m) * (2 + m) + 4 * (3 + d);
      const tangent = Math.abs(D) < 1e-9;
      const verdict = tangent ? "tangent, 1 point" : D > 0 ? "secant, 2 points" : "misses, 0 points";
      const eq = polyText(1, -(2 + m), -(3 + d)).replace("y = ", "") + " = 0";
      return `
        <span>Parabola: <b>y = x\u00B2 ${MINUS} 2x ${MINUS} 3</b></span>
        <span>Line: <b>${polyText(0, m, d)}</b></span>
        <span>Equate: <b>${eq}</b></span>
        <span>&Delta;: <b>${n2(D)}</b></span>
        <span>Result: <b>${verdict}</b></span>`;
    },
  });

  // 10A: vertical line test
  const RELATIONS = {
    parabola: {
      label: "y = x\u00B2", fn: true, domain: "all real x", range: "y \u2265 0",
      branches: [(x) => x * x],
    },
    abs: {
      label: "y = |x|", fn: true, domain: "all real x", range: "y \u2265 0",
      branches: [(x) => Math.abs(x)],
    },
    sqrt: {
      label: "y = \u221Ax", fn: true, domain: "x \u2265 0", range: "y \u2265 0",
      branches: [(x) => (x >= 0 ? Math.sqrt(x) : NaN)],
    },
    recip: {
      label: "y = 1/x", fn: true, domain: "x \u2260 0", range: "y \u2260 0",
      branches: [(x) => (Math.abs(x) < 1e-9 ? NaN : 1 / x)],
    },
    sideways: {
      label: "x = y\u00B2 (sideways parabola)", fn: false, domain: "x \u2265 0", range: "all real y",
      branches: [(x) => (x >= 0 ? Math.sqrt(x) : NaN), (x) => (x >= 0 ? -Math.sqrt(x) : NaN)],
    },
    circle: {
      label: "x\u00B2 + y\u00B2 = 9 (circle)", fn: false, domain: `${MINUS}3 \u2264 x \u2264 3`, range: `${MINUS}3 \u2264 y \u2264 3`,
      branches: [(x) => (Math.abs(x) <= 3 ? Math.sqrt(9 - x * x) : NaN), (x) => (Math.abs(x) <= 3 ? -Math.sqrt(9 - x * x) : NaN)],
    },
    vertical: {
      label: "x = 2 (vertical line)", fn: false, domain: "x = 2 only", range: "all real y",
      branches: [], vertical: 2,
    },
  };

  function crossings(rel, t) {
    if (rel.vertical !== undefined) return Math.abs(t - rel.vertical) < 1e-6 ? Infinity : 0;
    const ys = rel.branches.map((f) => f(t)).filter(Number.isFinite);
    const distinct = [];
    ys.forEach((y) => { if (!distinct.some((d) => Math.abs(d - y) < 1e-7)) distinct.push(y); });
    return distinct;
  }

  mount.vlt = (el) => createPlot(host(el, "vlt"), {
    xRange: [-7, 7], yRange: [-5, 5], xLabel: "x", yLabel: "y",
    selects: [{
      key: "rel", label: "Relation",
      options: Object.keys(RELATIONS).map((k) => ({ value: k, label: RELATIONS[k].label })),
      value: "parabola",
    }],
    sliders: [{ key: "t", label: "x =", min: -6, max: 6, step: 0.1, value: 1 }],
    scene({ rel, t }) {
      const R = RELATIONS[rel];
      const curves = R.branches.map((f) => ({ fn: f }));
      const hit = crossings(R, t);
      const points = Array.isArray(hit) ? hit.map((y) => ({ x: t, y, color: C.yint, r: 6 })) : [];
      const vlines = [{ x: t, color: C.line, dash: false, width: 2 }];
      if (R.vertical !== undefined) vlines.push({ x: R.vertical, color: C.curve, dash: false, width: 2.5 });
      return { curves, points, vlines };
    },
    readout({ rel, t }) {
      const R = RELATIONS[rel];
      const hit = crossings(R, t);
      const count = Array.isArray(hit) ? hit.length : hit;
      const countText = count === Infinity ? "every point on it" : String(count);
      return `
        <span>The line x = <b>${n2(t)}</b> crosses the graph: <b>${countText}</b> time${count === 1 ? "" : "s"}</span>
        <span>Is it a function? <b>${R.fn ? "Yes: no vertical line crosses it twice" : "No: some vertical lines cross it more than once"}</b></span>
        <span>Domain: <b>${R.domain}</b></span>
        <span>Range: <b>${R.range}</b></span>`;
    },
  });

  // 3F: y = a * b^x + k, with a horizontal line y = m to intersect it
  mount.exp = (el) => createPlot(host(el, "exp"), {
    xRange: [-5, 5], yRange: [-10, 10], xLabel: "x", yLabel: "y",
    sliders: [
      { key: "a", label: "a", min: -4, max: 4, step: 0.5, value: 1 },
      { key: "b", label: "b", min: 0.25, max: 4, step: 0.05, value: 2 },
      { key: "k", label: "k", min: -6, max: 6, step: 0.5, value: 0 },
      { key: "m", label: "m", min: -10, max: 10, step: 0.5, value: 4 },
    ],
    scene({ a, b, k, m }) {
      const f = (x) => a * Math.pow(b, x) + k;
      const points = [];
      const flat = isZero(a) || Math.abs(b - 1) < 1e-9;
      if (!flat) {
        points.push({ x: 0, y: a + k, color: C.yint, label: `(0, ${n2(a + k)})`, dx: 10 });
        const vx = -k / a;
        if (vx > 0) points.push({ x: Math.log(vx) / Math.log(b), y: 0, color: C.xint });
        const vm = (m - k) / a;
        if (vm > 0) {
          const x = Math.log(vm) / Math.log(b);
          points.push({ x, y: m, color: C.line, r: 6, label: `x \u2248 ${n2(x)}`, dx: 10 });
        }
      }
      return {
        curves: [{ fn: f }],
        points,
        hlines: [{ y: k, color: C.asym }, { y: m, color: C.line }],
      };
    },
    readout({ a, b, k, m }) {
      if (isZero(a)) return "<span>a = 0 gives a horizontal line, not an exponential.</span>";
      if (Math.abs(b - 1) < 1e-9) return "<span>b = 1 gives a constant (1 to any power is 1), not an exponential.</span>";
      const vx = -k / a;
      const xint = vx > 0 ? `x \u2248 ${n2(Math.log(vx) / Math.log(b))}` : "none";
      const vm = (m - k) / a;
      const hit = vm > 0 ? `x \u2248 ${n2(Math.log(vm) / Math.log(b))}` : "no solution";
      const range = a > 0 ? `y > ${n2(k)}` : `y < ${n2(k)}`;
      return `
        <span>Rule: <b>y = ${n2(a)} \u00B7 ${n2(b)}<sup>x</sup>${k ? (k > 0 ? ` + ${n2(k)}` : ` ${MINUS} ${n2(-k)}`) : ""}</b></span>
        <span>Type: <b>${b > 1 ? "growth" : "decay"}</b>${a < 0 ? " (reflected: the curve sits below its asymptote)" : ""}</span>
        <span>Asymptote: <b>y = ${n2(k)}</b></span>
        <span>y-intercept: <b>${n2(a + k)}</b></span>
        <span>x-intercept: <b>${xint}</b></span>
        <span>Range: <b>${range}</b></span>
        <span>Meets y = ${n2(m)} at: <b>${hit}</b></span>`;
    },
  });

  window.PFG = { mount, checklist, problems, problemsInto, initTracker, tpText, polyText, rootsTex, rat, ratTex, simplifySurd, completeSteps, formulaSteps };
})();
