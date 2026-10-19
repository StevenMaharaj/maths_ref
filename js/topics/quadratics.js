// Content module for the "Quadratics" topic.
// Registered onto window.MATH_TOPICS so js/main.js can render it generically.

window.MATH_TOPICS = window.MATH_TOPICS || [];

window.MATH_TOPICS.push({
  id: "quadratics",
  title: "Quadratics",
  blurb: "Forms, graphs, solving methods, the discriminant, and modelling.",
  sections: [
    {
      heading: "1. Definitions",
      html: `
        <p>A <b>quadratic function</b> is a polynomial function of degree 2:</p>
        <p>$$f(x) = ax^2 + bx + c, \\qquad a, b, c \\in \\mathbb{R},\\ a \\neq 0$$</p>
        <p>If $a = 0$ the function is linear, so $a \\neq 0$ is part of the definition.</p>
        <table>
          <tr><th>Term</th><th>Meaning</th></tr>
          <tr><td>Quadratic equation</td><td>$ax^2 + bx + c = 0$</td></tr>
          <tr><td>Roots / solutions / zeros</td><td>Values of $x$ that make $f(x) = 0$</td></tr>
          <tr><td>Parabola</td><td>The graph of a quadratic function</td></tr>
          <tr><td>Leading coefficient</td><td>$a$</td></tr>
          <tr><td>Constant term</td><td>$c$ (also the $y$-intercept)</td></tr>
          <tr><td>Monic quadratic</td><td>One with $a = 1$</td></tr>
          <tr><td>Turning point / vertex</td><td>The maximum or minimum point</td></tr>
          <tr><td>Axis of symmetry</td><td>The vertical line through the vertex</td></tr>
        </table>
      `,
    },
    {
      heading: "2. The Three Forms",
      html: `
        <table>
          <tr><th>Form</th><th>Equation</th><th>Reads off directly</th></tr>
          <tr><td>General</td><td>$y = ax^2 + bx + c$</td><td>$y$-intercept $c$, concavity from $a$</td></tr>
          <tr><td>Turning point (vertex)</td><td>$y = a(x - h)^2 + k$</td><td>Vertex $(h, k)$, axis $x = h$</td></tr>
          <tr><td>Factored (intercept)</td><td>$y = a(x - r_1)(x - r_2)$</td><td>$x$-intercepts $r_1, r_2$</td></tr>
        </table>
        <p class="note">UK and some US texts call $ax^2+bx+c$ "standard form". Other US texts use "standard form" for vertex form — check your course's convention.</p>
      `,
    },
    {
      heading: "3. Graph Features — try it yourself",
      html: `
        <p>Drag the sliders below to see how $a$, $b$ and $c$ reshape the parabola $y = ax^2 + bx + c$. Watch the vertex (purple), $y$-intercept (orange) and roots (green) move.</p>
        <div class="graph-widget" id="quad-graph-1"></div>
        <ul>
          <li>$a > 0$: concave up, vertex is a <b>minimum</b>. $a < 0$: concave down, vertex is a <b>maximum</b>.</li>
          <li>Larger $|a|$ &rarr; narrower parabola. Smaller $|a|$ &rarr; wider.</li>
          <li>Vertex: $x_{\\text{vertex}} = -\\dfrac{b}{2a}$, and $y_{\\text{vertex}} = c - \\dfrac{b^2}{4a} = -\\dfrac{\\Delta}{4a}$</li>
          <li>Axis of symmetry: $x = -\\dfrac{b}{2a}$</li>
        </ul>
      `,
      afterRender: () => createQuadraticGraph(document.getElementById("quad-graph-1"), { a: 1, b: 0, c: 0 }),
    },
    {
      heading: "4. Converting Between Forms",
      html: `
        <h3>Completing the square (monic)</h3>
        <p>$$x^2 + bx + c = \\left(x + \\frac{b}{2}\\right)^2 - \\frac{b^2}{4} + c$$</p>
        <p><b>Example.</b> $x^2 + 6x + 5 = (x+3)^2 - 4$. Vertex $(-3,-4)$.</p>
        <h3>Non-monic</h3>
        <p>$$2x^2 - 12x + 11 = 2(x-3)^2 - 7$$</p>
        <p class="note">The compensation term gets multiplied by $a$. Forgetting this is the most common error in this skill.</p>
        <p><b>General result:</b></p>
        <p>$$ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2 - 4ac}{4a}$$</p>
      `,
    },
    {
      heading: "5. Solving Quadratic Equations",
      html: `
        <p>Always rearrange to $ax^2 + bx + c = 0$ first. Never divide both sides by an expression containing $x$ — you lose a solution.</p>
        <h3>5.1 Factorising</h3>
        <p><b>Null factor law:</b> if $PQ = 0$ then $P = 0$ or $Q = 0$.</p>
        <p>$$x^2 - 5x + 6 = (x - 2)(x - 3) = 0 \\implies x = 2 \\text{ or } 3$$</p>
        <table>
          <tr><th>Pattern</th><th>Factorisation</th></tr>
          <tr><td>Difference of two squares</td><td>$p^2 - q^2 = (p-q)(p+q)$</td></tr>
          <tr><td>Perfect square (+)</td><td>$p^2+2pq+q^2=(p+q)^2$</td></tr>
          <tr><td>Perfect square (&minus;)</td><td>$p^2-2pq+q^2=(p-q)^2$</td></tr>
          <tr><td>Common factor</td><td>$ax^2+bx = x(ax+b)$</td></tr>
        </table>
        <h3>5.4 The quadratic formula</h3>
        <p>$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$</p>
        <p><b>Example.</b> $2x^2+3x-4=0$: $\\Delta = 41$, $x = \\dfrac{-3\\pm\\sqrt{41}}{4}$</p>
        <h3>5.5 Which method?</h3>
        <table>
          <tr><th>Situation</th><th>Best method</th></tr>
          <tr><td>Integer coefficients, rational roots likely</td><td>Factorise</td></tr>
          <tr><td>$b=0$, or already vertex form</td><td>Square roots</td></tr>
          <tr><td>Need the vertex too</td><td>Complete the square</td></tr>
          <tr><td>Messy/decimal/irrational roots</td><td>Quadratic formula</td></tr>
          <tr><td>Parameters in coefficients</td><td>Formula or discriminant</td></tr>
        </table>
      `,
    },
    {
      heading: "6. The Discriminant",
      html: `
        <p>$$\\Delta = b^2 - 4ac$$</p>
        <table>
          <tr><th>$\\Delta$</th><th>Roots</th><th>Graph</th></tr>
          <tr><td>$\\Delta > 0$</td><td>Two distinct real roots</td><td>Crosses the $x$-axis twice</td></tr>
          <tr><td>$\\Delta = 0$</td><td>One repeated real root</td><td>Touches the $x$-axis at the vertex</td></tr>
          <tr><td>$\\Delta < 0$</td><td>No real roots</td><td>Entirely above or below the axis</td></tr>
        </table>
        <p class="note">Try dragging $a$, $b$, $c$ in the graph above until $\\Delta$ (shown in the readout) crosses zero — watch the roots appear and disappear.</p>
      `,
    },
    {
      heading: "7. Sum and Product of Roots (Vieta)",
      html: `
        <p>If $\\alpha, \\beta$ are the roots of $ax^2+bx+c=0$:</p>
        <p>$$\\alpha + \\beta = -\\frac{b}{a}, \\qquad \\alpha\\beta = \\frac{c}{a}$$</p>
        <table>
          <tr><th>Expression</th><th>In terms of $S=\\alpha+\\beta$, $P=\\alpha\\beta$</th></tr>
          <tr><td>$\\alpha^2+\\beta^2$</td><td>$S^2-2P$</td></tr>
          <tr><td>$(\\alpha-\\beta)^2$</td><td>$S^2-4P$</td></tr>
          <tr><td>$\\alpha^3+\\beta^3$</td><td>$S^3-3PS$</td></tr>
        </table>
        <p class="note">Sum is $-b/a$, not $b/a$. Most Vieta errors come from this sign.</p>
      `,
    },
    {
      heading: "8. Finding the Equation of a Quadratic",
      html: `
        <table>
          <tr><th>Given</th><th>Use</th></tr>
          <tr><td>Vertex $(h,k)$ + one point</td><td>$y=a(x-h)^2+k$, sub point for $a$</td></tr>
          <tr><td>Both $x$-intercepts + one point</td><td>$y=a(x-r_1)(x-r_2)$, sub point for $a$</td></tr>
          <tr><td>Three general points</td><td>$y=ax^2+bx+c$, solve 3&times;3 system</td></tr>
        </table>
        <p><b>Example.</b> Vertex $(2,-3)$, through $(0,5)$: $5 = a(0-2)^2-3 \\implies a=2 \\implies y=2(x-2)^2-3$</p>
      `,
    },
    {
      heading: "9. Transformations",
      html: `
        <p>Starting from $y=x^2$, the graph of $y=a(x-h)^2+k$ comes from dilation by $|a|$, reflection if $a<0$, then translation $h$ right and $k$ up.</p>
        <table>
          <tr><th>Change</th><th>Effect</th></tr>
          <tr><td>$y=f(x)+k$</td><td>Up $k$</td></tr>
          <tr><td>$y=f(x-h)$</td><td>Right $h$</td></tr>
          <tr><td>$y=af(x)$</td><td>Dilate by $a$ from $x$-axis</td></tr>
          <tr><td>$y=-f(x)$</td><td>Reflect in $x$-axis</td></tr>
          <tr><td>$y=f(-x)$</td><td>Reflect in $y$-axis</td></tr>
        </table>
      `,
    },
    {
      heading: "10. Quadratic Inequalities",
      html: `
        <p><b>Method:</b> move everything to one side, find the roots, sketch, read off the region.</p>
        <p><b>Example.</b> $x^2-x-6 \\lt 0 \\implies (x-3)(x+2) \\lt 0$, roots $-2,3$, concave up &rarr; below axis between roots: $-2 \\lt x \\lt 3$.</p>
        <p class="note"><b>Trap:</b> $x^2>4$ does not mean $x>2$. It means $x<-2$ or $x>2$.</p>
      `,
    },
    {
      heading: "11. Intersections with Lines and Tangency",
      html: `
        <p>Set $ax^2+bx+c = mx+d$, giving $ax^2+(b-m)x+(c-d)=0$. The discriminant of this classifies the line:</p>
        <table>
          <tr><th>$\\Delta$</th><th>Line is</th></tr>
          <tr><td>$>0$</td><td>A secant (two points)</td></tr>
          <tr><td>$=0$</td><td>A tangent (one point)</td></tr>
          <tr><td>$<0$</td><td>Misses the parabola</td></tr>
        </table>
      `,
    },
    {
      heading: "12. Hidden Quadratics",
      html: `
        <p>Any equation $a[g(x)]^2+b\\,g(x)+c=0$ is a quadratic in $u=g(x)$.</p>
        <p><b>Biquadratic.</b> $x^4-5x^2+4=0$, let $u=x^2$: $u^2-5u+4=0 \\implies u=1,4 \\implies x=\\pm1,\\pm2$</p>
        <p class="note">Reject impossible values of $u$: $3^x$ and $e^x$ are always positive; $\\sin\\theta,\\cos\\theta \\in [-1,1]$; $x^2\\ge 0$.</p>
      `,
    },
    {
      heading: "13. Complex Roots",
      html: `
        <p>When $\\Delta<0$, the formula still works using $i=\\sqrt{-1}$.</p>
        <p><b>Example.</b> $x^2-2x+5=0$: $\\Delta=-16$, $x = \\dfrac{2\\pm4i}{2} = 1\\pm2i$</p>
        <ul>
          <li>Real coefficients &rarr; complex roots come in conjugate pairs.</li>
          <li>Vieta still holds for complex roots.</li>
          <li>A quadratic with roots $p\\pm qi$ is $(x-p)^2+q^2$.</li>
        </ul>
      `,
    },
    {
      heading: "14. Domain, Range and Inverses",
      html: `
        <p>Range of $y=a(x-h)^2+k$ on $\\mathbb{R}$: $a>0 \\Rightarrow [k,\\infty)$, $a<0 \\Rightarrow (-\\infty,k]$.</p>
        <p>A quadratic on $\\mathbb{R}$ is many-to-one, so it has no inverse unless you restrict the domain to one side of the vertex.</p>
      `,
    },
    {
      heading: "15. Modelling and Optimisation",
      html: `
        <table>
          <tr><th>Context</th><th>Typical model</th></tr>
          <tr><td>Projectile height</td><td>$h(t) = -\\tfrac12 gt^2+v_0t+h_0$</td></tr>
          <tr><td>Area with fixed perimeter</td><td>$A(x)=x(L-x)$</td></tr>
          <tr><td>Revenue from price</td><td>$R=p\\cdot q(p)$</td></tr>
        </table>
        <p><b>Fencing example.</b> $A(x)=x(100-2x)=-2x^2+100x$, vertex at $x=25$, max area $1250\\,\\text{m}^2$.</p>
      `,
    },
    {
      heading: "16. Calculus Connections",
      html: `
        <p>$f(x)=ax^2+bx+c \\implies f'(x)=2ax+b$. Setting $f'(x)=0$ gives $x=-\\dfrac{b}{2a}$, the vertex — the calculus proof of the vertex formula.</p>
        <p>$$\\int (ax^2+bx+c)\\,dx = \\frac{a}{3}x^3+\\frac{b}{2}x^2+cx+C$$</p>
        <p>Area between a parabola and the $x$-axis (roots $r_1 \\lt r_2$): $\\dfrac{|a|(r_2-r_1)^3}{6}$</p>
      `,
    },
    {
      heading: "18. Common Mistakes",
      html: `
        <table>
          <tr><th>Mistake</th><th>Fix</th></tr>
          <tr><td>Dividing by $x$: $x^2=3x \\Rightarrow x=3$</td><td>Factor: $x(x-3)=0 \\Rightarrow x=0$ or $3$</td></tr>
          <tr><td>Forgetting $\\pm$</td><td>$x^2=9 \\Rightarrow x=\\pm3$</td></tr>
          <tr><td>Completing the square without scaling by $a$</td><td>$2(x^2-6x)=2(x-3)^2-18$, not $-9$</td></tr>
          <tr><td>Vieta sum sign</td><td>$\\alpha+\\beta=-b/a$</td></tr>
        </table>
      `,
    },
    {
      heading: "19. Practice Problems",
      html: `<div class="problems"></div>`,
      afterRender: (sectionEl) => {
        const problems = [
          { q: "Solve $3x^2 - 5x - 2 = 0$ by factorising.", a: "$(3x+1)(x-2)=0 \\implies x=2$ or $x=-\\tfrac13$" },
          { q: "Write $x^2+6x+5$ in turning point form.", a: "$(x+3)^2-4$, vertex $(-3,-4)$" },
          { q: "Solve $x^2-4x-1=0$ exactly.", a: "$x = 2 \\pm \\sqrt5$" },
          { q: "Find $k$ so $x^2+kx+9=0$ has exactly one solution.", a: "$k=\\pm6$" },
          { q: "Solve $2x^2-3x-5 \\ge 0$.", a: "$x \\le -1$ or $x \\ge \\tfrac52$" },
          { q: "Solve $9^x - 4\\cdot3^x+3=0$.", a: "Let $u=3^x$: $u=1,3 \\implies x=0,1$" },
        ];
        const wrap = sectionEl.querySelector(".problems");
        wrap.innerHTML = problems.map((p, i) => `
          <div class="problem" data-idx="${i}">
            <div class="q">Q${i + 1}. ${p.q}</div>
            <div class="answer"><div class="answer-inner"><div class="answer-content">${p.a}</div></div></div>
          </div>
        `).join("");
        wrap.querySelectorAll(".problem").forEach((el) => {
          el.querySelector(".q").addEventListener("click", () => {
            el.classList.toggle("revealed");
          });
        });
        if (window.renderMathIn) window.renderMathIn(wrap);
      },
    },
    {
      heading: "20. Formula Sheet",
      html: `
        <table>
          <tr><th>Item</th><th>Formula</th></tr>
          <tr><td>Vertex form</td><td>$y=a(x-h)^2+k$</td></tr>
          <tr><td>Factored form</td><td>$y=a(x-r_1)(x-r_2)$</td></tr>
          <tr><td>Quadratic formula</td><td>$x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$</td></tr>
          <tr><td>Discriminant</td><td>$\\Delta=b^2-4ac$</td></tr>
          <tr><td>Vertex</td><td>$\\left(-\\dfrac{b}{2a}, -\\dfrac{\\Delta}{4a}\\right)$</td></tr>
          <tr><td>Sum of roots</td><td>$-\\dfrac{b}{a}$</td></tr>
          <tr><td>Product of roots</td><td>$\\dfrac{c}{a}$</td></tr>
        </table>
      `,
    },
  ],
});
