var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i7 = decorators.length - 1, decorator; i7 >= 0; i7--)
    if (decorator = decorators[i7])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/@lit/reactive-element/css-tag.js
var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e = Symbol();
var s = class {
  constructor(t7, s8) {
    if (s8 !== e)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t7;
  }
  get styleSheet() {
    return t && this.t === void 0 && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
  }
  toString() {
    return this.cssText;
  }
};
var n = new Map();
var o = (t7) => {
  let o8 = n.get(t7);
  return o8 === void 0 && n.set(t7, o8 = new s(t7, e)), o8;
};
var r = (t7) => o(typeof t7 == "string" ? t7 : t7 + "");
var i = (t7, ...e7) => {
  const n8 = t7.length === 1 ? t7[0] : e7.reduce((e8, n9, o8) => e8 + ((t8) => {
    if (t8 instanceof s)
      return t8.cssText;
    if (typeof t8 == "number")
      return t8;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n9) + t7[o8 + 1], t7[0]);
  return o(n8);
};
var S = (e7, s8) => {
  t ? e7.adoptedStyleSheets = s8.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet) : s8.forEach((t7) => {
    const s9 = document.createElement("style");
    s9.textContent = t7.cssText, e7.appendChild(s9);
  });
};
var u = t ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
  let e7 = "";
  for (const s8 of t8.cssRules)
    e7 += s8.cssText;
  return r(e7);
})(t7) : t7;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2;
var h;
var r2;
var o2 = { toAttribute(t7, i7) {
  switch (i7) {
    case Boolean:
      t7 = t7 ? "" : null;
      break;
    case Object:
    case Array:
      t7 = t7 == null ? t7 : JSON.stringify(t7);
  }
  return t7;
}, fromAttribute(t7, i7) {
  let s8 = t7;
  switch (i7) {
    case Boolean:
      s8 = t7 !== null;
      break;
    case Number:
      s8 = t7 === null ? null : Number(t7);
      break;
    case Object:
    case Array:
      try {
        s8 = JSON.parse(t7);
      } catch (t8) {
        s8 = null;
      }
  }
  return s8;
} };
var n2 = (t7, i7) => i7 !== t7 && (i7 == i7 || t7 == t7);
var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
var a = class extends HTMLElement {
  constructor() {
    super(), this.\u03A0i = new Map(), this.\u03A0o = void 0, this.\u03A0l = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.\u03A0h = null, this.u();
  }
  static addInitializer(t7) {
    var i7;
    (i7 = this.v) !== null && i7 !== void 0 || (this.v = []), this.v.push(t7);
  }
  static get observedAttributes() {
    this.finalize();
    const t7 = [];
    return this.elementProperties.forEach((i7, s8) => {
      const e7 = this.\u03A0p(s8, i7);
      e7 !== void 0 && (this.\u03A0m.set(e7, s8), t7.push(e7));
    }), t7;
  }
  static createProperty(t7, i7 = l) {
    if (i7.state && (i7.attribute = false), this.finalize(), this.elementProperties.set(t7, i7), !i7.noAccessor && !this.prototype.hasOwnProperty(t7)) {
      const s8 = typeof t7 == "symbol" ? Symbol() : "__" + t7, e7 = this.getPropertyDescriptor(t7, s8, i7);
      e7 !== void 0 && Object.defineProperty(this.prototype, t7, e7);
    }
  }
  static getPropertyDescriptor(t7, i7, s8) {
    return { get() {
      return this[i7];
    }, set(e7) {
      const h5 = this[t7];
      this[i7] = e7, this.requestUpdate(t7, h5, s8);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t7) {
    return this.elementProperties.get(t7) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t7 = Object.getPrototypeOf(this);
    if (t7.finalize(), this.elementProperties = new Map(t7.elementProperties), this.\u03A0m = new Map(), this.hasOwnProperty("properties")) {
      const t8 = this.properties, i7 = [...Object.getOwnPropertyNames(t8), ...Object.getOwnPropertySymbols(t8)];
      for (const s8 of i7)
        this.createProperty(s8, t8[s8]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i7) {
    const s8 = [];
    if (Array.isArray(i7)) {
      const e7 = new Set(i7.flat(1 / 0).reverse());
      for (const i8 of e7)
        s8.unshift(u(i8));
    } else
      i7 !== void 0 && s8.push(u(i7));
    return s8;
  }
  static \u03A0p(t7, i7) {
    const s8 = i7.attribute;
    return s8 === false ? void 0 : typeof s8 == "string" ? s8 : typeof t7 == "string" ? t7.toLowerCase() : void 0;
  }
  u() {
    var t7;
    this.\u03A0g = new Promise((t8) => this.enableUpdating = t8), this.L = new Map(), this.\u03A0_(), this.requestUpdate(), (t7 = this.constructor.v) === null || t7 === void 0 || t7.forEach((t8) => t8(this));
  }
  addController(t7) {
    var i7, s8;
    ((i7 = this.\u03A0U) !== null && i7 !== void 0 ? i7 : this.\u03A0U = []).push(t7), this.renderRoot !== void 0 && this.isConnected && ((s8 = t7.hostConnected) === null || s8 === void 0 || s8.call(t7));
  }
  removeController(t7) {
    var i7;
    (i7 = this.\u03A0U) === null || i7 === void 0 || i7.splice(this.\u03A0U.indexOf(t7) >>> 0, 1);
  }
  \u03A0_() {
    this.constructor.elementProperties.forEach((t7, i7) => {
      this.hasOwnProperty(i7) && (this.\u03A0i.set(i7, this[i7]), delete this[i7]);
    });
  }
  createRenderRoot() {
    var t7;
    const s8 = (t7 = this.shadowRoot) !== null && t7 !== void 0 ? t7 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s8, this.constructor.elementStyles), s8;
  }
  connectedCallback() {
    var t7;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t7 = this.\u03A0U) === null || t7 === void 0 || t7.forEach((t8) => {
      var i7;
      return (i7 = t8.hostConnected) === null || i7 === void 0 ? void 0 : i7.call(t8);
    }), this.\u03A0l && (this.\u03A0l(), this.\u03A0o = this.\u03A0l = void 0);
  }
  enableUpdating(t7) {
  }
  disconnectedCallback() {
    var t7;
    (t7 = this.\u03A0U) === null || t7 === void 0 || t7.forEach((t8) => {
      var i7;
      return (i7 = t8.hostDisconnected) === null || i7 === void 0 ? void 0 : i7.call(t8);
    }), this.\u03A0o = new Promise((t8) => this.\u03A0l = t8);
  }
  attributeChangedCallback(t7, i7, s8) {
    this.K(t7, s8);
  }
  \u03A0j(t7, i7, s8 = l) {
    var e7, h5;
    const r6 = this.constructor.\u03A0p(t7, s8);
    if (r6 !== void 0 && s8.reflect === true) {
      const n8 = ((h5 = (e7 = s8.converter) === null || e7 === void 0 ? void 0 : e7.toAttribute) !== null && h5 !== void 0 ? h5 : o2.toAttribute)(i7, s8.type);
      this.\u03A0h = t7, n8 == null ? this.removeAttribute(r6) : this.setAttribute(r6, n8), this.\u03A0h = null;
    }
  }
  K(t7, i7) {
    var s8, e7, h5;
    const r6 = this.constructor, n8 = r6.\u03A0m.get(t7);
    if (n8 !== void 0 && this.\u03A0h !== n8) {
      const t8 = r6.getPropertyOptions(n8), l5 = t8.converter, a6 = (h5 = (e7 = (s8 = l5) === null || s8 === void 0 ? void 0 : s8.fromAttribute) !== null && e7 !== void 0 ? e7 : typeof l5 == "function" ? l5 : null) !== null && h5 !== void 0 ? h5 : o2.fromAttribute;
      this.\u03A0h = n8, this[n8] = a6(i7, t8.type), this.\u03A0h = null;
    }
  }
  requestUpdate(t7, i7, s8) {
    let e7 = true;
    t7 !== void 0 && (((s8 = s8 || this.constructor.getPropertyOptions(t7)).hasChanged || n2)(this[t7], i7) ? (this.L.has(t7) || this.L.set(t7, i7), s8.reflect === true && this.\u03A0h !== t7 && (this.\u03A0k === void 0 && (this.\u03A0k = new Map()), this.\u03A0k.set(t7, s8))) : e7 = false), !this.isUpdatePending && e7 && (this.\u03A0g = this.\u03A0q());
  }
  async \u03A0q() {
    this.isUpdatePending = true;
    try {
      for (await this.\u03A0g; this.\u03A0o; )
        await this.\u03A0o;
    } catch (t8) {
      Promise.reject(t8);
    }
    const t7 = this.performUpdate();
    return t7 != null && await t7, !this.isUpdatePending;
  }
  performUpdate() {
    var t7;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this.\u03A0i && (this.\u03A0i.forEach((t8, i8) => this[i8] = t8), this.\u03A0i = void 0);
    let i7 = false;
    const s8 = this.L;
    try {
      i7 = this.shouldUpdate(s8), i7 ? (this.willUpdate(s8), (t7 = this.\u03A0U) === null || t7 === void 0 || t7.forEach((t8) => {
        var i8;
        return (i8 = t8.hostUpdate) === null || i8 === void 0 ? void 0 : i8.call(t8);
      }), this.update(s8)) : this.\u03A0$();
    } catch (t8) {
      throw i7 = false, this.\u03A0$(), t8;
    }
    i7 && this.E(s8);
  }
  willUpdate(t7) {
  }
  E(t7) {
    var i7;
    (i7 = this.\u03A0U) === null || i7 === void 0 || i7.forEach((t8) => {
      var i8;
      return (i8 = t8.hostUpdated) === null || i8 === void 0 ? void 0 : i8.call(t8);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
  }
  \u03A0$() {
    this.L = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.\u03A0g;
  }
  shouldUpdate(t7) {
    return true;
  }
  update(t7) {
    this.\u03A0k !== void 0 && (this.\u03A0k.forEach((t8, i7) => this.\u03A0j(i7, this[i7], t8)), this.\u03A0k = void 0), this.\u03A0$();
  }
  updated(t7) {
  }
  firstUpdated(t7) {
  }
};
a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, (e2 = (s2 = globalThis).reactiveElementPlatformSupport) === null || e2 === void 0 || e2.call(s2, { ReactiveElement: a }), ((h = (r2 = globalThis).reactiveElementVersions) !== null && h !== void 0 ? h : r2.reactiveElementVersions = []).push("1.0.0-rc.2");

// node_modules/lit-html/lit-html.js
var t2;
var i2;
var s3;
var e3;
var o3 = globalThis.trustedTypes;
var l2 = o3 ? o3.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
var n3 = `lit$${(Math.random() + "").slice(9)}$`;
var h2 = "?" + n3;
var r3 = `<${h2}>`;
var u2 = document;
var c = (t7 = "") => u2.createComment(t7);
var d = (t7) => t7 === null || typeof t7 != "object" && typeof t7 != "function";
var v = Array.isArray;
var a2 = (t7) => {
  var i7;
  return v(t7) || typeof ((i7 = t7) === null || i7 === void 0 ? void 0 : i7[Symbol.iterator]) == "function";
};
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var $ = /'/g;
var g = /"/g;
var y = /^(?:script|style|textarea)$/i;
var b = (t7) => (i7, ...s8) => ({ _$litType$: t7, strings: i7, values: s8 });
var T = b(1);
var x = b(2);
var w = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var P = new WeakMap();
var V = (t7, i7, s8) => {
  var e7, o8;
  const l5 = (e7 = s8 == null ? void 0 : s8.renderBefore) !== null && e7 !== void 0 ? e7 : i7;
  let n8 = l5._$litPart$;
  if (n8 === void 0) {
    const t8 = (o8 = s8 == null ? void 0 : s8.renderBefore) !== null && o8 !== void 0 ? o8 : null;
    l5._$litPart$ = n8 = new C(i7.insertBefore(c(), t8), t8, void 0, s8);
  }
  return n8.I(t7), n8;
};
var E = u2.createTreeWalker(u2, 129, null, false);
var M = (t7, i7) => {
  const s8 = t7.length - 1, e7 = [];
  let o8, h5 = i7 === 2 ? "<svg>" : "", u6 = f;
  for (let i8 = 0; i8 < s8; i8++) {
    const s9 = t7[i8];
    let l5, c6, d3 = -1, v3 = 0;
    for (; v3 < s9.length && (u6.lastIndex = v3, c6 = u6.exec(s9), c6 !== null); )
      v3 = u6.lastIndex, u6 === f ? c6[1] === "!--" ? u6 = _ : c6[1] !== void 0 ? u6 = m : c6[2] !== void 0 ? (y.test(c6[2]) && (o8 = RegExp("</" + c6[2], "g")), u6 = p) : c6[3] !== void 0 && (u6 = p) : u6 === p ? c6[0] === ">" ? (u6 = o8 != null ? o8 : f, d3 = -1) : c6[1] === void 0 ? d3 = -2 : (d3 = u6.lastIndex - c6[2].length, l5 = c6[1], u6 = c6[3] === void 0 ? p : c6[3] === '"' ? g : $) : u6 === g || u6 === $ ? u6 = p : u6 === _ || u6 === m ? u6 = f : (u6 = p, o8 = void 0);
    const a6 = u6 === p && t7[i8 + 1].startsWith("/>") ? " " : "";
    h5 += u6 === f ? s9 + r3 : d3 >= 0 ? (e7.push(l5), s9.slice(0, d3) + "$lit$" + s9.slice(d3) + n3 + a6) : s9 + n3 + (d3 === -2 ? (e7.push(void 0), i8) : a6);
  }
  const c5 = h5 + (t7[s8] || "<?>") + (i7 === 2 ? "</svg>" : "");
  return [l2 !== void 0 ? l2.createHTML(c5) : c5, e7];
};
var N = class {
  constructor({ strings: t7, _$litType$: i7 }, s8) {
    let e7;
    this.parts = [];
    let l5 = 0, r6 = 0;
    const u6 = t7.length - 1, d3 = this.parts, [v3, a6] = M(t7, i7);
    if (this.el = N.createElement(v3, s8), E.currentNode = this.el.content, i7 === 2) {
      const t8 = this.el.content, i8 = t8.firstChild;
      i8.remove(), t8.append(...i8.childNodes);
    }
    for (; (e7 = E.nextNode()) !== null && d3.length < u6; ) {
      if (e7.nodeType === 1) {
        if (e7.hasAttributes()) {
          const t8 = [];
          for (const i8 of e7.getAttributeNames())
            if (i8.endsWith("$lit$") || i8.startsWith(n3)) {
              const s9 = a6[r6++];
              if (t8.push(i8), s9 !== void 0) {
                const t9 = e7.getAttribute(s9.toLowerCase() + "$lit$").split(n3), i9 = /([.?@])?(.*)/.exec(s9);
                d3.push({ type: 1, index: l5, name: i9[2], strings: t9, ctor: i9[1] === "." ? I : i9[1] === "?" ? L : i9[1] === "@" ? R : H });
              } else
                d3.push({ type: 6, index: l5 });
            }
          for (const i8 of t8)
            e7.removeAttribute(i8);
        }
        if (y.test(e7.tagName)) {
          const t8 = e7.textContent.split(n3), i8 = t8.length - 1;
          if (i8 > 0) {
            e7.textContent = o3 ? o3.emptyScript : "";
            for (let s9 = 0; s9 < i8; s9++)
              e7.append(t8[s9], c()), E.nextNode(), d3.push({ type: 2, index: ++l5 });
            e7.append(t8[i8], c());
          }
        }
      } else if (e7.nodeType === 8)
        if (e7.data === h2)
          d3.push({ type: 2, index: l5 });
        else {
          let t8 = -1;
          for (; (t8 = e7.data.indexOf(n3, t8 + 1)) !== -1; )
            d3.push({ type: 7, index: l5 }), t8 += n3.length - 1;
        }
      l5++;
    }
  }
  static createElement(t7, i7) {
    const s8 = u2.createElement("template");
    return s8.innerHTML = t7, s8;
  }
};
function S2(t7, i7, s8 = t7, e7) {
  var o8, l5, n8, h5;
  if (i7 === w)
    return i7;
  let r6 = e7 !== void 0 ? (o8 = s8.\u03A3i) === null || o8 === void 0 ? void 0 : o8[e7] : s8.\u03A3o;
  const u6 = d(i7) ? void 0 : i7._$litDirective$;
  return (r6 == null ? void 0 : r6.constructor) !== u6 && ((l5 = r6 == null ? void 0 : r6.O) === null || l5 === void 0 || l5.call(r6, false), u6 === void 0 ? r6 = void 0 : (r6 = new u6(t7), r6.T(t7, s8, e7)), e7 !== void 0 ? ((n8 = (h5 = s8).\u03A3i) !== null && n8 !== void 0 ? n8 : h5.\u03A3i = [])[e7] = r6 : s8.\u03A3o = r6), r6 !== void 0 && (i7 = S2(t7, r6.S(t7, i7.values), r6, e7)), i7;
}
var k = class {
  constructor(t7, i7) {
    this.l = [], this.N = void 0, this.D = t7, this.M = i7;
  }
  u(t7) {
    var i7;
    const { el: { content: s8 }, parts: e7 } = this.D, o8 = ((i7 = t7 == null ? void 0 : t7.creationScope) !== null && i7 !== void 0 ? i7 : u2).importNode(s8, true);
    E.currentNode = o8;
    let l5 = E.nextNode(), n8 = 0, h5 = 0, r6 = e7[0];
    for (; r6 !== void 0; ) {
      if (n8 === r6.index) {
        let i8;
        r6.type === 2 ? i8 = new C(l5, l5.nextSibling, this, t7) : r6.type === 1 ? i8 = new r6.ctor(l5, r6.name, r6.strings, this, t7) : r6.type === 6 && (i8 = new z(l5, this, t7)), this.l.push(i8), r6 = e7[++h5];
      }
      n8 !== (r6 == null ? void 0 : r6.index) && (l5 = E.nextNode(), n8++);
    }
    return o8;
  }
  v(t7) {
    let i7 = 0;
    for (const s8 of this.l)
      s8 !== void 0 && (s8.strings !== void 0 ? (s8.I(t7, s8, i7), i7 += s8.strings.length - 2) : s8.I(t7[i7])), i7++;
  }
};
var C = class {
  constructor(t7, i7, s8, e7) {
    this.type = 2, this.N = void 0, this.A = t7, this.B = i7, this.M = s8, this.options = e7;
  }
  setConnected(t7) {
    var i7;
    (i7 = this.P) === null || i7 === void 0 || i7.call(this, t7);
  }
  get parentNode() {
    return this.A.parentNode;
  }
  get startNode() {
    return this.A;
  }
  get endNode() {
    return this.B;
  }
  I(t7, i7 = this) {
    t7 = S2(this, t7, i7), d(t7) ? t7 === A || t7 == null || t7 === "" ? (this.H !== A && this.R(), this.H = A) : t7 !== this.H && t7 !== w && this.m(t7) : t7._$litType$ !== void 0 ? this._(t7) : t7.nodeType !== void 0 ? this.$(t7) : a2(t7) ? this.g(t7) : this.m(t7);
  }
  k(t7, i7 = this.B) {
    return this.A.parentNode.insertBefore(t7, i7);
  }
  $(t7) {
    this.H !== t7 && (this.R(), this.H = this.k(t7));
  }
  m(t7) {
    const i7 = this.A.nextSibling;
    i7 !== null && i7.nodeType === 3 && (this.B === null ? i7.nextSibling === null : i7 === this.B.previousSibling) ? i7.data = t7 : this.$(u2.createTextNode(t7)), this.H = t7;
  }
  _(t7) {
    var i7;
    const { values: s8, _$litType$: e7 } = t7, o8 = typeof e7 == "number" ? this.C(t7) : (e7.el === void 0 && (e7.el = N.createElement(e7.h, this.options)), e7);
    if (((i7 = this.H) === null || i7 === void 0 ? void 0 : i7.D) === o8)
      this.H.v(s8);
    else {
      const t8 = new k(o8, this), i8 = t8.u(this.options);
      t8.v(s8), this.$(i8), this.H = t8;
    }
  }
  C(t7) {
    let i7 = P.get(t7.strings);
    return i7 === void 0 && P.set(t7.strings, i7 = new N(t7)), i7;
  }
  g(t7) {
    v(this.H) || (this.H = [], this.R());
    const i7 = this.H;
    let s8, e7 = 0;
    for (const o8 of t7)
      e7 === i7.length ? i7.push(s8 = new C(this.k(c()), this.k(c()), this, this.options)) : s8 = i7[e7], s8.I(o8), e7++;
    e7 < i7.length && (this.R(s8 && s8.B.nextSibling, e7), i7.length = e7);
  }
  R(t7 = this.A.nextSibling, i7) {
    var s8;
    for ((s8 = this.P) === null || s8 === void 0 || s8.call(this, false, true, i7); t7 && t7 !== this.B; ) {
      const i8 = t7.nextSibling;
      t7.remove(), t7 = i8;
    }
  }
};
var H = class {
  constructor(t7, i7, s8, e7, o8) {
    this.type = 1, this.H = A, this.N = void 0, this.V = void 0, this.element = t7, this.name = i7, this.M = e7, this.options = o8, s8.length > 2 || s8[0] !== "" || s8[1] !== "" ? (this.H = Array(s8.length - 1).fill(A), this.strings = s8) : this.H = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  I(t7, i7 = this, s8, e7) {
    const o8 = this.strings;
    let l5 = false;
    if (o8 === void 0)
      t7 = S2(this, t7, i7, 0), l5 = !d(t7) || t7 !== this.H && t7 !== w, l5 && (this.H = t7);
    else {
      const e8 = t7;
      let n8, h5;
      for (t7 = o8[0], n8 = 0; n8 < o8.length - 1; n8++)
        h5 = S2(this, e8[s8 + n8], i7, n8), h5 === w && (h5 = this.H[n8]), l5 || (l5 = !d(h5) || h5 !== this.H[n8]), h5 === A ? t7 = A : t7 !== A && (t7 += (h5 != null ? h5 : "") + o8[n8 + 1]), this.H[n8] = h5;
    }
    l5 && !e7 && this.W(t7);
  }
  W(t7) {
    t7 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 != null ? t7 : "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  W(t7) {
    this.element[this.name] = t7 === A ? void 0 : t7;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  W(t7) {
    t7 && t7 !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }
};
var R = class extends H {
  constructor() {
    super(...arguments), this.type = 5;
  }
  I(t7, i7 = this) {
    var s8;
    if ((t7 = (s8 = S2(this, t7, i7, 0)) !== null && s8 !== void 0 ? s8 : A) === w)
      return;
    const e7 = this.H, o8 = t7 === A && e7 !== A || t7.capture !== e7.capture || t7.once !== e7.once || t7.passive !== e7.passive, l5 = t7 !== A && (e7 === A || o8);
    o8 && this.element.removeEventListener(this.name, this, e7), l5 && this.element.addEventListener(this.name, this, t7), this.H = t7;
  }
  handleEvent(t7) {
    var i7, s8;
    typeof this.H == "function" ? this.H.call((s8 = (i7 = this.options) === null || i7 === void 0 ? void 0 : i7.host) !== null && s8 !== void 0 ? s8 : this.element, t7) : this.H.handleEvent(t7);
  }
};
var z = class {
  constructor(t7, i7, s8) {
    this.element = t7, this.type = 6, this.N = void 0, this.V = void 0, this.M = i7, this.options = s8;
  }
  I(t7) {
    S2(this, t7);
  }
};
var Z = { Z: "$lit$", U: n3, Y: h2, q: 1, X: M, tt: k, it: a2, st: S2, et: C, ot: H, nt: L, rt: R, lt: I, ht: z };
(i2 = (t2 = globalThis).litHtmlPlatformSupport) === null || i2 === void 0 || i2.call(t2, N, C), ((s3 = (e3 = globalThis).litHtmlVersions) !== null && s3 !== void 0 ? s3 : e3.litHtmlVersions = []).push("2.0.0-rc.3");

// node_modules/lit-element/lit-element.js
var i3;
var l3;
var o4;
var s4;
var n4;
var a3;
((i3 = (a3 = globalThis).litElementVersions) !== null && i3 !== void 0 ? i3 : a3.litElementVersions = []).push("3.0.0-rc.2");
var h3 = class extends a {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.\u03A6t = void 0;
  }
  createRenderRoot() {
    var t7, e7;
    const r6 = super.createRenderRoot();
    return (t7 = (e7 = this.renderOptions).renderBefore) !== null && t7 !== void 0 || (e7.renderBefore = r6.firstChild), r6;
  }
  update(t7) {
    const r6 = this.render();
    super.update(t7), this.\u03A6t = V(r6, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t7;
    super.connectedCallback(), (t7 = this.\u03A6t) === null || t7 === void 0 || t7.setConnected(true);
  }
  disconnectedCallback() {
    var t7;
    super.disconnectedCallback(), (t7 = this.\u03A6t) === null || t7 === void 0 || t7.setConnected(false);
  }
  render() {
    return w;
  }
};
h3.finalized = true, h3._$litElement$ = true, (o4 = (l3 = globalThis).litElementHydrateSupport) === null || o4 === void 0 || o4.call(l3, { LitElement: h3 }), (n4 = (s4 = globalThis).litElementPlatformSupport) === null || n4 === void 0 || n4.call(s4, { LitElement: h3 });

// node_modules/@lit/reactive-element/decorators/custom-element.js
var n5 = (n8) => (e7) => typeof e7 == "function" ? ((n9, e8) => (window.customElements.define(n9, e8), e8))(n8, e7) : ((n9, e8) => {
  const { kind: t7, elements: i7 } = e8;
  return { kind: t7, elements: i7, finisher(e9) {
    window.customElements.define(n9, e9);
  } };
})(n8, e7);

// node_modules/@lit/reactive-element/decorators/property.js
var i4 = (i7, e7) => e7.kind === "method" && e7.descriptor && !("value" in e7.descriptor) ? { ...e7, finisher(n8) {
  n8.createProperty(e7.key, i7);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e7.key, initializer() {
  typeof e7.initializer == "function" && (this[e7.key] = e7.initializer.call(this));
}, finisher(n8) {
  n8.createProperty(e7.key, i7);
} };
function e4(e7) {
  return (n8, t7) => t7 !== void 0 ? ((i7, e8, n9) => {
    e8.constructor.createProperty(n9, i7);
  })(e7, n8, t7) : i4(e7, n8);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r4(r6) {
  return e4({ ...r6, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var o5 = ({ finisher: e7, descriptor: t7 }) => (o8, n8) => {
  var r6;
  if (n8 === void 0) {
    const n9 = (r6 = o8.originalKey) !== null && r6 !== void 0 ? r6 : o8.key, i7 = t7 != null ? { kind: "method", placement: "prototype", key: n9, descriptor: t7(o8.key) } : { ...o8, key: n9 };
    return e7 != null && (i7.finisher = function(t8) {
      e7(t8, n9);
    }), i7;
  }
  {
    const r7 = o8.constructor;
    t7 !== void 0 && Object.defineProperty(o8, n8, t7(n8)), e7 == null || e7(r7, n8);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function o6(o8, r6) {
  return o5({ descriptor: (t7) => {
    const i7 = { get() {
      var t8;
      return (t8 = this.renderRoot) === null || t8 === void 0 ? void 0 : t8.querySelector(o8);
    }, enumerable: true, configurable: true };
    if (r6) {
      const r7 = typeof t7 == "symbol" ? Symbol() : "__" + t7;
      i7.get = function() {
        var t8;
        return this[r7] === void 0 && (this[r7] = (t8 = this.renderRoot) === null || t8 === void 0 ? void 0 : t8.querySelector(o8)), this[r7];
      };
    }
    return i7;
  } });
}

// node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var t3 = Element.prototype;
var n6 = t3.msMatchesSelector || t3.webkitMatchesSelector;

// src/styles.ts
var reset = i`
  :host {
    display: block;
  }
  * {
    margin: 0;
    box-sizing: border-box;
  }
`;
var card = i`
  #card {
    padding: 3px;
    border-radius: 5px;
    width: 10rem;
    border: 2px solid var(--gray-dim);
    font-family: sans-serif;
  }
`;
var buttonOverlay = i`
  #wrapper {
    position: relative;
    overflow: hidden;
  }
  #wrapper:hover > #buttons {
    transform: none;
    z-index: 10;
  }
  #buttons {
    position: absolute;
    padding: 0;
    top: 2px;
    right: 10px;
    display: flex;
    transform: translateY(calc(-100% - 2px));
    transition: transform 0.2s;
  }
  #buttons button {
    font-size: 0.6em;
  }  
`;
var form = i`
  #card {
    position: relative;
    overflow: hidden;
    background-color: var(--gray-light);
  }
  #card.error {
    border-color: red;
    text-align: center;
  }
  #error {
    position: absolute;
    background-color: red;
    display: flex;
    color: white;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 3px;
    align-items: center;
    justify-content: center;
    transform: translateY(-100%);
    transition: transform 0.2s;
  }
  #error.show {
    transform: translateY(0);
  }  
  label {
    cursor: pointer;
    font-size: 0.8rem;
    text-align: left;
    display: block;  
    padding-left: 5px;    
  } 
  input {
    width: 100%;
    border: 2px solid var(--gray);
    outline: none;
    font-size: inherit;
  }
  input:-webkit-autofill::first-line {
    font-size: 1rem;
  }  
  fieldset {
    padding: 3px;
    border: 0;
  }
  fieldset:hover > label {
    font-weight: semibold;
  }
  fieldset:hover > input {
    background-color: var(--gray-light);
    border-color: var(--gray-dark);
  }
  fieldset:focus-within > label {
    font-weight: bold;
  }
  fieldset:focus-within > input {
    background-color: var(--gray);
    border-color: var(--gray-dim);
  } 
`;

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var i5 = (t7) => (...i7) => ({ _$litDirective$: t7, values: i7 });
var s5 = class {
  constructor(t7) {
  }
  T(t7, i7, s8) {
    this.\u03A3dt = t7, this.M = i7, this.\u03A3ct = s8;
  }
  S(t7, i7) {
    return this.update(t7, i7);
  }
  update(t7, i7) {
    return this.render(...i7);
  }
};

// node_modules/lit-html/directives/class-map.js
var e5 = i5(class extends s5 {
  constructor(t7) {
    var s8;
    if (super(t7), t7.type !== t4.ATTRIBUTE || t7.name !== "class" || ((s8 = t7.strings) === null || s8 === void 0 ? void 0 : s8.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t7) {
    return Object.keys(t7).filter((s8) => t7[s8]).join(" ");
  }
  update(s8, [r6]) {
    if (this.bt === void 0) {
      this.bt = new Set();
      for (const t7 in r6)
        r6[t7] && this.bt.add(t7);
      return this.render(r6);
    }
    const i7 = s8.element.classList;
    this.bt.forEach((t7) => {
      t7 in r6 || (i7.remove(t7), this.bt.delete(t7));
    });
    for (const t7 in r6) {
      const s9 = !!r6[t7];
      s9 !== this.bt.has(t7) && (s9 ? (i7.add(t7), this.bt.add(t7)) : (i7.remove(t7), this.bt.delete(t7)));
    }
    return w;
  }
});

// src/site-form.ts
var SiteForm = class extends h3 {
  constructor() {
    super(...arguments);
    this.handleKeyDown = (e7) => {
      if (e7.key == "Enter") {
        if (e7.target == this.nameInput) {
          e7.preventDefault();
          this.passLengthInput.focus();
        }
      }
    };
    this.handleInput = (e7) => {
      let input = e7.target;
      if (!(input instanceof HTMLInputElement))
        return;
      e7.preventDefault();
      e7.stopPropagation();
      let { siteId, inputType: type } = this;
      let { id: field, value: payload } = input;
      this.dispatchEvent(new CustomEvent("dispatch", {
        bubbles: true,
        composed: true,
        detail: { type, field, siteId, payload }
      }));
    };
    this.handleSubmit = (e7) => {
      e7.preventDefault();
      e7.stopPropagation();
      let { siteId, submitType: type } = this;
      this.dispatchEvent(new CustomEvent("dispatch", {
        bubbles: true,
        composed: true,
        detail: { type, siteId }
      }));
    };
  }
  updated(props) {
    let prevForm = props.get("form");
    if (!prevForm || prevForm.submit === this.form.submit)
      return;
    this.nameInput.focus();
  }
  async willUpdate(props) {
    if (!this.hasUpdated)
      return;
    let prevForm = props.get("form");
    if (!prevForm || prevForm.error == this.form.error)
      return;
    let { classList } = this.errorDiv;
    if (!this.form.error)
      return classList.remove("show");
    classList.add("show");
    clearTimeout(this.showId);
    this.showId = setTimeout(() => classList.remove("show"), 1200);
  }
  render() {
    let { name, passLength, error } = this.form;
    return T`
      <div id="card" class=${e5({ error: !!error })}>
        <div id="error">${error?.message}</div>
        <form @submit=${this.handleSubmit}
          @keydown=${this.handleKeyDown}
          @input=${this.handleInput}>
          <fieldset>
            <label for="name">Site</label>
            <input id="name" .value=${name} autocomplete="off">
          </fieldset>
          <fieldset>
            <label for="passLength">Password size limit</label>
            <input id="passLength" .value=${passLength}>
          </fieldset>
          <input type="submit" hidden>
        </form>
      </div>
    `;
  }
};
SiteForm.styles = i`
    ${reset}
    ${card}
    ${form}
  `;
__decorateClass([
  e4({ attribute: false })
], SiteForm.prototype, "form", 2);
__decorateClass([
  o6("#name")
], SiteForm.prototype, "nameInput", 2);
__decorateClass([
  o6("#passLength")
], SiteForm.prototype, "passLengthInput", 2);
__decorateClass([
  o6("#error")
], SiteForm.prototype, "errorDiv", 2);
SiteForm = __decorateClass([
  n5("site-form")
], SiteForm);

// src/site-card.ts
var SiteCard = class extends h3 {
  constructor() {
    super(...arguments);
    this.handleClick = (e7) => {
      this.dispatchEvent(new CustomEvent("dispatch", {
        bubbles: true,
        composed: true,
        detail: {
          type: "LOGIN_CREATE_TOGGLE",
          siteId: this.siteId
        }
      }));
    };
  }
  willUpdate() {
    let count = 0;
    for (let id in this.data.logins) {
      if (id != "form")
        count += 1;
    }
    this.loginCount = count;
  }
  render() {
    let { name, passLength } = this.data;
    return T`
      <div id="card" @click=${this.handleClick}>
        <div id="title">${name}</div>
        ${passLength && T`
          <div><small>Password size: ${passLength}</small></div>
        `}
        <div><small>Login count: ${this.loginCount}</small></div>
      </div>
    `;
  }
};
SiteCard.styles = i`
    ${reset}
    ${card}
    #card {
      cursor: pointer;
      background-color: var(--gray-light);
    }
    #card:hover {
      background-color: var(--gray-dark);
    }
    #title {
      word-break: break-all;
    }    
  `;
__decorateClass([
  e4({ attribute: false })
], SiteCard.prototype, "data", 2);
__decorateClass([
  r4()
], SiteCard.prototype, "loginCount", 2);
SiteCard = __decorateClass([
  n5("site-card")
], SiteCard);

// src/login-form.ts
var LoginForm = class extends h3 {
  constructor() {
    super(...arguments);
    this.handleInput = (e7) => {
      let input = e7.target;
      if (!(input instanceof HTMLInputElement))
        return;
      e7.preventDefault();
      e7.stopPropagation();
      let { id: field, value: payload } = input;
      let { siteId, loginId, inputType: type } = this;
      this.dispatchEvent(new CustomEvent("dispatch", {
        bubbles: true,
        composed: true,
        detail: { type, field, siteId, loginId, payload }
      }));
    };
    this.handleSubmit = (e7) => {
      e7.preventDefault();
      e7.stopPropagation();
      let { siteId, loginId, submitType: type } = this;
      this.dispatchEvent(new CustomEvent("dispatch", {
        bubbles: true,
        composed: true,
        detail: { type, siteId, loginId }
      }));
    };
    this.handleKeyDown = (e7) => {
      if (e7.key == "Enter") {
        if (e7.target == this.nameInput) {
          e7.preventDefault();
          this.passwordInput.focus();
        } else if (e7.target == this.passwordInput) {
          e7.preventDefault();
          this.emailInput.focus();
        }
      }
    };
  }
  async willUpdate(props) {
    if (!this.hasUpdated)
      return;
    let prevForm = props.get("form");
    if (!prevForm || prevForm.error === this.form.error)
      return;
    let { classList } = this.errorDiv;
    if (!this.form.error)
      return classList.remove("show");
    classList.add("show");
    clearTimeout(this.showId);
    this.showId = setTimeout(() => classList.remove("show"), 1200);
  }
  updated(props) {
    let prevForm = props.get("form");
    if (!prevForm || prevForm.submit === this.form.submit)
      return;
    this.nameInput.focus();
  }
  render() {
    let { name, password, email, error } = this.form;
    return T`
      <div id="card" class=${e5({ error: !!error })}>
        <div id="error">${error?.message}</div>
        <form @submit=${this.handleSubmit} 
          @input=${this.handleInput} 
          @keydown=${this.handleKeyDown}>
          <fieldset>
            <label for="name">Name</label>
            <input id="name" .value=${name} autocomplete="off">
          </fieldset>
          <fieldset>
            <label for="password">Password</label>
            <input id="password" .value=${password}>
          </fieldset>
          <fieldset>
            <label for="email">Email</label>
            <input id="email" .value=${email}>
          </fieldset>
          <input type="submit" hidden>
        </form>
      </div>
    `;
  }
};
LoginForm.styles = i`
    ${reset}
    ${card}
    ${form}
  `;
__decorateClass([
  e4({ attribute: false })
], LoginForm.prototype, "form", 2);
__decorateClass([
  o6("#error")
], LoginForm.prototype, "errorDiv", 2);
__decorateClass([
  o6("#name")
], LoginForm.prototype, "nameInput", 2);
__decorateClass([
  o6("#password")
], LoginForm.prototype, "passwordInput", 2);
__decorateClass([
  o6("#email")
], LoginForm.prototype, "emailInput", 2);
LoginForm = __decorateClass([
  n5("login-form")
], LoginForm);

// src/login-card.ts
var LoginCard = class extends h3 {
  constructor() {
    super(...arguments);
    this.clickHandler = async (e7) => {
      let target = e7.target.closest("[data-key]");
      if (!(target instanceof HTMLDivElement))
        return;
      e7.preventDefault();
      let value = this.data[target.dataset.key];
      await navigator.clipboard.writeText(value);
      if (target.classList.contains("note"))
        return;
      target.classList.add("note");
      await new Promise((r6) => setTimeout(r6, 400));
      target.classList.remove("note");
    };
  }
  render() {
    let { name, password, email } = this.data;
    return T`
      <div id="card" @click=${this.clickHandler}>
        <div class="item" data-key="name">
          <div class="title">Name</div>
          <div class="value">${name}</div>
        </div>
        <div class="item" data-key="password">
          <div class="title">Password</div>
          <div class="value">${password}</div>
        </div>
        ${email && T`
          <div class="item" data-key="email">
            <div class="title">Email</div>
            <div class="value">${email}</div>
          </div>        
        `}
      </div>
    `;
  }
};
LoginCard.styles = i`
    ${reset}
    ${card}
    #card {
      background-color: var(--gray-light);
      text-align: left;
    }
    .item {
      position: relative;
      cursor: pointer;
      padding: 3px;
      border-radius: 5px;
    }
    .item:hover {
      background-color: var(--gray);
    }  
    .item::after {
      content: 'Saved to clipboard';
      position: absolute;
      overflow: hidden;
      text-align: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: darkcyan;
      color: white;
      visibility: hidden;
      opacity: 0;
      transition-duration: 0.3s;
      transition-property: visibility, opacity, transform;
      transform: scale(1.1);
    }
    .item.note::after {
      visibility: visible;
      transform: scale(1);
      opacity: 1;
    }
    .title {
      font-size: 0.8rem;
      text-align: left;   
      padding-left: 5px;   
    }
    .value {
      width: 100%;
      padding: 3px 4px;
      min-height: 1em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;      
    }
  `;
__decorateClass([
  e4({ attribute: false })
], LoginCard.prototype, "data", 2);
LoginCard = __decorateClass([
  n5("login-card")
], LoginCard);

// src/login-item.ts
var LoginItem = class extends h3 {
  constructor() {
    super(...arguments);
    this.handleClick = (e7) => {
      let button = e7.target.closest("[data-op]");
      if (!(button instanceof HTMLButtonElement))
        return;
      e7.preventDefault();
      e7.stopPropagation();
      let type = button.dataset.op;
      let { siteId, loginId } = this;
      this.dispatchEvent(new CustomEvent("dispatch", {
        bubbles: true,
        composed: true,
        detail: { type, siteId, loginId }
      }));
    };
  }
  renderForm() {
    return T`
      <div id="buttons">
        <button data-op="LOGIN_DELETE">Delete</button>
        <button data-op="LOGIN_UPDATE_TOGGLE">Cancel</button>
      </div>
      <login-form
        .submitType=${"LOGIN_UPDATE_SUBMIT"}
        .inputType=${"LOGIN_UPDATE_CHANGE"}
        .siteId=${this.siteId}
        .loginId=${this.loginId}
        .form=${this.item.form}
      ></login-form>
    `;
  }
  renderCard() {
    return T`
      <div id="buttons">
        <button data-op="LOGIN_UPDATE_TOGGLE">Edit</button>
      </div>
      <login-card .data=${this.item.data}></login-card>
    `;
  }
  render() {
    return T`
      <div id="wrapper" @click=${this.handleClick}>
        ${this.item.form ? this.renderForm() : this.renderCard()}
      </div>
    `;
  }
};
LoginItem.styles = i`
    ${reset}
    ${buttonOverlay}
  `;
__decorateClass([
  e4({ attribute: false })
], LoginItem.prototype, "item", 2);
LoginItem = __decorateClass([
  n5("login-item")
], LoginItem);

// node_modules/lit-html/directive-helpers.js
var { et: t5 } = Z;
var e6 = () => document.createComment("");
var u3 = (o8, i7, n8) => {
  var v3;
  const l5 = o8.A.parentNode, r6 = i7 === void 0 ? o8.B : i7.A;
  if (n8 === void 0) {
    const i8 = l5.insertBefore(e6(), r6), v4 = l5.insertBefore(e6(), r6);
    n8 = new t5(i8, v4, o8, o8.options);
  } else {
    const t7 = n8.B.nextSibling, i8 = n8.M !== o8;
    if (i8 && ((v3 = n8.Q) === null || v3 === void 0 || v3.call(n8, o8), n8.M = o8), t7 !== r6 || i8) {
      let o9 = n8.A;
      for (; o9 !== t7; ) {
        const t8 = o9.nextSibling;
        l5.insertBefore(o9, r6), o9 = t8;
      }
    }
  }
  return n8;
};
var c2 = (o8, t7, i7 = o8) => (o8.I(t7, i7), o8);
var s6 = {};
var f2 = (o8, t7 = s6) => o8.H = t7;
var a4 = (o8) => o8.H;
var m2 = (o8) => {
  var t7;
  (t7 = o8.P) === null || t7 === void 0 || t7.call(o8, false, true);
  let i7 = o8.A;
  const n8 = o8.B.nextSibling;
  for (; i7 !== n8; ) {
    const o9 = i7.nextSibling;
    i7.remove(), i7 = o9;
  }
};

// node_modules/lit-html/directives/repeat.js
var u4 = (e7, s8, t7) => {
  const r6 = new Map();
  for (let l5 = s8; l5 <= t7; l5++)
    r6.set(e7[l5], l5);
  return r6;
};
var c3 = i5(class extends s5 {
  constructor(e7) {
    if (super(e7), e7.type !== t4.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  Mt(e7, s8, t7) {
    let r6;
    t7 === void 0 ? t7 = s8 : s8 !== void 0 && (r6 = s8);
    const l5 = [], o8 = [];
    let i7 = 0;
    for (const s9 of e7)
      l5[i7] = r6 ? r6(s9, i7) : i7, o8[i7] = t7(s9, i7), i7++;
    return { values: o8, keys: l5 };
  }
  render(e7, s8, t7) {
    return this.Mt(e7, s8, t7).values;
  }
  update(s8, [t7, r6, c5]) {
    var d3;
    const p3 = a4(s8), { values: v3, keys: a6 } = this.Mt(t7, r6, c5);
    if (!p3)
      return this.Pt = a6, v3;
    const h5 = (d3 = this.Pt) !== null && d3 !== void 0 ? d3 : this.Pt = [], m3 = [];
    let x3, y3, j2 = 0, k3 = p3.length - 1, w3 = 0, b3 = v3.length - 1;
    for (; j2 <= k3 && w3 <= b3; )
      if (p3[j2] === null)
        j2++;
      else if (p3[k3] === null)
        k3--;
      else if (h5[j2] === a6[w3])
        m3[w3] = c2(p3[j2], v3[w3]), j2++, w3++;
      else if (h5[k3] === a6[b3])
        m3[b3] = c2(p3[k3], v3[b3]), k3--, b3--;
      else if (h5[j2] === a6[b3])
        m3[b3] = c2(p3[j2], v3[b3]), u3(s8, m3[b3 + 1], p3[j2]), j2++, b3--;
      else if (h5[k3] === a6[w3])
        m3[w3] = c2(p3[k3], v3[w3]), u3(s8, p3[j2], p3[k3]), k3--, w3++;
      else if (x3 === void 0 && (x3 = u4(a6, w3, b3), y3 = u4(h5, j2, k3)), x3.has(h5[j2]))
        if (x3.has(h5[k3])) {
          const e7 = y3.get(a6[w3]), t8 = e7 !== void 0 ? p3[e7] : null;
          if (t8 === null) {
            const e8 = u3(s8, p3[j2]);
            c2(e8, v3[w3]), m3[w3] = e8;
          } else
            m3[w3] = c2(t8, v3[w3]), u3(s8, p3[j2], t8), p3[e7] = null;
          w3++;
        } else
          m2(p3[k3]), k3--;
      else
        m2(p3[j2]), j2++;
    for (; w3 <= b3; ) {
      const e7 = u3(s8, m3[b3 + 1]);
      c2(e7, v3[w3]), m3[w3++] = e7;
    }
    for (; j2 <= k3; ) {
      const e7 = p3[j2++];
      e7 !== null && m2(e7);
    }
    return this.Pt = a6, f2(s8, m3), w;
  }
});

// src/site-details.ts
var SiteDetails = class extends h3 {
  render() {
    let { logins } = this.item.data;
    let idList = [];
    for (let id in logins) {
      if (id != "form")
        idList.push(id);
    }
    return T`
      <div id="wrapper">
        <site-item
          .item=${this.item}
          .siteId=${this.siteId}
        ></site-item>
      </div>
      ${c3(idList, (id) => id, (id) => T`
        <login-item
          .item=${logins[id]}
          .siteId=${this.siteId}
          .loginId=${id}
        ></login-item>
      `)}
      <div id="wrapper">
        <login-form
          .form=${logins.form}
          .siteId=${this.siteId}
          .inputType=${"LOGIN_CREATE_CHANGE"}
          .submitType=${"LOGIN_CREATE_SUBMIT"}
        ></login-form>
      </div>
    `;
  }
};
SiteDetails.styles = i`
    ${reset}
    ${buttonOverlay}
    :host {
      background-color: var(--gray-dark);
      border-radius: 5px;
      display: flex;
      flex-flow: row wrap;
      padding: 3px;  
    }
    :host > * {
      margin: 3px;
    }

  `;
__decorateClass([
  e4({ attribute: false })
], SiteDetails.prototype, "item", 2);
SiteDetails = __decorateClass([
  n5("site-details")
], SiteDetails);

// src/site-item.ts
var SiteItem = class extends h3 {
  constructor() {
    super(...arguments);
    this.handleClick = (e7) => {
      let button = e7.target?.closest("[data-op]");
      if (!(button instanceof HTMLButtonElement))
        return;
      e7.preventDefault();
      e7.stopPropagation();
      let type = button.dataset.op;
      let { siteId } = this;
      this.dispatchEvent(new CustomEvent("dispatch", {
        bubbles: true,
        composed: true,
        detail: { type, siteId }
      }));
    };
  }
  willUpdate() {
    this.expanded = this.expandable && this.item.data.logins.form;
  }
  renderDetails() {
    return T`
      <site-details
        .item=${this.item}
        .siteId=${this.siteId}
      ></site-details>
    `;
  }
  renderForm() {
    return T`
      <div id="buttons">
        <button data-op="SITE_DELETE">Delete</button>
        <button data-op="SITE_UPDATE_TOGGLE">Cancel</button>
      </div>
      <site-form
        .submitType=${"SITE_UPDATE_SUBMIT"}
        .inputType=${"SITE_UPDATE_CHANGE"}
        .form=${this.item.form}
        .siteId=${this.siteId}
      ></site-form>
    `;
  }
  renderCard() {
    return T`
      <div id="buttons">
        <button data-op="SITE_UPDATE_TOGGLE">Edit</button>
      </div>
      <site-card
        .data=${this.item.data}
        .siteId=${this.siteId}
      ></site-card>
    `;
  }
  render() {
    return T`
      <div id="wrapper"  @click=${this.handleClick}>
        ${this.expanded ? this.renderDetails() : this.item.form ? this.renderForm() : this.renderCard()}
      </div>
    `;
  }
};
SiteItem.styles = i`
    ${reset}
    ${buttonOverlay}
  `;
__decorateClass([
  e4({ attribute: false })
], SiteItem.prototype, "item", 2);
__decorateClass([
  e4({ type: Boolean, attribute: "data-expanded", reflect: true })
], SiteItem.prototype, "expanded", 2);
SiteItem = __decorateClass([
  n5("site-item")
], SiteItem);

// src/pass-keeper.ts
var PassKeeper = class extends h3 {
  render() {
    let { form: form2 } = this.state;
    let idList = [];
    for (let id in this.state) {
      if (id !== "id" && id !== "form")
        idList.push(id);
    }
    return T`
      <div id="site-list">
        ${c3(idList, (id) => id, (id) => T`
          <site-item
            .item=${this.state[id]}
            .siteId=${id}
            .expandable=${true}
          ></site-item>
        `)}
        <site-form
          .form=${form2}
          .inputType=${"SITE_CREATE_CHANGE"}
          .submitType=${"SITE_CREATE_SUBMIT"}          
        ></site-form>
      </div>
    `;
  }
};
PassKeeper.styles = i`
    ${reset}
    :host {
      --gray-light: #eee;
      --gray: #ccc;
      --gray-dark: #bbb;
      --gray-dim: #888;
    }

    #site-list {
      display: flex;
      flex-flow: row wrap;
      text-align: center;
      padding: 6px;
    }
    site-form, site-item {
      margin: 3px;
    }
    site-item[data-expanded] {
      width: calc(100% + 6px);
      margin-left: -3px;
      margin-right: -3px;
    }    
  `;
__decorateClass([
  e4({ attribute: false })
], PassKeeper.prototype, "state", 2);
PassKeeper = __decorateClass([
  n5("pass-keeper")
], PassKeeper);

// node_modules/immer/dist/immer.esm.js
function n7(n8) {
  for (var r6 = arguments.length, t7 = Array(r6 > 1 ? r6 - 1 : 0), e7 = 1; e7 < r6; e7++)
    t7[e7 - 1] = arguments[e7];
  if (true) {
    var i7 = Y[n8], o8 = i7 ? typeof i7 == "function" ? i7.apply(null, t7) : i7 : "unknown error nr: " + n8;
    throw Error("[Immer] " + o8);
  }
  throw Error("[Immer] minified error nr: " + n8 + (t7.length ? " " + t7.map(function(n9) {
    return "'" + n9 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r5(n8) {
  return !!n8 && !!n8[Q];
}
function t6(n8) {
  return !!n8 && (function(n9) {
    if (!n9 || typeof n9 != "object")
      return false;
    var r6 = Object.getPrototypeOf(n9);
    if (r6 === null)
      return true;
    var t7 = Object.hasOwnProperty.call(r6, "constructor") && r6.constructor;
    return typeof t7 == "function" && Function.toString.call(t7) === Z2;
  }(n8) || Array.isArray(n8) || !!n8[L2] || !!n8.constructor[L2] || s7(n8) || v2(n8));
}
function i6(n8, r6, t7) {
  t7 === void 0 && (t7 = false), o7(n8) === 0 ? (t7 ? Object.keys : nn)(n8).forEach(function(e7) {
    t7 && typeof e7 == "symbol" || r6(e7, n8[e7], n8);
  }) : n8.forEach(function(t8, e7) {
    return r6(e7, t8, n8);
  });
}
function o7(n8) {
  var r6 = n8[Q];
  return r6 ? r6.i > 3 ? r6.i - 4 : r6.i : Array.isArray(n8) ? 1 : s7(n8) ? 2 : v2(n8) ? 3 : 0;
}
function u5(n8, r6) {
  return o7(n8) === 2 ? n8.has(r6) : Object.prototype.hasOwnProperty.call(n8, r6);
}
function a5(n8, r6) {
  return o7(n8) === 2 ? n8.get(r6) : n8[r6];
}
function f3(n8, r6, t7) {
  var e7 = o7(n8);
  e7 === 2 ? n8.set(r6, t7) : e7 === 3 ? (n8.delete(r6), n8.add(t7)) : n8[r6] = t7;
}
function c4(n8, r6) {
  return n8 === r6 ? n8 !== 0 || 1 / n8 == 1 / r6 : n8 != n8 && r6 != r6;
}
function s7(n8) {
  return X && n8 instanceof Map;
}
function v2(n8) {
  return q && n8 instanceof Set;
}
function p2(n8) {
  return n8.o || n8.t;
}
function l4(n8) {
  if (Array.isArray(n8))
    return Array.prototype.slice.call(n8);
  var r6 = rn(n8);
  delete r6[Q];
  for (var t7 = nn(r6), e7 = 0; e7 < t7.length; e7++) {
    var i7 = t7[e7], o8 = r6[i7];
    o8.writable === false && (o8.writable = true, o8.configurable = true), (o8.get || o8.set) && (r6[i7] = { configurable: true, writable: true, enumerable: o8.enumerable, value: n8[i7] });
  }
  return Object.create(Object.getPrototypeOf(n8), r6);
}
function d2(n8, e7) {
  return e7 === void 0 && (e7 = false), y2(n8) || r5(n8) || !t6(n8) ? n8 : (o7(n8) > 1 && (n8.set = n8.add = n8.clear = n8.delete = h4), Object.freeze(n8), e7 && i6(n8, function(n9, r6) {
    return d2(r6, true);
  }, true), n8);
}
function h4() {
  n7(2);
}
function y2(n8) {
  return n8 == null || typeof n8 != "object" || Object.isFrozen(n8);
}
function b2(r6) {
  var t7 = tn[r6];
  return t7 || n7(18, r6), t7;
}
function _2() {
  return U || n7(0), U;
}
function j(n8, r6) {
  r6 && (b2("Patches"), n8.u = [], n8.s = [], n8.v = r6);
}
function g2(n8) {
  O(n8), n8.p.forEach(S3), n8.p = null;
}
function O(n8) {
  n8 === U && (U = n8.l);
}
function w2(n8) {
  return U = { p: [], l: U, h: n8, m: true, _: 0 };
}
function S3(n8) {
  var r6 = n8[Q];
  r6.i === 0 || r6.i === 1 ? r6.j() : r6.g = true;
}
function P2(r6, e7) {
  e7._ = e7.p.length;
  var i7 = e7.p[0], o8 = r6 !== void 0 && r6 !== i7;
  return e7.h.O || b2("ES5").S(e7, r6, o8), o8 ? (i7[Q].P && (g2(e7), n7(4)), t6(r6) && (r6 = M2(e7, r6), e7.l || x2(e7, r6)), e7.u && b2("Patches").M(i7[Q], r6, e7.u, e7.s)) : r6 = M2(e7, i7, []), g2(e7), e7.u && e7.v(e7.u, e7.s), r6 !== H2 ? r6 : void 0;
}
function M2(n8, r6, t7) {
  if (y2(r6))
    return r6;
  var e7 = r6[Q];
  if (!e7)
    return i6(r6, function(i7, o9) {
      return A2(n8, e7, r6, i7, o9, t7);
    }, true), r6;
  if (e7.A !== n8)
    return r6;
  if (!e7.P)
    return x2(n8, e7.t, true), e7.t;
  if (!e7.I) {
    e7.I = true, e7.A._--;
    var o8 = e7.i === 4 || e7.i === 5 ? e7.o = l4(e7.k) : e7.o;
    i6(e7.i === 3 ? new Set(o8) : o8, function(r7, i7) {
      return A2(n8, e7, o8, r7, i7, t7);
    }), x2(n8, o8, false), t7 && n8.u && b2("Patches").R(e7, t7, n8.u, n8.s);
  }
  return e7.o;
}
function A2(e7, i7, o8, a6, c5, s8) {
  if (c5 === o8 && n7(5), r5(c5)) {
    var v3 = M2(e7, c5, s8 && i7 && i7.i !== 3 && !u5(i7.D, a6) ? s8.concat(a6) : void 0);
    if (f3(o8, a6, v3), !r5(v3))
      return;
    e7.m = false;
  }
  if (t6(c5) && !y2(c5)) {
    if (!e7.h.F && e7._ < 1)
      return;
    M2(e7, c5), i7 && i7.A.l || x2(e7, c5);
  }
}
function x2(n8, r6, t7) {
  t7 === void 0 && (t7 = false), n8.h.F && n8.m && d2(r6, t7);
}
function z2(n8, r6) {
  var t7 = n8[Q];
  return (t7 ? p2(t7) : n8)[r6];
}
function I2(n8, r6) {
  if (r6 in n8)
    for (var t7 = Object.getPrototypeOf(n8); t7; ) {
      var e7 = Object.getOwnPropertyDescriptor(t7, r6);
      if (e7)
        return e7;
      t7 = Object.getPrototypeOf(t7);
    }
}
function k2(n8) {
  n8.P || (n8.P = true, n8.l && k2(n8.l));
}
function E2(n8) {
  n8.o || (n8.o = l4(n8.t));
}
function R2(n8, r6, t7) {
  var e7 = s7(r6) ? b2("MapSet").N(r6, t7) : v2(r6) ? b2("MapSet").T(r6, t7) : n8.O ? function(n9, r7) {
    var t8 = Array.isArray(n9), e8 = { i: t8 ? 1 : 0, A: r7 ? r7.A : _2(), P: false, I: false, D: {}, l: r7, t: n9, k: null, o: null, j: null, C: false }, i7 = e8, o8 = en;
    t8 && (i7 = [e8], o8 = on);
    var u6 = Proxy.revocable(i7, o8), a6 = u6.revoke, f4 = u6.proxy;
    return e8.k = f4, e8.j = a6, f4;
  }(r6, t7) : b2("ES5").J(r6, t7);
  return (t7 ? t7.A : _2()).p.push(e7), e7;
}
function D(e7) {
  return r5(e7) || n7(22, e7), function n8(r6) {
    if (!t6(r6))
      return r6;
    var e8, u6 = r6[Q], c5 = o7(r6);
    if (u6) {
      if (!u6.P && (u6.i < 4 || !b2("ES5").K(u6)))
        return u6.t;
      u6.I = true, e8 = F(r6, c5), u6.I = false;
    } else
      e8 = F(r6, c5);
    return i6(e8, function(r7, t7) {
      u6 && a5(u6.t, r7) === t7 || f3(e8, r7, n8(t7));
    }), c5 === 3 ? new Set(e8) : e8;
  }(e7);
}
function F(n8, r6) {
  switch (r6) {
    case 2:
      return new Map(n8);
    case 3:
      return Array.from(n8);
  }
  return l4(n8);
}
var G;
var U;
var W = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol";
var X = typeof Map != "undefined";
var q = typeof Set != "undefined";
var B = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined";
var H2 = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G);
var L2 = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
var Q = W ? Symbol.for("immer-state") : "__$immer_state";
var V2 = typeof Symbol != "undefined" && Symbol.iterator || "@@iterator";
var Y = { 0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(n8) {
  return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n8;
}, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(n8) {
  return "Cannot apply patch, path doesn't resolve: " + n8;
}, 16: 'Sets cannot have "replace" patches.', 17: function(n8) {
  return "Unsupported patch operation: " + n8;
}, 18: function(n8) {
  return "The plugin for '" + n8 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n8 + "()` when initializing your application.";
}, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(n8) {
  return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n8 + "'";
}, 22: function(n8) {
  return "'current' expects a draft, got: " + n8;
}, 23: function(n8) {
  return "'original' expects a draft, got: " + n8;
}, 24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed" };
var Z2 = "" + Object.prototype.constructor;
var nn = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(n8) {
  return Object.getOwnPropertyNames(n8).concat(Object.getOwnPropertySymbols(n8));
} : Object.getOwnPropertyNames;
var rn = Object.getOwnPropertyDescriptors || function(n8) {
  var r6 = {};
  return nn(n8).forEach(function(t7) {
    r6[t7] = Object.getOwnPropertyDescriptor(n8, t7);
  }), r6;
};
var tn = {};
var en = { get: function(n8, r6) {
  if (r6 === Q)
    return n8;
  var e7 = p2(n8);
  if (!u5(e7, r6))
    return function(n9, r7, t7) {
      var e8, i8 = I2(r7, t7);
      return i8 ? "value" in i8 ? i8.value : (e8 = i8.get) === null || e8 === void 0 ? void 0 : e8.call(n9.k) : void 0;
    }(n8, e7, r6);
  var i7 = e7[r6];
  return n8.I || !t6(i7) ? i7 : i7 === z2(n8.t, r6) ? (E2(n8), n8.o[r6] = R2(n8.A.h, i7, n8)) : i7;
}, has: function(n8, r6) {
  return r6 in p2(n8);
}, ownKeys: function(n8) {
  return Reflect.ownKeys(p2(n8));
}, set: function(n8, r6, t7) {
  var e7 = I2(p2(n8), r6);
  if (e7 == null ? void 0 : e7.set)
    return e7.set.call(n8.k, t7), true;
  if (!n8.P) {
    var i7 = z2(p2(n8), r6), o8 = i7 == null ? void 0 : i7[Q];
    if (o8 && o8.t === t7)
      return n8.o[r6] = t7, n8.D[r6] = false, true;
    if (c4(t7, i7) && (t7 !== void 0 || u5(n8.t, r6)))
      return true;
    E2(n8), k2(n8);
  }
  return n8.o[r6] === t7 && typeof t7 != "number" || (n8.o[r6] = t7, n8.D[r6] = true, true);
}, deleteProperty: function(n8, r6) {
  return z2(n8.t, r6) !== void 0 || r6 in n8.t ? (n8.D[r6] = false, E2(n8), k2(n8)) : delete n8.D[r6], n8.o && delete n8.o[r6], true;
}, getOwnPropertyDescriptor: function(n8, r6) {
  var t7 = p2(n8), e7 = Reflect.getOwnPropertyDescriptor(t7, r6);
  return e7 ? { writable: true, configurable: n8.i !== 1 || r6 !== "length", enumerable: e7.enumerable, value: t7[r6] } : e7;
}, defineProperty: function() {
  n7(11);
}, getPrototypeOf: function(n8) {
  return Object.getPrototypeOf(n8.t);
}, setPrototypeOf: function() {
  n7(12);
} };
var on = {};
i6(en, function(n8, r6) {
  on[n8] = function() {
    return arguments[0] = arguments[0][0], r6.apply(this, arguments);
  };
}), on.deleteProperty = function(r6, t7) {
  return isNaN(parseInt(t7)) && n7(13), en.deleteProperty.call(this, r6[0], t7);
}, on.set = function(r6, t7, e7) {
  return t7 !== "length" && isNaN(parseInt(t7)) && n7(14), en.set.call(this, r6[0], t7, e7, r6[0]);
};
var un = function() {
  function e7(r6) {
    var e8 = this;
    this.O = B, this.F = true, this.produce = function(r7, i8, o8) {
      if (typeof r7 == "function" && typeof i8 != "function") {
        var u6 = i8;
        i8 = r7;
        var a6 = e8;
        return function(n8) {
          var r8 = this;
          n8 === void 0 && (n8 = u6);
          for (var t7 = arguments.length, e9 = Array(t7 > 1 ? t7 - 1 : 0), o9 = 1; o9 < t7; o9++)
            e9[o9 - 1] = arguments[o9];
          return a6.produce(n8, function(n9) {
            var t8;
            return (t8 = i8).call.apply(t8, [r8, n9].concat(e9));
          });
        };
      }
      var f4;
      if (typeof i8 != "function" && n7(6), o8 !== void 0 && typeof o8 != "function" && n7(7), t6(r7)) {
        var c5 = w2(e8), s8 = R2(e8, r7, void 0), v3 = true;
        try {
          f4 = i8(s8), v3 = false;
        } finally {
          v3 ? g2(c5) : O(c5);
        }
        return typeof Promise != "undefined" && f4 instanceof Promise ? f4.then(function(n8) {
          return j(c5, o8), P2(n8, c5);
        }, function(n8) {
          throw g2(c5), n8;
        }) : (j(c5, o8), P2(f4, c5));
      }
      if (!r7 || typeof r7 != "object") {
        if ((f4 = i8(r7)) === H2)
          return;
        return f4 === void 0 && (f4 = r7), e8.F && d2(f4, true), f4;
      }
      n7(21, r7);
    }, this.produceWithPatches = function(n8, r7) {
      return typeof n8 == "function" ? function(r8) {
        for (var t8 = arguments.length, i9 = Array(t8 > 1 ? t8 - 1 : 0), o8 = 1; o8 < t8; o8++)
          i9[o8 - 1] = arguments[o8];
        return e8.produceWithPatches(r8, function(r9) {
          return n8.apply(void 0, [r9].concat(i9));
        });
      } : [e8.produce(n8, r7, function(n9, r8) {
        t7 = n9, i8 = r8;
      }), t7, i8];
      var t7, i8;
    }, typeof (r6 == null ? void 0 : r6.useProxies) == "boolean" && this.setUseProxies(r6.useProxies), typeof (r6 == null ? void 0 : r6.autoFreeze) == "boolean" && this.setAutoFreeze(r6.autoFreeze);
  }
  var i7 = e7.prototype;
  return i7.createDraft = function(e8) {
    t6(e8) || n7(8), r5(e8) && (e8 = D(e8));
    var i8 = w2(this), o8 = R2(this, e8, void 0);
    return o8[Q].C = true, O(i8), o8;
  }, i7.finishDraft = function(r6, t7) {
    var e8 = r6 && r6[Q];
    e8 && e8.C || n7(9), e8.I && n7(10);
    var i8 = e8.A;
    return j(i8, t7), P2(void 0, i8);
  }, i7.setAutoFreeze = function(n8) {
    this.F = n8;
  }, i7.setUseProxies = function(r6) {
    r6 && !B && n7(20), this.O = r6;
  }, i7.applyPatches = function(n8, t7) {
    var e8;
    for (e8 = t7.length - 1; e8 >= 0; e8--) {
      var i8 = t7[e8];
      if (i8.path.length === 0 && i8.op === "replace") {
        n8 = i8.value;
        break;
      }
    }
    var o8 = b2("Patches").$;
    return r5(n8) ? o8(n8, t7) : this.produce(n8, function(n9) {
      return o8(n9, t7.slice(e8 + 1));
    });
  }, e7;
}();
var an = new un();
var fn = an.produce;
var cn = an.produceWithPatches.bind(an);
var sn = an.setAutoFreeze.bind(an);
var vn = an.setUseProxies.bind(an);
var pn = an.applyPatches.bind(an);
var ln = an.createDraft.bind(an);
var dn = an.finishDraft.bind(an);

// src/producer.ts
function validateLoginForm(form2, logins, passLength = null, loginId = null) {
  let name = form2.name.trim();
  let password = form2.password.trim();
  let email = form2.email.trim();
  if (!name)
    return {
      error: "Login name is empty"
    };
  for (let id in logins) {
    if (id !== "form" && id !== loginId && logins[id].data.name === name)
      return {
        error: "Login name already exists"
      };
  }
  if (passLength != null && password.length > passLength)
    return {
      error: "Password is too long"
    };
  return {
    name,
    password,
    email: email ?? null
  };
}
function validateSiteForm(form2, sites, logins = null, siteId = null) {
  let name = form2.name.trim();
  let passLengthStr = form2.passLength.trim();
  if (!name)
    return {
      error: "Site name is empty"
    };
  for (let id in sites) {
    if (id !== "form" && id !== "id" && id !== siteId && sites[id].data.name === name)
      return {
        error: "Site already exists"
      };
  }
  if (!passLengthStr)
    return {
      name,
      passLength: null
    };
  if (!/^\d{1,9}$/.test(passLengthStr))
    return {
      error: "Invalid password size"
    };
  let passLength = Number(passLengthStr);
  for (let id in logins) {
    if (id !== "form" && logins[id].data.password.length > passLength)
      return {
        error: "Password size is too small"
      };
  }
  return { name, passLength };
}
var producer = fn((sites, action) => {
  switch (action.type) {
    case "SITE_CREATE_CHANGE": {
      let { field, payload } = action;
      sites.form[field] = payload;
      break;
    }
    case "SITE_UPDATE_CHANGE": {
      let { siteId, field, payload } = action;
      sites[siteId].form[field] = payload;
      break;
    }
    case "LOGIN_CREATE_CHANGE": {
      let { siteId, field, payload } = action;
      sites[siteId].data.logins.form[field] = payload;
      break;
    }
    case "LOGIN_UPDATE_CHANGE": {
      let { siteId, loginId, field, payload } = action;
      sites[siteId].data.logins[loginId].form[field] = payload;
      break;
    }
    case "SITE_DELETE": {
      let { siteId } = action;
      let hasLogins = Object.keys(sites[siteId].data.logins).some((key) => key !== "form");
      if (hasLogins) {
        sites[siteId].form.error = {
          message: "Site has logins"
        };
      } else {
        delete sites[siteId];
      }
      break;
    }
    case "SITE_CREATE_SUBMIT": {
      let { name, passLength, error } = validateSiteForm(sites.form, sites);
      if (error) {
        sites.form.error = { message: error };
      } else {
        sites["_" + sites.id++] = {
          data: {
            name,
            passLength,
            logins: { form: null }
          },
          form: null
        };
        sites.form = {
          name: "",
          passLength: "",
          error: null,
          submit: {}
        };
      }
      break;
    }
    case "SITE_UPDATE_SUBMIT": {
      let { siteId } = action;
      let site = sites[siteId];
      let { name, passLength, error } = validateSiteForm(site.form, sites, site.data.logins, siteId);
      if (error) {
        site.form.error = { message: error };
      } else {
        site.form = null;
        site.data.name = name;
        site.data.passLength = passLength;
      }
      break;
    }
    case "SITE_UPDATE_TOGGLE": {
      let { siteId } = action;
      let site = sites[siteId];
      site.form = site.form ? null : {
        name: site.data.name,
        passLength: String(site.data.passLength ?? ""),
        error: null,
        submit: {}
      };
      break;
    }
    case "LOGIN_UPDATE_TOGGLE": {
      let { loginId, siteId } = action;
      let site = sites[siteId];
      let login = site.data.logins[loginId];
      login.form = login.form ? null : {
        name: login.data.name,
        password: login.data.password,
        email: login.data.email ?? "",
        error: null,
        submit: {}
      };
      break;
    }
    case "LOGIN_UPDATE_SUBMIT": {
      let { siteId, loginId } = action;
      let { data } = sites[siteId];
      let login = data.logins[loginId];
      let { error, name, password, email } = validateLoginForm(login.form, data.logins, data.passLength, loginId);
      if (error) {
        login.form.error = { message: error };
      } else {
        login.data.name = name;
        login.data.password = password;
        login.data.email = email;
        login.form = null;
      }
      break;
    }
    case "LOGIN_CREATE_SUBMIT": {
      let { siteId } = action;
      let site = sites[siteId];
      let { logins } = site.data;
      let { name, password, email, error } = validateLoginForm(logins.form, logins, site.data.passLength);
      if (error) {
        logins.form.error = { message: error };
      } else {
        logins["_" + sites.id++] = {
          data: { name, password, email },
          form: null
        };
        logins.form = {
          name: "",
          password: "",
          email: "",
          error: null,
          submit: {}
        };
      }
      break;
    }
    case "LOGIN_CREATE_TOGGLE": {
      let { siteId } = action;
      let { logins } = sites[siteId].data;
      if (logins.form) {
        for (let loginId in logins) {
          if (loginId == "form")
            continue;
          logins[loginId].form = null;
        }
        logins.form = null;
      } else {
        logins.form = {
          name: "",
          password: "",
          email: "",
          error: null,
          submit: {}
        };
      }
      break;
    }
    case "LOGIN_DELETE": {
      let { siteId, loginId } = action;
      delete sites[siteId].data.logins[loginId];
      break;
    }
  }
});

// src/index.ts
var dataFolder;
while (true) {
  await buttonClick();
  dataFolder = await showDirectoryPicker().catch(() => null);
  if (!dataFolder)
    continue;
  const mode = "readwrite";
  if (await dataFolder.queryPermission({ mode }) == "granted")
    break;
  if (await dataFolder.requestPermission({ mode }) == "granted")
    break;
}
async function buttonClick() {
  let button = document.querySelector("button");
  button.disabled = false;
  await new Promise((r6) => button.onclick = r6);
  button.disabled = true;
}
async function visibilityState(state) {
  if (document.visibilityState == state)
    return;
  await new Promise((res) => document.onvisibilitychange = () => {
    if (document.visibilityState == state)
      res(null);
  });
}
async function writeText(handle, text) {
  let writable = await handle.createWritable();
  await writable.write(text);
  await writable.close();
}
async function readEntries(handle) {
  let ret = [];
  for await (let entry of handle.values())
    ret.push(entry);
  return ret;
}
var lockFolder = await dataFolder.getDirectoryHandle("lock", { create: true });
var lockName;
try {
  while (true) {
    let sortedByName = function(items) {
      return Object.entries(items).filter((a6) => a6[0] != "id" && a6[0] != "form").sort((a6, b3) => a6[1].data.name.localeCompare(b3[1].data.name));
    };
    lockName = Array.from(crypto.getRandomValues(new Uint8Array(16))).map((v3) => v3.toString(16).padStart(2, "0")).join("");
    outer:
      while (true) {
        await lockFolder.getFileHandle(lockName, { create: true });
        let attempts = 0;
        while (true) {
          let locks = await readEntries(lockFolder);
          if (locks.length == 1 && locks[0].name == lockName)
            break outer;
          if (++attempts >= 3)
            break;
          await new Promise((r6) => setTimeout(r6, 300));
        }
        await lockFolder.removeEntry(lockName);
        document.body.innerHTML = `
    <div id="load-wrapper">
      <div>
        The folder is already in use by another active instance of this app<br>
        <button>Retry</button>
      </div>
    </div>`;
        await buttonClick();
      }
    document.body.innerHTML = "";
    async function getHandles(suffix) {
      let dataName = "data-" + suffix + ".json";
      let updateName = "updates-" + suffix;
      let dataFile = await dataFolder.getFileHandle(dataName).catch(() => null);
      if (dataFile && (await dataFile.getFile()).size == 0) {
        dataFile = null;
      }
      let updateDir = await dataFolder.getDirectoryHandle(updateName).catch(() => null);
      return { dataName, updateName, dataFile, updateDir };
    }
    let state;
    let pri = await getHandles("odd");
    let sec = await getHandles("even");
    if (!pri.dataFile && !sec.dataFile) {
      state = {
        "id": 1e3,
        "form": {
          "name": "",
          "passLength": "",
          "error": null,
          "submit": {}
        }
      };
      let dataFile = await dataFolder.getFileHandle(pri.dataName, { create: true });
      await writeText(dataFile, JSON.stringify(state));
      pri.updateDir = await dataFolder.getDirectoryHandle(pri.updateName, { create: true });
    } else {
      if (!pri.dataFile || sec.dataFile && pri.updateDir) {
        [pri, sec] = [sec, pri];
      }
      if (pri.dataFile && sec.updateDir) {
        if (sec.dataFile)
          await dataFolder.removeEntry(sec.dataName);
        await dataFolder.removeEntry(sec.updateName, { recursive: true });
        sec.dataFile = null;
        sec.updateDir = null;
      }
      state = await pri.dataFile.getFile().then((file) => file.text()).then((text) => JSON.parse(text));
      pri.updateDir = pri.updateDir ?? await dataFolder.getDirectoryHandle(pri.updateName, { create: true });
      let updateFiles = await readEntries(pri.updateDir);
      updateFiles = updateFiles.filter((h5) => !isNaN(Number(h5.name)));
      if (updateFiles.length) {
        updateFiles.sort((a6, b3) => Number(a6.name) - Number(b3.name));
        for (let file of updateFiles) {
          if (file.kind != "file")
            continue;
          let lines = await file.getFile().then((file2) => file2.text()).then((text) => text.split("\n"));
          for (let line of lines) {
            if (!line)
              continue;
            state = producer(state, JSON.parse(line));
          }
        }
        sec.dataFile = await dataFolder.getFileHandle(sec.dataName, { create: true });
        await writeText(sec.dataFile, JSON.stringify(state));
        await dataFolder.removeEntry(pri.dataName);
        await dataFolder.removeEntry(pri.updateName, { recursive: true });
        sec.updateDir = await dataFolder.getDirectoryHandle(sec.updateName, { create: true });
        [pri, sec] = [sec, pri];
      }
    }
    let pk = document.createElement("pass-keeper");
    pk.state = {
      ...Object.fromEntries(sortedByName(state).map(([id, site]) => [id, {
        ...site,
        data: {
          ...site.data,
          logins: {
            ...Object.fromEntries(sortedByName(site.data.logins)),
            form: site.data.logins.form
          }
        }
      }])),
      id: state.id,
      form: state.form
    };
    document.body.append(pk);
    let counter = 0;
    let actions = [];
    async function writeActions() {
      if (!actions.length)
        return;
      let text = actions.map((a6) => JSON.stringify(a6)).join("\n");
      actions = [];
      let file = await pri.updateDir.getFileHandle(String(counter), { create: true });
      await writeText(file, text);
      counter++;
    }
    let timeout = false;
    async function handleDispatch(e7) {
      pk.state = producer(pk.state, e7.detail);
      actions.push(e7.detail);
      if (timeout)
        return;
      timeout = true;
      await new Promise((r6) => setTimeout(r6, 3e3));
      timeout = false;
      await writeActions();
    }
    window.addEventListener("dispatch", handleDispatch);
    await visibilityState("hidden");
    window.removeEventListener("dispatch", handleDispatch);
    pk.remove();
    await writeActions();
    await lockFolder.removeEntry(lockName);
    await visibilityState("visible");
  }
} catch (e7) {
  document.body.innerHTML = `
  <div id="load-wrapper">
    <div>${e7?.message}</div>
  </div>`;
  await lockFolder.removeEntry(lockName);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
