function h() {
}
function M(t) {
  return t();
}
function U() {
  return /* @__PURE__ */ Object.create(null);
}
function k(t) {
  t.forEach(M);
}
function N(t) {
  return typeof t == "function";
}
function q(t, n) {
  return t != t ? n == n : t !== n || t && typeof t == "object" || typeof t == "function";
}
function P(t) {
  t.parentNode.removeChild(t);
}
let y;
function b(t) {
  y = t;
}
function C() {
  if (!y)
    throw new Error("Function called outside component initialization");
  return y;
}
const m = [], L = [], E = [], B = [], z = Promise.resolve();
let O = !1;
function R(t) {
  E.push(t);
}
const j = /* @__PURE__ */ new Set();
let v = 0;
function S() {
  const t = y;
  do {
    for (; v < m.length; ) {
      const n = m[v];
      v++, b(n), A(n.$$);
    }
    for (b(null), m.length = 0, v = 0; L.length; )
      L.pop()();
    for (let n = 0; n < E.length; n += 1) {
      const o = E[n];
      j.has(o) || (j.add(o), o());
    }
    E.length = 0;
  } while (m.length);
  for (; B.length; )
    B.pop()();
  O = !1, j.clear(), b(t);
}
function A(t) {
  if (t.fragment !== null) {
    t.update(), k(t.before_update);
    const n = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, n), t.after_update.forEach(R);
  }
}
const F = /* @__PURE__ */ new Set();
function H(t, n) {
  t.$$.dirty[0] === -1 && (m.push(t), O || (O = !0, z.then(S)), t.$$.dirty.fill(0)), t.$$.dirty[n / 31 | 0] |= 1 << n % 31;
}
function T(t, n, o, r, u, p, f, _ = [-1]) {
  const s = y;
  b(t);
  const e = t.$$ = { fragment: null, ctx: [], props: p, update: h, not_equal: u, bound: U(), on_mount: [], on_destroy: [], on_disconnect: [], before_update: [], after_update: [], context: new Map(n.context || (s ? s.$$.context : [])), callbacks: U(), dirty: _, skip_bound: !1, root: n.target || s.$$.root };
  f && f(e.root);
  let $ = !1;
  if (e.ctx = o ? o(t, n.props || {}, (c, a, ...i) => {
    const d = i.length ? i[0] : a;
    return e.ctx && u(e.ctx[c], e.ctx[c] = d) && (!e.skip_bound && e.bound[c] && e.bound[c](d), $ && H(t, c)), a;
  }) : [], e.update(), $ = !0, k(e.before_update), e.fragment = !!r && r(e.ctx), n.target) {
    if (n.hydrate) {
      const c = function(a) {
        return Array.from(a.childNodes);
      }(n.target);
      e.fragment && e.fragment.l(c), c.forEach(P);
    } else
      e.fragment && e.fragment.c();
    n.intro && (l = t.$$.fragment) && l.i && (F.delete(l), l.i(void 0)), function(c, a, i, d) {
      const { fragment: x, after_update: w } = c.$$;
      x && x.m(a, i), d || R(() => {
        const g = c.$$.on_mount.map(M).filter(N);
        c.$$.on_destroy ? c.$$.on_destroy.push(...g) : k(g), c.$$.on_mount = [];
      }), w.forEach(R);
    }(t, n.target, n.anchor, n.customElement), S();
  }
  var l;
  b(s);
}
class D {
  $destroy() {
    (function(n, o) {
      const r = n.$$;
      r.fragment !== null && (k(r.on_destroy), r.fragment && r.fragment.d(1), r.on_destroy = r.fragment = null, r.ctx = []);
    })(this), this.$destroy = h;
  }
  $on(n, o) {
    if (!N(o))
      return h;
    const r = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
    return r.push(o), () => {
      const u = r.indexOf(o);
      u !== -1 && r.splice(u, 1);
    };
  }
  $set(n) {
    var o;
    this.$$set && (o = n, Object.keys(o).length !== 0) && (this.$$.skip_bound = !0, this.$$set(n), this.$$.skip_bound = !1);
  }
}
function G(t) {
  let n;
  return { c() {
    n = document.createElement("div");
  }, m(o, r) {
    (function(u, p, f) {
      u.insertBefore(p, f || null);
    })(o, n, r), t[3](n);
  }, p: h, i: h, o: h, d(o) {
    o && P(n), t[3](null);
  } };
}
function I(t, n, o) {
  let r, { src: u } = n, { props: p = {} } = n;
  const f = function() {
    const s = C();
    return (e, $, { cancelable: l = !1 } = {}) => {
      const c = s.$$.callbacks[e];
      if (c) {
        const a = function(i, d, { bubbles: x = !1, cancelable: w = !1 } = {}) {
          const g = document.createEvent("CustomEvent");
          return g.initCustomEvent(i, x, w, d), g;
        }(e, $, { cancelable: l });
        return c.slice().forEach((i) => {
          i.call(s, a);
        }), !a.defaultPrevented;
      }
      return !0;
    };
  }();
  var _;
  return _ = async () => {
    u && async function({ text: s, target: e, props: $ }) {
      f("target", e);
      const l = new Blob([s], { type: "text/javascript" }), c = URL.createObjectURL(l), a = (await import(c)).default;
      f("ready", a), e.innerHTML = "";
      const i = new a({ target: e, props: $ });
      c && URL.revokeObjectURL(c), f("mounted", i), i.$on("change", (d) => {
        f("change", d.detail);
      });
    }({ text: u, target: r, props: p });
  }, C().$$.on_mount.push(_), t.$$set = (s) => {
    "src" in s && o(1, u = s.src), "props" in s && o(2, p = s.props);
  }, [r, u, p, function(s) {
    L[s ? "unshift" : "push"](() => {
      r = s, o(0, r);
    });
  }];
}
class J extends D {
  constructor(n) {
    super(), T(this, n, I, G, q, { src: 1, props: 2 });
  }
}
export {
  J as default
};
