// Content module for the "Parabolas, Functions & Graphs" topic.
// Registered onto window.MATH_TOPICS so js/main.js renders it like any other topic.
// Widgets and helpers live in js/plot.js and js/topics/pfg-lib.js.

window.MATH_TOPICS = window.MATH_TOPICS || [];

window.MATH_TOPICS.push({
  id: "parabolas-functions-graphs",
  title: "Parabolas, Functions & Graphs",
  blurb: "A 13-lesson unit: sketch parabolas four ways, model with them, intersect them with lines, then move on to function notation and exponential graphs.",
  sections: [

    // ------------------------------------------------------------------
    {
      heading: "Course map &amp; tracker",
      html: `
        <p>This tab follows the unit lesson by lesson. Each lesson has success criteria you can tick off, a worked example, an interactive graph, common mistakes and practice questions. Ticks are saved in this browser.</p>
        <div class="progress" role="progressbar" aria-label="Success criteria completed"><div class="progress-fill"></div></div>
        <p class="progress-text"></p>
        <button type="button" class="graph-reset progress-reset">Clear all ticks</button>
        <table>
          <tr><th>Lesson</th><th>Section</th><th>Big idea</th></tr>
          <tr><td>1</td><td>7A Exploring parabolas</td><td>Shape, symmetry, key features</td></tr>
          <tr><td>2</td><td>7B Transformations</td><td>Dilation, reflection, translation of $y = x^2$</td></tr>
          <tr><td>3</td><td>7C Sketching by factorising</td><td>Null Factor Law, $x$-intercepts, symmetry</td></tr>
          <tr><td>4</td><td>7D Completing the square</td><td>Turning point form from any quadratic</td></tr>
          <tr><td>5</td><td>7E The quadratic formula</td><td>Discriminant, number of $x$-intercepts</td></tr>
          <tr><td>6&ndash;7</td><td>7F Applications</td><td>Modelling, maximums, realistic domains</td></tr>
          <tr><td>8</td><td>7G Lines and parabolas</td><td>Substitution, 0, 1 or 2 intersections</td></tr>
          <tr><td>9</td><td>10A Functions and notation</td><td>Vertical line test, $f(x)$, domain and range</td></tr>
          <tr><td>10</td><td>3F Exponential graphs</td><td>Asymptotes, growth and decay, reflections</td></tr>
          <tr><td>11&ndash;12</td><td>Revision</td><td>Reference book, mixed questions, error hunt</td></tr>
          <tr><td>13</td><td>Application task</td><td>Model a real situation (reference book and CAS allowed)</td></tr>
        </table>
        <p class="note">The thread through lessons 1 to 8: every parabola has a turning point, an axis of symmetry, a $y$-intercept and 0, 1 or 2 $x$-intercepts. Each lesson gives you a new route to find them.</p>
      `,
      afterRender: (el) => PFG.initTracker(el),
    },

    // ------------------------------------------------------------------
    {
      heading: "7A &middot; Exploring parabolas",
      html: `
        <p class="lesson-meta"><span class="tag">Lesson 1</span><span class="tag">Textbook 7A</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l1", [
          "Understand and draw the shape and symmetry of a parabola.",
          "Identify the key features of a parabola from a graph, including $y$-intercepts, $x$-intercepts, axis of symmetry and turning point.",
          "Observe and understand the impact of transformations of dilation, reflection and translation.",
        ])}

        <h4>What is a parabola?</h4>
        <p>A <b>parabola</b> is the smooth U-shaped graph of a quadratic rule such as $y = x^2$ or $y = -2x^2 + 8$. The highest power of $x$ is 2.</p>
        <p>Build the basic one from a table of values:</p>
        <table>
          <tr><th>$x$</th><td>$-3$</td><td>$-2$</td><td>$-1$</td><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td></tr>
          <tr><th>$y = x^2$</th><td>9</td><td>4</td><td>1</td><td>0</td><td>1</td><td>4</td><td>9</td></tr>
        </table>
        <p>The $y$-values mirror each other either side of $x = 0$. That mirror line is the <b>axis of symmetry</b>.</p>

        <h4>Key features</h4>
        <table>
          <tr><th>Feature</th><th>Meaning</th><th>How to find it</th></tr>
          <tr><td>Turning point</td><td>The single point where the curve changes direction. A <b>minimum</b> if the parabola opens up, a <b>maximum</b> if it opens down.</td><td>On the axis of symmetry</td></tr>
          <tr><td>Axis of symmetry</td><td>Vertical line through the turning point. Every point has a mirror image across it.</td><td>$x = $ the turning point's $x$-value</td></tr>
          <tr><td>$y$-intercept</td><td>Where the graph crosses the $y$-axis</td><td>Put $x = 0$ in the rule</td></tr>
          <tr><td>$x$-intercepts</td><td>Where the graph crosses the $x$-axis. There can be 0, 1 or 2.</td><td>Put $y = 0$ and solve</td></tr>
          <tr><td>Concavity</td><td>Opens up ($a \\gt 0$) or opens down ($a \\lt 0$)</td><td>Sign of the number in front of $x^2$</td></tr>
        </table>

        <h4>Try it: $y = ax^2 + c$</h4>
        <p>The grey dashed curve is $y = x^2$. Drag $a$ and $c$ and watch what changes and what does not.</p>
        <div class="graph-widget" data-plot="basic"></div>
        <ul>
          <li>$a$ controls the width and direction. $|a| \\gt 1$ is narrower, $|a| \\lt 1$ is wider, and $a \\lt 0$ flips the parabola over. This is <b>dilation</b> and <b>reflection</b>.</li>
          <li>$c$ slides the whole graph up or down. This is <b>translation</b>. It also moves the turning point to $(0, c)$.</li>
          <li>The axis of symmetry stays at $x = 0$ because nothing here moves the graph sideways. Lesson 2 fixes that.</li>
        </ul>

        <div class="worked">
          <p class="worked-title">Worked example</p>
          <p>Find the key features of $y = -2x^2 + 8$.</p>
          <p><b>Concavity:</b> $a = -2 \\lt 0$, so it opens down and the turning point is a maximum.</p>
          <p><b>Turning point:</b> $(0, 8)$, which is also the $y$-intercept. Axis of symmetry: $x = 0$.</p>
          <p><b>$x$-intercepts:</b> $-2x^2 + 8 = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2$, so $(-2, 0)$ and $(2, 0)$.</p>
        </div>

        <h4>Common mistakes</h4>
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>Drawing a V with a sharp point at the bottom</td><td>A parabola is smooth and rounded at the turning point</td></tr>
          <tr><td>Stopping the curve at the edge of the table of values</td><td>Keep going, and add arrows if the curve continues</td></tr>
          <tr><td>An uneven curve, steeper on one side</td><td>Check symmetry: mirror points must match</td></tr>
          <tr><td>Calling the turning point "the $y$-intercept"</td><td>They only coincide when the axis of symmetry is $x = 0$</td></tr>
        </table>

        <h4>Practice</h4>
        <div class="problems"></div>
      `,
      afterRender: (el) => {
        PFG.mount.basic(el);
        PFG.problems(el, [
          { tag: "Core", q: "Complete a table of values for $y = x^2$ for $x = -3$ to $3$. State the axis of symmetry.", a: "$y = 9, 4, 1, 0, 1, 4, 9$. Axis of symmetry: $x = 0$." },
          { tag: "Core", q: "State the turning point, $y$-intercept and $x$-intercepts of $y = x^2 - 9$.", a: "Turning point $(0, -9)$, a minimum. $y$-intercept $-9$. $x^2 = 9 \\Rightarrow x = \\pm 3$." },
          { tag: "Core", q: "Does $y = -3x^2 + 12$ have a maximum or a minimum? Where is it, and where does it cross the $x$-axis?", a: "$a = -3 \\lt 0$, so a <b>maximum</b> at $(0, 12)$. $-3x^2 + 12 = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2$." },
          { tag: "Core", q: "Which is wider, $y = \\tfrac{1}{2}x^2$ or $y = 2x^2$? Explain.", a: "$y = \\tfrac{1}{2}x^2$ is wider. For the same $x$ its $y$-values grow more slowly. A smaller $|a|$ means a wider parabola." },
          { tag: "Core", q: "How many $x$-intercepts does $y = x^2 + 5$ have? Explain without solving.", a: "None. The minimum value is 5, which is above the $x$-axis, and the parabola opens up." },
          { tag: "Stretch", q: "A parabola of the form $y = ax^2 + c$ has turning point $(0, -4)$ and passes through $(2, 0)$. Find its rule.", a: "$c = -4$. Substitute $(2, 0)$: $0 = 4a - 4 \\Rightarrow a = 1$. Rule: $y = x^2 - 4$." },
        ]);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "7B &middot; Transformations",
      html: `
        <p class="lesson-meta"><span class="tag">Lesson 2</span><span class="tag">Textbook 7B</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l2", [
          "Define the types of transformations including dilation, reflection and translation.",
          "Understand the effect of the transformations above on the graph of $y = x^2$.",
          "Determine the turning point of a quadratic rule from turning point form.",
          "Sketch a quadratic from turning point form.",
          "Find the rule of a quadratic graph given the turning point and another point.",
        ])}

        <h4>Three transformations of $y = x^2$</h4>
        <table>
          <tr><th>Rule</th><th>Transformation</th></tr>
          <tr><td>$y = ax^2$ with $|a| \\gt 1$ or $0 \\lt |a| \\lt 1$</td><td><b>Dilation</b> from the $x$-axis by factor $|a|$ (narrower if bigger than 1, wider if smaller)</td></tr>
          <tr><td>$y = -x^2$</td><td><b>Reflection</b> in the $x$-axis</td></tr>
          <tr><td>$y = x^2 + k$</td><td><b>Translation</b> $k$ units up (down if $k \\lt 0$)</td></tr>
          <tr><td>$y = (x - h)^2$</td><td><b>Translation</b> $h$ units right (left if $h \\lt 0$)</td></tr>
        </table>
        <p>Combine them and you get <b>turning point form</b>:</p>
        <p>$$y = a(x - h)^2 + k \\qquad \\text{turning point } (h, k), \\quad \\text{axis } x = h$$</p>
        <p class="note"><b>Sign trap.</b> $(x + 3)^2$ shifts the graph 3 units <b>left</b>. The rule has $x - h$, so $x + 3 = x - (-3)$ gives $h = -3$. The $k$ shift behaves the way you expect: $+5$ goes up.</p>

        <h4>Try it: $y = a(x - h)^2 + k$</h4>
        <p>The grey dashed curve is the original $y = x^2$. The readout lists exactly which transformations were applied.</p>
        <div class="graph-widget" data-plot="transform"></div>

        <h4>Sketching from turning point form</h4>
        <ol class="steps-list">
          <li>Read the turning point $(h, k)$ and draw the axis $x = h$.</li>
          <li>Decide the direction: $a \\gt 0$ opens up, $a \\lt 0$ opens down.</li>
          <li>$y$-intercept: put $x = 0$.</li>
          <li>$x$-intercepts: put $y = 0$. Rearrange to $(x - h)^2 = -\\dfrac{k}{a}$. If the right side is negative there are none.</li>
          <li>Plot, mirror the points across the axis, draw a smooth curve, label.</li>
        </ol>

        <div class="worked">
          <p class="worked-title">Worked example: sketch $y = -(x + 1)^2 + 4$</p>
          <p>Turning point $(-1, 4)$, a maximum since $a = -1$. Axis $x = -1$.</p>
          <p>$y$-intercept: $y = -(1)^2 + 4 = 3$.</p>
          <p>$x$-intercepts: $(x+1)^2 = 4 \\Rightarrow x + 1 = \\pm 2 \\Rightarrow x = 1$ or $x = -3$.</p>
          <p>Mirror check: $(0, 3)$ reflects across $x = -1$ to $(-2, 3)$.</p>
        </div>

        <div class="worked">
          <p class="worked-title">Worked example: find the rule from the turning point and one point</p>
          <p>Turning point $(2, -3)$, passing through $(0, 5)$.</p>
          <p>Start with $y = a(x - 2)^2 - 3$. Substitute $(0, 5)$: $5 = a(4) - 3 \\Rightarrow 4a = 8 \\Rightarrow a = 2$.</p>
          <p>Rule: $y = 2(x - 2)^2 - 3$.</p>
        </div>

        <h4>Common mistakes</h4>
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>Reading the turning point of $y = (x + 4)^2 - 1$ as $(4, -1)$</td><td>It is $(-4, -1)$</td></tr>
          <tr><td>Finding $a$ before substituting the turning point</td><td>Always put $h$ and $k$ in first, then solve for $a$</td></tr>
          <tr><td>Forgetting $a$ also flips the graph when negative</td><td>Check the sign of $a$ against the picture</td></tr>
        </table>

        <h4>Practice</h4>
        <div class="problems"></div>
      `,
      afterRender: (el) => {
        PFG.mount.transform(el);
        PFG.problems(el, [
          { tag: "Core", q: "Describe the transformations that take $y = x^2$ to $y = -3(x + 2)^2 + 1$. State the turning point.", a: "Dilation from the $x$-axis by factor 3, reflection in the $x$-axis, translation 2 left and 1 up. Turning point $(-2, 1)$, a maximum." },
          { tag: "Core", q: "$y = x^2$ is reflected in the $x$-axis, then translated 4 right and 5 down. Write the new rule.", a: "$y = -(x - 4)^2 - 5$" },
          { tag: "Core", q: "Sketch $y = 2(x - 1)^2 - 8$, labelling the turning point and both intercepts.", a: "Turning point $(1, -8)$. $y$-intercept: $2(1) - 8 = -6$. $x$-intercepts: $(x-1)^2 = 4 \\Rightarrow x = 3$ or $x = -1$." },
          { tag: "Core", q: "Does $y = (x + 3)^2 + 2$ cross the $x$-axis? Explain.", a: "No. The minimum value is 2, above the axis, and it opens up. Also $(x+3)^2 = -2$ has no real solution." },
          { tag: "ESQ", q: "A parabola has turning point $(-1, 4)$ and passes through $(1, -4)$. Find its rule.", a: "$-4 = a(1+1)^2 + 4 \\Rightarrow 4a = -8 \\Rightarrow a = -2$. Rule: $y = -2(x+1)^2 + 4$." },
          { tag: "ESQ", q: "A parabola has turning point $(2, 5)$ and $y$-intercept $-3$. Find its rule.", a: "$-3 = a(0 - 2)^2 + 5 \\Rightarrow 4a = -8 \\Rightarrow a = -2$. Rule: $y = -2(x - 2)^2 + 5$." },
          { tag: "Stretch", q: "The graph of $y = x^2$ is dilated by factor $\\tfrac12$ from the $x$-axis and translated 6 right and 3 up. Give the rule and its $y$-intercept.", a: "$y = \\tfrac12(x - 6)^2 + 3$. $y$-intercept: $\\tfrac12(36) + 3 = 21$." },
        ]);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "7C &middot; Sketching by factorising",
      html: `
        <p class="lesson-meta"><span class="tag">Lesson 3</span><span class="tag">Textbook 7C</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l3", [
          "Apply the steps for sketching a quadratic graph in the form $y = ax^2 + bx + c$.",
          "Understand that quadratic graphs can have 0, 1 or 2 $x$-intercepts.",
          "Use factorisation to determine the $x$-intercepts of a quadratic graph.",
          "Use symmetry to locate the turning point once the $x$-intercepts are known.",
        ])}

        <h4>The Null Factor Law</h4>
        <p>If $A \\times B = 0$ then $A = 0$ or $B = 0$. So once a quadratic is factorised and set equal to zero, each bracket gives an answer:</p>
        <p>$$(x - p)(x - q) = 0 \\implies x = p \\ \\text{or}\\ x = q$$</p>

        <h4>Factorising toolkit</h4>
        <table>
          <tr><th>Pattern</th><th>Example</th></tr>
          <tr><td>Common factor first, always</td><td>$3x^2 - 12x = 3x(x - 4)$</td></tr>
          <tr><td>Difference of two squares</td><td>$x^2 - 25 = (x - 5)(x + 5)$</td></tr>
          <tr><td>Monic trinomial: two numbers that <b>multiply to $c$</b> and <b>add to $b$</b></td><td>$x^2 + 5x + 6 = (x + 2)(x + 3)$</td></tr>
          <tr><td>Non-monic trinomial</td><td>$2x^2 + 7x + 3 = (2x + 1)(x + 3)$</td></tr>
          <tr><td>Perfect square</td><td>$x^2 - 6x + 9 = (x - 3)^2$</td></tr>
        </table>
        <p>Always expand to check. $(2x+1)(x+3) = 2x^2 + 6x + x + 3 = 2x^2 + 7x + 3$. &#10003;</p>

        <h4>Sketching steps for $y = ax^2 + bx + c$</h4>
        <ol class="steps-list">
          <li><b>$y$-intercept:</b> put $x = 0$. It is $c$.</li>
          <li><b>$x$-intercepts:</b> put $y = 0$, factorise, use the Null Factor Law.</li>
          <li><b>Axis of symmetry:</b> halfway between the $x$-intercepts, $x = \\dfrac{p + q}{2}$.</li>
          <li><b>Turning point:</b> substitute the axis value back into the rule to get $y$.</li>
          <li>Plot, draw a smooth curve, label every feature.</li>
        </ol>

        <h4>Try it: $y = a(x - p)(x - q)$</h4>
        <p>Drag $p$ and $q$ and watch the turning point stay exactly halfway between the intercepts. Set $p = q$ to see a single touching intercept.</p>
        <div class="graph-widget" data-plot="factored"></div>

        <div class="worked">
          <p class="worked-title">Worked example 1: $y = x^2 - 2x - 8$</p>
          <p>$y$-intercept: $-8$.</p>
          <p>$x$-intercepts: $x^2 - 2x - 8 = (x - 4)(x + 2) = 0 \\Rightarrow x = 4$ or $x = -2$.</p>
          <p>Axis: $x = \\dfrac{4 + (-2)}{2} = 1$. Turning point: $y = 1 - 2 - 8 = -9$, so $(1, -9)$, a minimum.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 2: $y = -x^2 + 4x - 3$</p>
          <p>Take out $-1$: $-(x^2 - 4x + 3) = -(x - 1)(x - 3)$. $x$-intercepts $1$ and $3$. $y$-intercept $-3$.</p>
          <p>Axis: $x = 2$. Turning point: $y = -4 + 8 - 3 = 1$, so $(2, 1)$, a maximum.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 3: one $x$-intercept, $y = x^2 - 6x + 9$</p>
          <p>$(x - 3)^2 = 0 \\Rightarrow x = 3$ only. The turning point is $(3, 0)$, sitting on the $x$-axis, and the graph <b>touches</b> the axis without crossing.</p>
        </div>

        <p class="note">Not every quadratic factorises. If $x^2 + 4x + 9$ will not split into brackets it may have no $x$-intercepts at all. Lessons 4 and 5 handle that case.</p>

        <h4>Common mistakes</h4>
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>Solving $x^2 = 3x$ by dividing by $x$</td><td>Factorise: $x(x - 3) = 0$ gives $x = 0$ <b>and</b> $x = 3$</td></tr>
          <tr><td>Writing $(x + 2)(x - 4) = 0 \\Rightarrow x = 2, -4$</td><td>Flip the signs: $x = -2, 4$</td></tr>
          <tr><td>Setting each bracket equal to a non-zero number</td><td>The Null Factor Law only works when the product is 0</td></tr>
          <tr><td>Using the wrong $y$ for the turning point</td><td>Substitute the axis $x$-value into the <b>original</b> rule</td></tr>
        </table>

        <h4>Practice</h4>
        <div class="problems"></div>
      `,
      afterRender: (el) => {
        PFG.mount.factored(el);
        PFG.problems(el, [
          { tag: "Core", q: "Solve $x^2 - 7x + 12 = 0$.", a: "$(x - 3)(x - 4) = 0 \\Rightarrow x = 3$ or $x = 4$." },
          { tag: "Core", q: "Solve $3x^2 = 12x$.", a: "$3x^2 - 12x = 0 \\Rightarrow 3x(x - 4) = 0 \\Rightarrow x = 0$ or $x = 4$." },
          { tag: "Core", q: "Solve $2x^2 + x - 6 = 0$.", a: "$(2x - 3)(x + 2) = 0 \\Rightarrow x = \\tfrac32$ or $x = -2$." },
          { tag: "Core", q: "Sketch $y = x^2 - 4x - 5$. Give the intercepts, axis and turning point.", a: "$(x-5)(x+1)$: $x$-intercepts $-1$ and $5$. $y$-intercept $-5$. Axis $x = 2$. Turning point $(2, -9)$." },
          { tag: "Core", q: "Sketch $y = -x^2 + 4x + 5$. Give the intercepts, axis and turning point.", a: "$-(x-5)(x+1)$: $x$-intercepts $-1$ and $5$. $y$-intercept $5$. Axis $x = 2$. Turning point $(2, 9)$, a maximum." },
          { tag: "Core", q: "State the $x$-intercepts and turning point of $y = x^2 - 16$.", a: "$(x-4)(x+4)$: $x = \\pm 4$. Axis $x = 0$, turning point $(0, -16)$." },
          { tag: "Core", q: "How many $x$-intercepts does $y = (x - 2)^2$ have, and where is its turning point?", a: "One, at $(2, 0)$. The turning point is the $x$-intercept." },
          { tag: "Stretch", q: "A parabola has $x$-intercepts at $-3$ and $1$ and passes through $(0, 6)$. Find its rule.", a: "$y = a(x + 3)(x - 1)$. $6 = a(3)(-1) \\Rightarrow a = -2$. Rule: $y = -2(x+3)(x-1) = -2x^2 - 4x + 6$." },
        ]);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "7D &middot; Completing the square",
      html: `
        <p class="lesson-meta"><span class="tag">Lesson 4</span><span class="tag">Textbook 7D</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l4", [
          "Demonstrate how completing the square can be used to express any quadratic in turning point form.",
          "Find any $x$-intercepts from the turning point form of a quadratic.",
          "Sketch a quadratic equation in turning point form, labelling key features including the turning point.",
        ])}

        <h4>Why do it?</h4>
        <p>Factorising only works on some quadratics. <b>Completing the square</b> works on every one, and it hands you the turning point as a bonus. It rewrites $y = ax^2 + bx + c$ as $y = a(x - h)^2 + k$.</p>

        <h4>The idea</h4>
        <p>A perfect square has a pattern: $(x + n)^2 = x^2 + 2nx + n^2$. So if you see $x^2 + bx$, the missing piece is $\\left(\\tfrac b2\\right)^2$.</p>
        <p>$$x^2 + bx = \\left(x + \\frac b2\\right)^2 - \\left(\\frac b2\\right)^2$$</p>
        <h4>Method</h4>
        <ol class="steps-list">
          <li>If $a \\ne 1$, take $a$ out of the $x^2$ and $x$ terms (leave $c$ outside).</li>
          <li>Halve the coefficient of $x$, square it, then add and subtract it inside the bracket.</li>
          <li>Write the first three terms as a perfect square.</li>
          <li>Multiply the subtracted term by $a$ and combine with $c$.</li>
        </ol>

        <h4>Try it: step-by-step working</h4>
        <p>Choose any $a$, $b$, $c$. The working is generated exactly, using fractions when needed, and the turning point appears on the graph.</p>
        <div class="graph-widget" data-plot="complete"></div>

        <div class="worked">
          <p class="worked-title">Worked example 1 (monic): $y = x^2 + 6x + 2$</p>
          <p>Half of 6 is 3. $y = (x + 3)^2 - 9 + 2 = (x + 3)^2 - 7$. Turning point $(-3, -7)$.</p>
          <p>$x$-intercepts: $(x + 3)^2 = 7 \\Rightarrow x = -3 \\pm \\sqrt 7$.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 2 (non-monic): $y = 2x^2 + 8x + 3$</p>
          <p>$y = 2(x^2 + 4x) + 3 = 2\\left[(x + 2)^2 - 4\\right] + 3 = 2(x + 2)^2 - 8 + 3 = 2(x + 2)^2 - 5$.</p>
          <p>Turning point $(-2, -5)$. Check by expanding: $2(x^2 + 4x + 4) - 5 = 2x^2 + 8x + 3$. &#10003;</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 3 (negative $a$): $y = -x^2 + 4x + 1$</p>
          <p>$y = -(x^2 - 4x) + 1 = -\\left[(x - 2)^2 - 4\\right] + 1 = -(x - 2)^2 + 4 + 1 = -(x - 2)^2 + 5$.</p>
          <p>Turning point $(2, 5)$, a maximum. $x$-intercepts: $(x - 2)^2 = 5 \\Rightarrow x = 2 \\pm \\sqrt 5$.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 4: a parabola with no $x$-intercepts, $y = x^2 - 4x + 7$</p>
          <p>$y = (x - 2)^2 - 4 + 7 = (x - 2)^2 + 3$. Turning point $(2, 3)$, opening up, so the whole graph is above the $x$-axis. $y$-intercept 7.</p>
        </div>

        <p class="note"><b>Solving versus rewriting.</b> To <i>solve</i> $x^2 + 6x - 2 = 0$ you can complete the square and take roots: $(x+3)^2 = 11 \\Rightarrow x = -3 \\pm \\sqrt{11}$. To <i>rewrite</i> an expression you only complete the square. Do not set it equal to zero unless the question tells you to.</p>

        <h4>Common mistakes</h4>
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>$2x^2 + 8x + 3 = 2(x+2)^2 - 4 + 3$</td><td>The $-4$ is inside the bracket multiplied by 2: $2(x+2)^2 - 8 + 3 = 2(x+2)^2 - 5$</td></tr>
          <tr><td>Halving the wrong number: using $b$ instead of $b/a$ after factoring out $a$</td><td>Halve the coefficient of $x$ <b>inside the bracket</b></td></tr>
          <tr><td>$(x + 3)^2$ for $x^2 + 6x + 1$ with no correction</td><td>$(x+3)^2 = x^2 + 6x + 9$, so subtract 8: $(x+3)^2 - 8$</td></tr>
          <tr><td>Sign of $h$: $x^2 - 6x$ becomes $(x + 3)^2$</td><td>$(x - 3)^2$</td></tr>
        </table>

        <h4>Practice</h4>
        <div class="problems"></div>
      `,
      afterRender: (el) => {
        PFG.mount.complete(el);
        PFG.problems(el, [
          { tag: "Core", q: "Write $x^2 + 8x + 3$ in turning point form.", a: "$(x + 4)^2 - 16 + 3 = (x + 4)^2 - 13$. Turning point $(-4, -13)$." },
          { tag: "Core", q: "Write $x^2 - 6x + 4$ in turning point form and find its $x$-intercepts.", a: "$(x - 3)^2 - 9 + 4 = (x - 3)^2 - 5$. $(x-3)^2 = 5 \\Rightarrow x = 3 \\pm \\sqrt5$." },
          { tag: "Core", q: "Write $2x^2 - 12x + 7$ in turning point form.", a: "$2(x^2 - 6x) + 7 = 2[(x-3)^2 - 9] + 7 = 2(x-3)^2 - 11$. Turning point $(3, -11)$." },
          { tag: "Core", q: "Write $-x^2 + 2x + 3$ in turning point form. Find the turning point and $x$-intercepts.", a: "$-(x^2 - 2x) + 3 = -[(x-1)^2 - 1] + 3 = -(x-1)^2 + 4$. Turning point $(1, 4)$. $(x-1)^2 = 4 \\Rightarrow x = 3$ or $x = -1$." },
          { tag: "ESQ", q: "Write $3x^2 - 12x + 5$ in turning point form.", a: "$3(x^2 - 4x) + 5 = 3[(x-2)^2 - 4] + 5 = 3(x-2)^2 - 7$. Turning point $(2, -7)$." },
          { tag: "ESQ", q: "Solve $x^2 + 6x - 2 = 0$ exactly by completing the square.", a: "$(x+3)^2 - 9 - 2 = 0 \\Rightarrow (x+3)^2 = 11 \\Rightarrow x = -3 \\pm \\sqrt{11}$." },
          { tag: "Core", q: "Write $x^2 + 3x - 1$ in turning point form and state its $x$-intercepts exactly.", a: "$\\left(x + \\tfrac32\\right)^2 - \\tfrac94 - 1 = \\left(x + \\tfrac32\\right)^2 - \\tfrac{13}{4}$. $x = \\dfrac{-3 \\pm \\sqrt{13}}{2}$." },
          { tag: "Stretch", q: "Show that $x^2 + 4x + 9$ is positive for every real $x$.", a: "$(x+2)^2 - 4 + 9 = (x+2)^2 + 5$. A square is at least 0, so the expression is at least 5, and therefore positive." },
        ]);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "7E &middot; The quadratic formula",
      html: `
        <p class="lesson-meta"><span class="tag">Lesson 5</span><span class="tag">Textbook 7E</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l5", [
          "Apply the quadratic formula to find the solutions of a quadratic equation.",
          "Use the quadratic formula to determine the $x$-intercepts of a quadratic graph.",
          "Explain how the discriminant can be used to determine the number of $x$-intercepts of a quadratic graph.",
          "Use the axis of symmetry rule to locate the turning point of a quadratic graph.",
        ])}

        <h4>Where the formula comes from</h4>
        <p>Complete the square on the general equation $ax^2 + bx + c = 0$:</p>
        <p>$$x^2 + \\frac bax = -\\frac ca \\ \\Rightarrow\\ \\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2} \\ \\Rightarrow\\ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$</p>
        <p>So the formula is just completing the square done once, for every quadratic at the same time.</p>

        <h4>The discriminant</h4>
        <p>The expression under the root, $\\Delta = b^2 - 4ac$, tells you how many $x$-intercepts exist <b>before</b> you do any solving.</p>
        <table>
          <tr><th>$\\Delta$</th><th>$x$-intercepts</th><th>Picture</th></tr>
          <tr><td>$\\Delta \\gt 0$</td><td>2 distinct</td><td>Crosses the $x$-axis twice</td></tr>
          <tr><td>$\\Delta = 0$</td><td>1 (repeated)</td><td>Touches the axis at the turning point</td></tr>
          <tr><td>$\\Delta \\lt 0$</td><td>0</td><td>Never reaches the axis</td></tr>
        </table>

        <h4>Sketching with the formula</h4>
        <ol class="steps-list">
          <li>$y$-intercept $= c$.</li>
          <li>Calculate $\\Delta$. If it is negative, stop: there are no $x$-intercepts.</li>
          <li>Otherwise use $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$.</li>
          <li>Axis of symmetry $x = -\\dfrac{b}{2a}$. Substitute it into the rule for the turning point's $y$-value.</li>
        </ol>

        <h4>Try it: formula and discriminant</h4>
        <p>Drag $a$, $b$, $c$ and watch $\\Delta$ cross zero. The exact working updates as you go.</p>
        <div class="graph-widget" data-plot="formula"></div>

        <div class="worked">
          <p class="worked-title">Worked example 1: $y = x^2 - 4x - 3$</p>
          <p>$\\Delta = 16 + 12 = 28 \\gt 0$. $x = \\dfrac{4 \\pm \\sqrt{28}}{2} = \\dfrac{4 \\pm 2\\sqrt7}{2} = 2 \\pm \\sqrt 7 \\approx -0.65,\\ 4.65$.</p>
          <p>Axis $x = 2$. Turning point: $y = 4 - 8 - 3 = -7$, so $(2, -7)$. $y$-intercept $-3$.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 2: no $x$-intercepts, $y = x^2 + 2x + 5$</p>
          <p>$\\Delta = 4 - 20 = -16 \\lt 0$. Turning point $(-1, 4)$, above the axis and opening up, so the graph never crosses it.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 3: using $\\Delta$ to find an unknown</p>
          <p>For what values of $k$ does $y = 2x^2 - 4x + k$ have two $x$-intercepts?</p>
          <p>$\\Delta = (-4)^2 - 4(2)(k) = 16 - 8k \\gt 0 \\Rightarrow k \\lt 2$.</p>
        </div>

        <h4>Common mistakes</h4>
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>Writing $-b^2$ when $b$ is negative</td><td>Use brackets: $(-4)^2 = 16$. A calculator turns $-4^2$ into $-16$.</td></tr>
          <tr><td>Dividing only the root by $2a$</td><td>The whole numerator $-b \\pm \\sqrt\\Delta$ is divided by $2a$</td></tr>
          <tr><td>Forgetting the $\\pm$ and giving one answer</td><td>Two values unless $\\Delta = 0$</td></tr>
          <tr><td>Sign of $-b$ when $b$ is already negative</td><td>$-(-4) = +4$</td></tr>
        </table>

        <h4>Practice</h4>
        <div class="problems"></div>
      `,
      afterRender: (el) => {
        PFG.mount.formula(el);
        PFG.problems(el, [
          { tag: "Core", q: "Use the quadratic formula to solve $2x^2 - 3x - 4 = 0$. Give exact and decimal answers.", a: "$\\Delta = 9 + 32 = 41$. $x = \\dfrac{3 \\pm \\sqrt{41}}{4} \\approx 2.35$ or $-0.85$." },
          { tag: "Core", q: "How many $x$-intercepts does $y = 3x^2 - 2x + 5$ have?", a: "$\\Delta = 4 - 60 = -56 \\lt 0$, so none." },
          { tag: "Core", q: "Find $\\Delta$ for $y = x^2 - 6x + 9$ and describe the graph.", a: "$\\Delta = 36 - 36 = 0$. One $x$-intercept at $(3, 0)$, which is also the turning point." },
          { tag: "Core", q: "Sketch $y = x^2 - 2x - 5$, giving exact $x$-intercepts.", a: "$\\Delta = 4 + 20 = 24$. $x = \\dfrac{2 \\pm 2\\sqrt6}{2} = 1 \\pm \\sqrt6$ ($\\approx 3.45,\\ -1.45$). $y$-intercept $-5$. Turning point $(1, -6)$." },
          { tag: "ESQ", q: "For what values of $k$ does $x^2 + 4x + k = 0$ have two solutions?", a: "$\\Delta = 16 - 4k \\gt 0 \\Rightarrow k \\lt 4$." },
          { tag: "ESQ", q: "Find $k$ so that $y = 2x^2 - 4x + k$ has exactly one $x$-intercept.", a: "$\\Delta = 16 - 8k = 0 \\Rightarrow k = 2$." },
          { tag: "Stretch", q: "For what values of $a$ does $y = ax^2 + 6x - 3$ have no $x$-intercepts?", a: "$\\Delta = 36 + 12a \\lt 0 \\Rightarrow a \\lt -3$. (Check: $a = -4$ gives $\\Delta = -12$.)" },
          { tag: "Core", q: "Sketch $y = -x^2 + 4x + 1$ with exact intercepts and turning point.", a: "$\\Delta = 16 + 4 = 20$. $x = \\dfrac{-4 \\pm 2\\sqrt5}{-2} = 2 \\mp \\sqrt5$, so $2 \\pm \\sqrt5$. $y$-intercept 1. Turning point $(2, 5)$, a maximum." },
        ]);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "7F &middot; Applications of parabolas",
      html: `
        <p class="lesson-meta"><span class="tag">Lessons 6&ndash;7</span><span class="tag">Textbook 7F</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l6", [
          "Set up a quadratic model to solve a word problem.",
          "Apply the processes of quadratics to identify key features of a graph and relate them to real-life contexts.",
          "Identify the possible values of a variable in a given context.",
        ])}

        <h4>The modelling routine</h4>
        <ol class="steps-list">
          <li><b>Define</b> the variables with units ($t$ in seconds, $h$ in metres).</li>
          <li><b>Build</b> the rule. Use the given information (a formula, an area, a profit) and simplify to $ax^2 + bx + c$.</li>
          <li><b>Pick the feature</b> the question wants and say what it means in the story.</li>
          <li><b>Check the domain.</b> Negative time or negative length is not sensible, so restrict the variable.</li>
          <li><b>Answer in a sentence</b> with units.</li>
        </ol>

        <h4>What each feature means</h4>
        <table>
          <tr><th>Feature</th><th>Typical meaning</th></tr>
          <tr><td>$y$-intercept</td><td>The starting value (initial height, fixed cost)</td></tr>
          <tr><td>Turning point</td><td>Maximum or minimum: greatest height, largest area, highest profit, and when it happens</td></tr>
          <tr><td>$x$-intercept</td><td>When the output is zero: ball hits the ground, profit breaks even</td></tr>
          <tr><td>Axis of symmetry</td><td>The halfway moment or value: going up takes as long as coming down</td></tr>
        </table>

        <h4>Try it 1: a thrown ball</h4>
        <p>The model $h = -5t^2 + vt + h_0$ uses $g \\approx 10\\ \\text{m/s}^2$ for tidy numbers. $v$ is the launch speed (m/s) and $h_0$ is the release height (m). The solid part of the curve is the sensible domain. The dashed part is just the maths continuing, which the real ball never does.</p>
        <div class="graph-widget" data-plot="ball"></div>

        <h4>Try it 2: a paddock with a river side</h4>
        <p>You have 60 m of fencing for three sides of a rectangle. The fourth side is a river. If the width is $x$, the length is $60 - 2x$, so $A = x(60 - 2x)$. Slide $x$ and find where the area peaks.</p>
        <div class="graph-widget" data-plot="fence"></div>
        <p>The domain is $0 \\lt x \\lt 30$. At $x = 0$ or $x = 30$ there is no paddock at all, which are exactly the $x$-intercepts.</p>

        <div class="worked">
          <p class="worked-title">Worked example 1: projectile, $h = -5t^2 + 20t + 1.5$</p>
          <p><b>Maximum height.</b> Axis $t = -\\dfrac{20}{2(-5)} = 2$. $h(2) = -20 + 40 + 1.5 = 21.5$. The ball reaches 21.5 m after 2 s.</p>
          <p><b>Landing.</b> Solve $-5t^2 + 20t + 1.5 = 0$: $\\Delta = 400 + 30 = 430$, $t = \\dfrac{-20 \\pm \\sqrt{430}}{-10}$. The positive value is $t = \\dfrac{20 + \\sqrt{430}}{10} \\approx 4.07$ s. (The other root is negative, so rejected.)</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 2: maximum area, $A = x(60 - 2x) = -2x^2 + 60x$</p>
          <p>Axis $x = -\\dfrac{60}{2(-2)} = 15$. $A = 15 \\times 30 = 450$. The maximum area is $450\\ \\text{m}^2$ using a 15 m by 30 m paddock.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 3: an arch from two points and a height</p>
          <p>An arch spans 20 m (feet at $x = \\pm 10$) and is 8 m high at the centre.</p>
          <p>$y = a(x + 10)(x - 10)$. Through $(0, 8)$: $8 = a(10)(-10) \\Rightarrow a = -0.08$. Rule: $y = -0.08(x^2 - 100) = -0.08x^2 + 8$.</p>
          <p>Height 6 m from the centre: $y = -0.08(36) + 8 = 5.12$ m.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 4: possible values of a variable</p>
          <p>For the paddock, for what widths is the area at least $400\\ \\text{m}^2$?</p>
          <p>$-2x^2 + 60x \\ge 400 \\Rightarrow x^2 - 30x + 200 \\le 0 \\Rightarrow (x - 10)(x - 20) \\le 0$. A parabola opening up is at or below the axis between its roots: $10 \\le x \\le 20$.</p>
        </div>

        <h4>Common mistakes</h4>
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>Giving both roots of a time equation</td><td>Reject a negative time</td></tr>
          <tr><td>Answering "21.5" with no unit or meaning</td><td>"The maximum height is 21.5 m, reached after 2 s"</td></tr>
          <tr><td>Reporting the vertex $x$-value when asked for the maximum area</td><td>The maximum <b>area</b> is the $y$-value of the turning point</td></tr>
          <tr><td>Forgetting the domain, e.g. a width of 35 m</td><td>State and use the allowed values of the variable</td></tr>
        </table>

        <h4>Practice</h4>
        <div class="problems"></div>
      `,
      afterRender: (el) => {
        PFG.mount.ball(el);
        PFG.mount.fence(el);
        PFG.problems(el, [
          { tag: "Core", q: "A ball has height $h = -5t^2 + 10t + 2$ (metres, seconds). Find its maximum height and when it hits the ground.", a: "Axis $t = 1$, $h(1) = -5 + 10 + 2 = 7$ m. Landing: $-5t^2 + 10t + 2 = 0 \\Rightarrow t = \\dfrac{10 + \\sqrt{140}}{10} \\approx 2.18$ s." },
          { tag: "Core", q: "A rectangular garden has 40 m of fencing around all four sides. Show $A = x(20 - x)$ and find the maximum area.", a: "Width $x$, length $20 - x$ (since $2x + 2L = 40$). Axis $x = 10$, $A = 10 \\times 10 = 100\\ \\text{m}^2$. It is a square." },
          { tag: "Core", q: "An arch has span 12 m (feet at $x = \\pm 6$) and centre height 5 m. Find its rule and its height 3 m from the centre.", a: "$y = a(x+6)(x-6)$, $5 = -36a \\Rightarrow a = -\\tfrac{5}{36}$. At $x = 3$: $y = -\\tfrac5{36}(9 - 36) = 3.75$ m." },
          { tag: "ESQ", q: "Profit is $P = -2x^2 + 40x - 150$ (thousands of dollars, $x$ in hundreds of items). Find the maximum profit and the break-even points.", a: "Axis $x = 10$, $P = -200 + 400 - 150 = 50$, so 50 thousand dollars. Break-even: $x^2 - 20x + 75 = 0 \\Rightarrow (x-5)(x-15) = 0$, so $x = 5$ and $x = 15$ (profit when $5 \\lt x \\lt 15$)." },
          { tag: "Core", q: "80 m of fencing encloses three sides of a paddock (river on the fourth). Find the dimensions and area for the maximum and state the domain of the width.", a: "$A = x(80 - 2x)$. Axis $x = 20$, length 40, $A = 800\\ \\text{m}^2$. Domain $0 \\lt x \\lt 40$." },
          { tag: "Stretch", q: "For the 80 m paddock, find the widths giving an area of at least $600\\ \\text{m}^2$.", a: "$-2x^2 + 80x \\ge 600 \\Rightarrow x^2 - 40x + 300 \\le 0 \\Rightarrow (x - 10)(x - 30) \\le 0$, so $10 \\le x \\le 30$." },
        ]);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "7G &middot; Lines meet parabolas",
      html: `
        <p class="lesson-meta"><span class="tag">Lesson 8</span><span class="tag">Textbook 7G</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l8", [
          "Describe how a line can intersect a parabola at 2, 1 or 0 points.",
          "Find the points of intersection of a line and a parabola using substitution.",
          "Reason that the discriminant can be used to determine the number of points of intersection of a line and a parabola.",
        ])}

        <h4>Three possible pictures</h4>
        <table>
          <tr><th>Line is a&hellip;</th><th>Intersections</th><th>$\\Delta$ of the combined equation</th></tr>
          <tr><td><b>Secant</b> (cuts through)</td><td>2 points</td><td>$\\Delta \\gt 0$</td></tr>
          <tr><td><b>Tangent</b> (just touches)</td><td>1 point</td><td>$\\Delta = 0$</td></tr>
          <tr><td>Misses</td><td>0 points</td><td>$\\Delta \\lt 0$</td></tr>
        </table>

        <h4>Method: set the two $y$-values equal</h4>
        <ol class="steps-list">
          <li>Equate the rules: parabola $=$ line.</li>
          <li>Rearrange to $ax^2 + bx + c = 0$.</li>
          <li>Calculate $\\Delta$ to count the intersections, or solve to find them.</li>
          <li>Substitute each $x$ into the <b>line</b> (the easier rule) to get $y$.</li>
        </ol>

        <h4>Try it: a line against $y = x^2 - 2x - 3$</h4>
        <p>Change the gradient $m$ and intercept $d$ of $y = mx + d$. The readout shows the equation you get when you equate. Try $m = 2$, $d = -7$ for a tangent.</p>
        <div class="graph-widget" data-plot="intersect"></div>

        <div class="worked">
          <p class="worked-title">Worked example 1: $y = x^2$ and $y = x + 2$</p>
          <p>$x^2 = x + 2 \\Rightarrow x^2 - x - 2 = 0 \\Rightarrow (x - 2)(x + 1) = 0$.</p>
          <p>$x = 2 \\Rightarrow y = 4$. $x = -1 \\Rightarrow y = 1$. Intersections: $(2, 4)$ and $(-1, 1)$.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 2: a tangent, $y = x^2$ and $y = 2x - 1$</p>
          <p>$x^2 - 2x + 1 = 0 \\Rightarrow (x - 1)^2 = 0$. One solution, $x = 1$, so the line is a tangent touching at $(1, 1)$. $\\Delta = 4 - 4 = 0$.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 3: finding the gradient for a tangent</p>
          <p>For which $m$ is $y = mx - 1$ tangent to $y = x^2 + 3$?</p>
          <p>$x^2 + 3 = mx - 1 \\Rightarrow x^2 - mx + 4 = 0$. Tangent when $\\Delta = m^2 - 16 = 0$, so $m = \\pm 4$.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 4: irrational points, $y = x^2 - 2x - 3$ and $y = x - 1$</p>
          <p>$x^2 - 3x - 2 = 0$, $\\Delta = 9 + 8 = 17 \\gt 0$, so two points. $x = \\dfrac{3 \\pm \\sqrt{17}}{2}$, with $y = x - 1 = \\dfrac{1 \\pm \\sqrt{17}}{2}$.</p>
        </div>

        <h4>Common mistakes</h4>
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>Stopping after finding $x$</td><td>Intersections are points: find $y$ as well</td></tr>
          <tr><td>Rearranging with a sign slip, e.g. moving $x + 2$ across without changing sign</td><td>Subtract the whole line from the parabola: $x^2 - (x + 2)$</td></tr>
          <tr><td>Substituting $x$ into the parabola and getting a different $y$</td><td>It should match. Using the line is simpler and a built-in check.</td></tr>
          <tr><td>Calling any line with one solution a tangent when the parabola was sideways</td><td>Here parabolas are vertical, so one solution means a tangent</td></tr>
        </table>

        <h4>Practice</h4>
        <div class="problems"></div>
      `,
      afterRender: (el) => {
        PFG.mount.intersect(el);
        PFG.problems(el, [
          { tag: "Core", q: "Find the intersections of $y = x^2$ and $y = 3x - 2$.", a: "$x^2 - 3x + 2 = 0 \\Rightarrow (x-1)(x-2) = 0$. Points $(1, 1)$ and $(2, 4)$." },
          { tag: "Core", q: "Find the intersections of $y = x^2 - 4x + 3$ and $y = x - 1$.", a: "$x^2 - 5x + 4 = 0 \\Rightarrow (x-1)(x-4) = 0$. Points $(1, 0)$ and $(4, 3)$." },
          { tag: "Core", q: "Show that $y = 2x - 3$ does not meet $y = x^2 + 1$.", a: "$x^2 + 1 = 2x - 3 \\Rightarrow x^2 - 2x + 4 = 0$. $\\Delta = 4 - 16 = -12 \\lt 0$, so no intersection." },
          { tag: "ESQ", q: "Find the intersections of $y = x^2 - 2x - 3$ and $y = -x + 3$.", a: "$x^2 - x - 6 = 0 \\Rightarrow (x-3)(x+2) = 0$. $x = 3 \\Rightarrow y = 0$. $x = -2 \\Rightarrow y = 5$. Points $(3, 0)$ and $(-2, 5)$." },
          { tag: "ESQ", q: "Find $m$ so that $y = mx - 4$ is a tangent to $y = x^2 + 5$.", a: "$x^2 - mx + 9 = 0$, $\\Delta = m^2 - 36 = 0 \\Rightarrow m = \\pm 6$." },
          { tag: "Core", q: "For $y = 4x + c$ and $y = x^2$, say how many intersections there are depending on $c$, and find the tangent point.", a: "$x^2 - 4x - c = 0$, $\\Delta = 16 + 4c$. Two points if $c \\gt -4$, tangent if $c = -4$, none if $c \\lt -4$. Tangent at $x = 2$, $y = 4$." },
        ]);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "10A &middot; Functions and notation",
      html: `
        <p class="lesson-meta"><span class="tag">Lesson 9</span><span class="tag">Textbook 10A</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l9", [
          "Define a mathematical relation and a function.",
          "Recognise or test for a function.",
          "Use the standard notation for functions.",
          "State the meaning of the domain and range of a function.",
          "Find the set of allowable $x$-values (domain) and resulting $y$-values (range) of a function.",
        ])}

        <h4>Relations and functions</h4>
        <p>A <b>relation</b> is any rule or set of ordered pairs linking $x$-values to $y$-values. A <b>function</b> is a relation where <b>each $x$-value gives exactly one $y$-value</b>.</p>
        <table>
          <tr><th>Set of pairs</th><th>Function?</th><th>Why</th></tr>
          <tr><td>$\\{(1, 3), (2, 5), (3, 3)\\}$</td><td>Yes</td><td>Two inputs may share an output. Each input has one output.</td></tr>
          <tr><td>$\\{(2, 1), (2, 4), (3, 6)\\}$</td><td>No</td><td>The input 2 gives two outputs</td></tr>
        </table>
        <p>"Many-to-one" is allowed. "One-to-many" is not.</p>

        <h4>The vertical line test</h4>
        <p>A graph is a function if <b>no vertical line crosses it more than once</b>. Pick a relation, then slide the red vertical line across.</p>
        <div class="graph-widget" data-plot="vlt"></div>

        <h4>Function notation</h4>
        <p>$f(x) = 3x^2 - 2x + 1$ is read "$f$ of $x$". The letter before the bracket names the rule. $f(2)$ means <b>substitute 2 for $x$</b>.</p>
        <div class="worked">
          <p class="worked-title">Worked example 1: evaluating</p>
          <p>$f(x) = 3x^2 - 2x + 1$.</p>
          <p>$f(2) = 3(4) - 4 + 1 = 9$. $f(-1) = 3 + 2 + 1 = 6$.</p>
          <p>$f(a + 1) = 3(a+1)^2 - 2(a+1) + 1 = 3a^2 + 6a + 3 - 2a - 2 + 1 = 3a^2 + 4a + 2$.</p>
          <p>Solve $f(x) = 2$: $3x^2 - 2x - 1 = 0 \\Rightarrow (3x + 1)(x - 1) = 0 \\Rightarrow x = 1$ or $x = -\\tfrac13$.</p>
        </div>

        <h4>Domain and range</h4>
        <p>The <b>domain</b> is the set of allowed $x$-values (inputs). The <b>range</b> is the set of resulting $y$-values (outputs). On a graph, the domain is how far it spreads left to right and the range is how far it spreads up and down.</p>
        <table>
          <tr><th>Notation</th><th>Meaning</th><th>Example</th></tr>
          <tr><td>$x \\in \\mathbb{R}$</td><td>All real numbers</td><td>$y = x^2$ has domain $\\mathbb{R}$</td></tr>
          <tr><td>$[a, b]$</td><td>$a \\le x \\le b$ (ends included)</td><td>$[-1, 3]$</td></tr>
          <tr><td>$(a, b)$</td><td>$a \\lt x \\lt b$ (ends excluded)</td><td>$(0, 5)$</td></tr>
          <tr><td>$[a, \\infty)$</td><td>$x \\ge a$ (infinity is never included)</td><td>$[2, \\infty)$</td></tr>
          <tr><td>$\\mathbb{R} \\setminus \\{a\\}$</td><td>Everything except $a$</td><td>$\\mathbb{R} \\setminus \\{3\\}$</td></tr>
        </table>

        <h4>Restrictions that come from the rule</h4>
        <table>
          <tr><th>Rule type</th><th>Problem</th><th>Domain</th></tr>
          <tr><td>$\\dfrac{1}{x - 3}$</td><td>Cannot divide by zero</td><td>$x \\ne 3$</td></tr>
          <tr><td>$\\sqrt{x - 2}$</td><td>No real square root of a negative</td><td>$x \\ge 2$</td></tr>
          <tr><td>$x^2$, $2^x$, polynomials</td><td>No problems</td><td>$\\mathbb{R}$</td></tr>
        </table>

        <div class="worked">
          <p class="worked-title">Worked example 2: domain and range</p>
          <p>$y = \\sqrt{x - 2}$: domain $x \\ge 2$. A square root is never negative, so range $y \\ge 0$.</p>
          <p>$y = \\dfrac{1}{x - 3}$: domain $x \\ne 3$. The output is never 0, so range $y \\ne 0$.</p>
          <p>$y = x^2 - 4$: domain $\\mathbb{R}$. Turning point $(0, -4)$, opens up, so range $y \\ge -4$.</p>
          <p>$f(x) = x^2$ on $-1 \\le x \\lt 3$: lowest value is $f(0) = 0$. At $x = -1$, $y = 1$. As $x$ approaches 3, $y$ approaches 9 but never reaches it. Range $0 \\le y \\lt 9$.</p>
        </div>

        <h4>Common mistakes</h4>
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>$f(a + 1) = f(a) + 1$, or $f(a + b) = f(a) + f(b)$</td><td>Substitute the whole expression and expand. For $f(x) = x^2$, $f(a+1) = a^2 + 2a + 1$.</td></tr>
          <tr><td>Reading $f(x)$ as "$f$ times $x$"</td><td>It means "the output when the input is $x$"</td></tr>
          <tr><td>$f(-x) = -f(x)$</td><td>Only true for special functions. For $f(x) = x^2$, $f(-x) = x^2$ but $-f(x) = -x^2$.</td></tr>
          <tr><td>Using square brackets for an excluded endpoint</td><td>Square includes the end, round excludes it</td></tr>
          <tr><td>Mixing the tests</td><td>Vertical line test: is it a function? (Extension: horizontal line test: does it have an inverse function?)</td></tr>
        </table>

        <h4>Practice</h4>
        <div class="problems"></div>
      `,
      afterRender: (el) => {
        PFG.mount.vlt(el);
        PFG.problems(el, [
          { tag: "Core", q: "$f(x) = 2x - 5$. Find $f(3)$, $f(-2)$ and the value of $x$ where $f(x) = 9$.", a: "$f(3) = 1$, $f(-2) = -9$. $2x - 5 = 9 \\Rightarrow x = 7$." },
          { tag: "Core", q: "$g(x) = x^2 - 3x$. Find $g(4)$, $g(-1)$, $g(a)$ and $g(a + 1)$.", a: "$g(4) = 4$. $g(-1) = 1 + 3 = 4$. $g(a) = a^2 - 3a$. $g(a+1) = (a+1)^2 - 3(a+1) = a^2 - a - 2$." },
          { tag: "ESQ", q: "Which of these are functions? (a) $\\{(1,3),(2,5),(3,3)\\}$ (b) $\\{(2,1),(2,4),(3,6)\\}$ (c) $x^2 + y^2 = 25$ (d) $y = |x|$", a: "(a) Yes. (b) No, $x = 2$ has two outputs. (c) No, a circle fails the vertical line test. (d) Yes." },
          { tag: "Core", q: "State the domain and range of $y = \\sqrt{x + 3}$.", a: "Domain $x \\ge -3$, i.e. $[-3, \\infty)$. Range $y \\ge 0$." },
          { tag: "Core", q: "State the domain and range of $y = \\dfrac{1}{x - 3} + 2$.", a: "Domain $x \\ne 3$. Range $y \\ne 2$ (the output can never equal 2)." },
          { tag: "ESQ", q: "Find the range of $f(x) = x^2 - 2x + 3$ for $x \\in \\mathbb{R}$.", a: "$f(x) = (x-1)^2 + 2$. Turning point $(1, 2)$, minimum, so range $y \\ge 2$." },
          { tag: "Core", q: "Find the range of $f(x) = x^2$ for $-2 \\le x \\le 3$.", a: "Minimum $f(0) = 0$. $f(-2) = 4$, $f(3) = 9$. Range $0 \\le y \\le 9$." },
          { tag: "Stretch", q: "For $f(x) = x^2 - 6$, solve $f(x) = x$.", a: "$x^2 - x - 6 = 0 \\Rightarrow (x - 3)(x + 2) = 0 \\Rightarrow x = 3$ or $x = -2$." },
        ]);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "3F &middot; Exponential graphs",
      html: `
        <p class="lesson-meta"><span class="tag">Lesson 10</span><span class="tag">Textbook 3F</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l10", [
          "Define an exponential relationship.",
          "State the meaning of the term asymptote.",
          "Identify basic features of an exponential graph.",
          "Sketch simple exponential graphs including those involving reflections.",
          "Find the point of intersection of an exponential graph and a horizontal line.",
        ])}

        <h4>What is an exponential relationship?</h4>
        <p>In $y = x^2$ the variable is the base. In an <b>exponential relationship</b> the variable is the <b>exponent</b>:</p>
        <p>$$y = a \\cdot b^x \\qquad (b \\gt 0,\\ b \\ne 1)$$</p>
        <ul>
          <li>$b \\gt 1$: <b>growth</b>. The graph rises faster and faster.</li>
          <li>$0 \\lt b \\lt 1$: <b>decay</b>. The graph falls and flattens out.</li>
          <li>$a$ is the starting value, the $y$-value at $x = 0$.</li>
        </ul>
        <table>
          <tr><th>$x$</th><td>$-2$</td><td>$-1$</td><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td></tr>
          <tr><th>$y = 2^x$</th><td>$\\tfrac14$</td><td>$\\tfrac12$</td><td>1</td><td>2</td><td>4</td><td>8</td></tr>
          <tr><th>$y = \\left(\\tfrac12\\right)^x$</th><td>4</td><td>2</td><td>1</td><td>$\\tfrac12$</td><td>$\\tfrac14$</td><td>$\\tfrac18$</td></tr>
        </table>
        <p>Each step right multiplies $y$ by $b$. Negative powers are reciprocals: $2^{-2} = \\dfrac{1}{2^2} = \\dfrac14$.</p>

        <h4>Asymptotes</h4>
        <p>An <b>asymptote</b> is a line a graph gets closer and closer to but never reaches. For $y = 2^x$ the left side hugs the $x$-axis: $2^x$ is tiny but never 0 or negative. So $y = 0$ is the <b>horizontal asymptote</b>.</p>

        <h4>Features of $y = a \\cdot b^x + k$</h4>
        <table>
          <tr><th>Feature</th><th>Where to find it</th></tr>
          <tr><td>Horizontal asymptote</td><td>$y = k$ (moves with a vertical translation)</td></tr>
          <tr><td>$y$-intercept</td><td>$x = 0$ gives $y = a + k$ (because $b^0 = 1$)</td></tr>
          <tr><td>$x$-intercept</td><td>Set $y = 0$: $b^x = -\\dfrac{k}{a}$. It exists only if $-\\dfrac ka \\gt 0$.</td></tr>
          <tr><td>Range</td><td>$y \\gt k$ if $a \\gt 0$, and $y \\lt k$ if $a \\lt 0$</td></tr>
          <tr><td>Domain</td><td>All real $x$</td></tr>
        </table>

        <h4>Reflections</h4>
        <table>
          <tr><th>Rule</th><th>What it does</th></tr>
          <tr><td>$y = -2^x$</td><td>Reflection of $y = 2^x$ in the $x$-axis (flips below the axis)</td></tr>
          <tr><td>$y = 2^{-x} = \\left(\\tfrac12\\right)^x$</td><td>Reflection in the $y$-axis (growth becomes decay)</td></tr>
        </table>

        <h4>Try it: build any exponential</h4>
        <p>Purple dashed: the asymptote $y = k$. Pink dashed: the horizontal line $y = m$. Drag $m$ to solve $a \\cdot b^x + k = m$ graphically. Keep $b$ away from 1, since $1^x = 1$ is just a flat line.</p>
        <div class="graph-widget" data-plot="exp"></div>

        <h4>Sketching steps</h4>
        <ol class="steps-list">
          <li>Draw the asymptote $y = k$ as a dashed line.</li>
          <li>Plot the $y$-intercept $(0, a + k)$.</li>
          <li>Find the $x$-intercept if there is one.</li>
          <li>Plot one or two more points (say $x = 1$ and $x = -1$).</li>
          <li>Draw a smooth curve that approaches the asymptote but never crosses it.</li>
        </ol>

        <div class="worked">
          <p class="worked-title">Worked example 1: $y = 2^x - 4$</p>
          <p>Asymptote $y = -4$. $y$-intercept $1 - 4 = -3$. $x$-intercept: $2^x = 4 \\Rightarrow x = 2$. Range $y \\gt -4$.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 2 (reflection): $y = -2^x + 4$</p>
          <p>Asymptote $y = 4$. $y$-intercept $-1 + 4 = 3$. $x$-intercept: $2^x = 4 \\Rightarrow x = 2$. The curve sits below the asymptote, so range $y \\lt 4$.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 3: intersecting with a horizontal line</p>
          <p>Where does $y = 3 \\cdot 2^x$ meet $y = 48$?</p>
          <p>$3 \\cdot 2^x = 48 \\Rightarrow 2^x = 16 = 2^4 \\Rightarrow x = 4$. Point $(4, 48)$.</p>
          <p>If the powers do not match, e.g. $2^x = 10$, use a CAS solver or logarithms: $x = \\log_2 10 = \\dfrac{\\ln 10}{\\ln 2} \\approx 3.32$.</p>
        </div>
        <div class="worked">
          <p class="worked-title">Worked example 4: finding the rule from two points</p>
          <p>$y = a \\cdot b^x$ passes through $(0, 3)$ and $(2, 12)$. $x = 0$: $a = 3$. $x = 2$: $3b^2 = 12 \\Rightarrow b^2 = 4 \\Rightarrow b = 2$ (since $b \\gt 0$). Rule: $y = 3 \\cdot 2^x$.</p>
        </div>

        <h4>Common mistakes</h4>
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>$y = 2^x$ passes through the origin</td><td>It passes through $(0, 1)$, never through $(0,0)$</td></tr>
          <tr><td>$y = 2^x$ is a parabola because it curves</td><td>The variable is in the exponent. Exponentials have an asymptote and no turning point.</td></tr>
          <tr><td>Drawing the curve crossing the asymptote</td><td>It gets close and stays on one side</td></tr>
          <tr><td>Thinking $-2^x$ and $2^{-x}$ are the same</td><td>$-2^x$ flips in the $x$-axis. $2^{-x}$ flips in the $y$-axis.</td></tr>
          <tr><td>Asymptote of $y = 2^x - 4$ given as $x = -4$</td><td>It is horizontal: $y = -4$</td></tr>
        </table>

        <h4>Practice</h4>
        <div class="problems"></div>
      `,
      afterRender: (el) => {
        PFG.mount.exp(el);
        PFG.problems(el, [
          { tag: "Core", q: "Complete a table of values for $y = 3^x$ for $x = -2$ to $3$.", a: "$\\tfrac19,\\ \\tfrac13,\\ 1,\\ 3,\\ 9,\\ 27$." },
          { tag: "Core", q: "Compare $y = 2^x$ and $y = \\left(\\tfrac12\\right)^x$.", a: "They are reflections of each other in the $y$-axis. Both pass through $(0, 1)$ and have asymptote $y = 0$. One grows, one decays." },
          { tag: "Core", q: "For $y = 2^x + 3$ state the asymptote, $y$-intercept, range and any $x$-intercept.", a: "Asymptote $y = 3$. $y$-intercept $4$. Range $y \\gt 3$. No $x$-intercept." },
          { tag: "ESQ", q: "For $y = -3^x + 9$ state the asymptote, intercepts and range.", a: "Asymptote $y = 9$. $y$-intercept $8$. $x$-intercept: $3^x = 9 \\Rightarrow x = 2$. Range $y \\lt 9$." },
          { tag: "Core", q: "Find where $y = 5 \\cdot 2^x$ meets $y = 40$.", a: "$2^x = 8 \\Rightarrow x = 3$. Point $(3, 40)$." },
          { tag: "Core", q: "Find where $y = 2^x$ meets $y = 7$ (use CAS or logs).", a: "$x = \\log_2 7 \\approx 2.81$." },
          { tag: "ESQ", q: "$y = a \\cdot 2^x + k$ has asymptote $y = -1$ and passes through $(0, 2)$. Find the rule.", a: "$k = -1$. $a + k = 2 \\Rightarrow a = 3$. Rule: $y = 3 \\cdot 2^x - 1$." },
          { tag: "Stretch", q: "$y = a \\cdot b^x$ passes through $(0, 5)$ and $(1, 15)$. Find the rule and the value at $x = -1$.", a: "$a = 5$, $5b = 15 \\Rightarrow b = 3$. $y = 5 \\cdot 3^x$. At $x = -1$: $\\tfrac53$." },
        ]);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "Revision &middot; Weeks 11&ndash;12",
      html: `
        <p class="lesson-meta"><span class="tag">Lessons 11&ndash;12</span><span class="tag">Revision</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l11", [
          "Use and apply all the skills and concepts covered in the Parabolas, functions and graphs topic.",
          "Organise my notes in my bound reference book to create summary notes using important facts, hints and examples.",
          "Complete the revision questions provided.",
        ])}

        <h4>Building your reference book</h4>
        <p>Your reference book is allowed in the application task, so treat it as an open-book exam you write yourself. Aim for one page per big idea, with <b>a fact, a hint and a worked example</b> on each.</p>
        <table>
          <tr><th>Page</th><th>Must include</th></tr>
          <tr><td>Parabola features</td><td>Turning point, axis, intercepts, labelled sketch</td></tr>
          <tr><td>Transformations</td><td>$y = a(x - h)^2 + k$, sign trap for $h$, finding $a$ from a point</td></tr>
          <tr><td>Factorising</td><td>Toolkit table, Null Factor Law, axis is halfway between intercepts</td></tr>
          <tr><td>Completing the square</td><td>Steps for monic and non-monic, with the "multiply by $a$" warning</td></tr>
          <tr><td>Quadratic formula</td><td>Formula, $\\Delta$ table, one worked example with brackets for negative $b$</td></tr>
          <tr><td>Modelling</td><td>Routine: define, build, feature, domain, sentence. Two worked contexts.</td></tr>
          <tr><td>Line and parabola</td><td>Equate, $\\Delta$ for secant, tangent, miss</td></tr>
          <tr><td>Functions</td><td>Vertical line test, $f(a + 1)$ substitution, domain and range notation</td></tr>
          <tr><td>Exponentials</td><td>$y = a b^x + k$ features, asymptote, reflections, solving $b^x = $ number</td></tr>
        </table>

        <h4>Which method? (choosing a route)</h4>
        <table>
          <tr><th>Situation</th><th>Best tool</th></tr>
          <tr><td>Want $x$-intercepts and the numbers look friendly</td><td>Factorise, then Null Factor Law</td></tr>
          <tr><td>Want the turning point, or the rule is not factorisable</td><td>Complete the square</td></tr>
          <tr><td>Messy numbers or need exact surds fast</td><td>Quadratic formula</td></tr>
          <tr><td>Only need to know <i>how many</i> $x$-intercepts or intersections</td><td>Discriminant</td></tr>
          <tr><td>Know turning point and one point</td><td>$y = a(x - h)^2 + k$, solve for $a$</td></tr>
          <tr><td>Know both $x$-intercepts and one point</td><td>$y = a(x - p)(x - q)$, solve for $a$</td></tr>
          <tr><td>Exponential equals a number with matching powers</td><td>Write both sides with the same base</td></tr>
          <tr><td>Exponential equals a number with unmatched powers</td><td>CAS or logarithms</td></tr>
        </table>

        <h4>Mixed revision questions</h4>
        <div class="problems" data-set="mixed"></div>

        <h4>Error hunt: find what went wrong</h4>
        <div class="problems" data-set="errors"></div>
      `,
      afterRender: (el) => {
        const wraps = el.querySelectorAll(".problems");
        const mixed = [
          { tag: "7B", q: "For $y = \\tfrac12(x - 4)^2 - 3$, give the transformations of $y = x^2$, the turning point, $y$-intercept and $x$-intercepts.", a: "Dilation factor $\\tfrac12$ from the $x$-axis, 4 right, 3 down. Turning point $(4, -3)$. $y$-intercept $\\tfrac12(16) - 3 = 5$. $(x-4)^2 = 6 \\Rightarrow x = 4 \\pm \\sqrt6$." },
          { tag: "7D", q: "Write $y = x^2 - 8x + 5$ in turning point form and find its $x$-intercepts.", a: "$(x - 4)^2 - 11$. $(x-4)^2 = 11 \\Rightarrow x = 4 \\pm \\sqrt{11}$." },
          { tag: "7C", q: "A parabola has $x$-intercepts $-2$ and $4$ and passes through $(0, -8)$. Find its rule and turning point.", a: "$y = a(x+2)(x-4)$, $-8 = a(2)(-4) \\Rightarrow a = 1$. $y = x^2 - 2x - 8$. Axis $x = 1$, turning point $(1, -9)$." },
          { tag: "7F", q: "A rectangle has perimeter 36 m. Find the largest possible area.", a: "Sides $x$ and $18 - x$. $A = x(18 - x)$, maximum at $x = 9$: $81\\ \\text{m}^2$ (a square)." },
          { tag: "7E", q: "For which values of $k$ does $y = x^2 - 6x + k$ meet the $x$-axis?", a: "$\\Delta = 36 - 4k \\ge 0 \\Rightarrow k \\le 9$." },
          { tag: "7G", q: "Show that $y = 2x - 9$ is a tangent to $y = x^2 - 4x$ and find the point of contact.", a: "$x^2 - 4x = 2x - 9 \\Rightarrow x^2 - 6x + 9 = 0 \\Rightarrow (x-3)^2 = 0$. Tangent at $x = 3$, $y = -3$. Point $(3, -3)$." },
          { tag: "10A", q: "$f(x) = \\sqrt{4 - x}$. State the domain and range and find $f(-5)$.", a: "Domain $x \\le 4$. Range $y \\ge 0$. $f(-5) = \\sqrt9 = 3$." },
          { tag: "10A", q: "Is $y = (x - 1)^2$ a function? Is $x = (y - 1)^2$?", a: "$y = (x-1)^2$ is a function. $x = (y-1)^2$ is a sideways parabola: for $x = 4$, $y = 3$ or $y = -1$, so it fails the vertical line test." },
          { tag: "3F", q: "For $y = 2 \\cdot 3^x - 18$ find the asymptote, $y$-intercept and $x$-intercept.", a: "Asymptote $y = -18$. $y$-intercept $2 - 18 = -16$. $2 \\cdot 3^x = 18 \\Rightarrow 3^x = 9 \\Rightarrow x = 2$." },
          { tag: "3F", q: "A population is modelled by $P = 500 \\cdot 1.2^t$. Find $P$ at $t = 0$ and $t = 3$ and describe the growth.", a: "$P(0) = 500$. $P(3) = 500 \\times 1.728 = 864$. It grows by 20% each time period." },
          { tag: "3F", q: "Solve $2^x = \\tfrac18$.", a: "$\\tfrac18 = 2^{-3}$, so $x = -3$." },
          { tag: "Mixed", q: "A kicked ball follows $y = -0.02x(x - 40)$ ($x$ horizontal distance, $y$ height, metres). Find its maximum height, and for what distances it is at least 2 m high.", a: "Axis $x = 20$, $y = -0.02(20)(-20) = 8$ m. $-0.02x^2 + 0.8x \\ge 2 \\Rightarrow x^2 - 40x + 100 \\le 0 \\Rightarrow 20 - \\sqrt{300} \\le x \\le 20 + \\sqrt{300}$, about $2.68 \\le x \\le 37.32$." },
        ];
        const errors = [
          { tag: "Fix it", q: "Solve $x^2 - 3x = 0$. Working: divide by $x$, so $x - 3 = 0$, so $x = 3$.", a: "Dividing by $x$ loses the solution $x = 0$. Factorise: $x(x - 3) = 0 \\Rightarrow x = 0$ or $x = 3$." },
          { tag: "Fix it", q: "\"$x^2 + 6x + 1 = (x + 3)^2$\"", a: "$(x+3)^2 = x^2 + 6x + 9$. Correct: $(x+3)^2 - 8$." },
          { tag: "Fix it", q: "\"The turning point of $y = (x + 4)^2 - 1$ is $(4, -1)$.\"", a: "$x + 4 = x - (-4)$, so $h = -4$. Turning point $(-4, -1)$." },
          { tag: "Fix it", q: "\"$2x^2 - 8x + 3 = 2(x - 2)^2 - 1$\"", a: "$2(x-2)^2 = 2x^2 - 8x + 8$, so subtract 8 then add 3: $2(x-2)^2 - 5$. The correction was only subtracted once, not multiplied by 2." },
          { tag: "Fix it", q: "$f(x) = x^2$. \"$f(a + 1) = a^2 + 1$.\"", a: "$f(a+1) = (a+1)^2 = a^2 + 2a + 1$. Substitute the whole expression, then expand." },
          { tag: "Fix it", q: "\"The quadratic formula is $x = -b \\pm \\dfrac{\\sqrt{b^2 - 4ac}}{2a}$.\"", a: "The whole numerator is divided by $2a$: $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$." },
          { tag: "Fix it", q: "\"$y = 2^x$ passes through the origin and has a turning point.\"", a: "It passes through $(0, 1)$ because $2^0 = 1$. It has no turning point. It has the horizontal asymptote $y = 0$." },
        ];
        PFG.problemsInto(wraps[0], mixed);
        PFG.problemsInto(wraps[1], errors);
      },
    },

    // ------------------------------------------------------------------
    {
      heading: "Application task &middot; Week 13",
      html: `
        <p class="lesson-meta"><span class="tag">Lesson 13</span><span class="tag">Assessment</span></p>
        <h4>I can&hellip;</h4>
        ${PFG.checklist("l13", [
          "Complete an application task.",
          "Use my reference book and the CAS calculator within the assessment task.",
        ])}

        <h4>What an application task usually asks</h4>
        <p>You get a real situation (a bridge, a sports shot, a business, a population) and you must <b>build a model, analyse it, and judge how good it is</b>. The marks are for the thinking and the communication, not only the answer.</p>

        <h4>A reliable structure</h4>
        <table>
          <tr><th>Stage</th><th>What to write</th></tr>
          <tr><td>1. Define</td><td>Variables with units. State any assumptions (ignore air resistance, ground is level).</td></tr>
          <tr><td>2. Model</td><td>Choose the right family (parabola or exponential), find the rule from the given data. Show substitution.</td></tr>
          <tr><td>3. Analyse</td><td>Turning point, intercepts, domain and range, intersections. Each with what it <b>means</b>.</td></tr>
          <tr><td>4. Check</td><td>Test a given data point in your rule. Does a sensible answer come out?</td></tr>
          <tr><td>5. Evaluate</td><td>Where does the model break? (Negative time, a parabola that never levels off, an exponential that grows forever.)</td></tr>
        </table>

        <h4>Choosing the model</h4>
        <table>
          <tr><th>The data&hellip;</th><th>Try</th></tr>
          <tr><td>Rises then falls, or falls then rises, with symmetry</td><td>Parabola</td></tr>
          <tr><td>Multiplies by the same factor each step</td><td>Exponential $y = a b^x$</td></tr>
          <tr><td>Rises steadily towards a limit (levels off)</td><td>Exponential with an asymptote: $y = a b^x + k$</td></tr>
        </table>

        <h4>Using your CAS calculator well</h4>
        <ul>
          <li><b>Graph</b> the model and look at the window before you trust any number.</li>
          <li>Use the <b>table</b> to test whether data matches your rule.</li>
          <li>Use <b>solve</b> for equations, and the <b>intersection</b> or <b>zero</b> tools for graph questions. Write the setup by hand (the equation you solved) so a reader can follow it.</li>
          <li>Use <b>regression</b> only if the task allows it, and still say what the numbers mean.</li>
        </ul>

        <div class="worked">
          <p class="worked-title">Practice scenario: a kicked ball</p>
          <p>A football is kicked from the ground and lands 40 m away after reaching a maximum height of 8 m. A wall of defenders, 2 m tall, stands 9.15 m from the kick. Does the ball clear the wall?</p>
          <p><b>Model.</b> $x$-intercepts at 0 and 40, so $y = ax(x - 40)$. Axis $x = 20$, maximum 8: $8 = a(20)(-20) \\Rightarrow a = -0.02$. So $y = -0.02x(x - 40) = -0.02x^2 + 0.8x$.</p>
          <p><b>Height 10 m from the kicker.</b> $y = -0.02(10)(-30) = 6$ m.</p>
          <p><b>The wall.</b> At $x = 9.15$: $y = -0.02(9.15)(9.15 - 40) \\approx 5.65$ m, which is above 2 m, so the ball clears the wall.</p>
          <p><b>At least 2 m high.</b> $-0.02x^2 + 0.8x - 2 \\ge 0 \\Rightarrow x^2 - 40x + 100 \\le 0 \\Rightarrow x = 20 \\pm \\sqrt{300}$. The ball is above 2 m between about 2.7 m and 37.3 m from the kick.</p>
          <p><b>Evaluate.</b> The model ignores spin and air resistance. The domain is $0 \\le x \\le 40$, because beyond that the ball would be underground.</p>
        </div>

        <h4>Marking-style checklist</h4>
        <ul>
          <li>Every variable has units and a meaning.</li>
          <li>Every number you quote has a sentence connecting it to the context.</li>
          <li>Equations you solve on CAS are written out by hand.</li>
          <li>A domain restriction is stated and used.</li>
          <li>You commented on at least one limitation of the model.</li>
        </ul>
      `,
      afterRender: () => {},
    },

    // ------------------------------------------------------------------
    {
      heading: "Formula sheet",
      html: `
        <h4>Parabolas</h4>
        <table>
          <tr><th>Item</th><th>Formula</th></tr>
          <tr><td>General form</td><td>$y = ax^2 + bx + c$ &nbsp; ($y$-intercept $c$)</td></tr>
          <tr><td>Turning point form</td><td>$y = a(x - h)^2 + k$ &nbsp; (turning point $(h, k)$)</td></tr>
          <tr><td>Factorised form</td><td>$y = a(x - p)(x - q)$ &nbsp; ($x$-intercepts $p$, $q$)</td></tr>
          <tr><td>Axis of symmetry</td><td>$x = -\\dfrac{b}{2a}$, or halfway between the $x$-intercepts</td></tr>
          <tr><td>Turning point</td><td>$\\left(-\\dfrac{b}{2a},\\ c - \\dfrac{b^2}{4a}\\right)$</td></tr>
          <tr><td>Completing the square</td><td>$ax^2 + bx + c = a\\left(x + \\dfrac{b}{2a}\\right)^2 + c - \\dfrac{b^2}{4a}$</td></tr>
          <tr><td>Quadratic formula</td><td>$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$</td></tr>
          <tr><td>Discriminant</td><td>$\\Delta = b^2 - 4ac$: $\\gt 0$ two, $= 0$ one, $\\lt 0$ none</td></tr>
          <tr><td>Null Factor Law</td><td>$AB = 0 \\Rightarrow A = 0$ or $B = 0$</td></tr>
          <tr><td>Difference of two squares</td><td>$a^2 - b^2 = (a - b)(a + b)$</td></tr>
          <tr><td>Line meets parabola</td><td>Equate, rearrange to $ax^2 + bx + c = 0$, use $\\Delta$: secant, tangent, miss</td></tr>
        </table>
        <h4>Functions</h4>
        <table>
          <tr><th>Item</th><th>Notes</th></tr>
          <tr><td>Function</td><td>Each $x$ has exactly one $y$. Vertical line test.</td></tr>
          <tr><td>$f(a)$</td><td>Substitute $a$ for every $x$</td></tr>
          <tr><td>Domain</td><td>Allowed $x$-values. Exclude zero denominators and negative square roots.</td></tr>
          <tr><td>Range</td><td>Resulting $y$-values. For a parabola, use the turning point.</td></tr>
          <tr><td>Interval notation</td><td>$[a, b]$ includes ends, $(a, b)$ excludes ends</td></tr>
        </table>
        <h4>Exponentials</h4>
        <table>
          <tr><th>Item</th><th>Formula</th></tr>
          <tr><td>Rule</td><td>$y = a \\cdot b^x + k$, $b \\gt 0$, $b \\ne 1$</td></tr>
          <tr><td>Asymptote</td><td>$y = k$</td></tr>
          <tr><td>$y$-intercept</td><td>$a + k$</td></tr>
          <tr><td>Growth / decay</td><td>$b \\gt 1$ growth, $0 \\lt b \\lt 1$ decay</td></tr>
          <tr><td>Reflections</td><td>$y = -b^x$ in the $x$-axis, $y = b^{-x}$ in the $y$-axis</td></tr>
          <tr><td>Solve $b^x = N$</td><td>Match bases, or $x = \\dfrac{\\ln N}{\\ln b}$</td></tr>
        </table>
      `,
    },
  ],
});
