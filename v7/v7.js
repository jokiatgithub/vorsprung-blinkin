// ============================================================
// BLINKIN V7 — "VOM RAUSCHEN ZUR STRUKTUR"
// Fixed three.js particle field. Scroll position morphs the
// field through ten states (one per story chapter). All motion
// is transform/attribute-level; reduced-motion renders one
// static frame instead of animating.
// ============================================================
import * as THREE from "./vendor/three.module.js";

document.documentElement.classList.add("js");
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- non-3D interactions ---------------- */

// reveal
(function(){
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || REDUCED) { els.forEach(e=>e.classList.add("in")); return; }
  const io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: .12 });
  els.forEach(function(e){ io.observe(e); });
})();

// FAQ accordion
document.querySelectorAll(".frage-kopf").forEach(function(btn){
  btn.addEventListener("click", function(){
    const row = btn.closest(".frage");
    const open = row.getAttribute("data-open") === "true";
    row.setAttribute("data-open", open ? "false" : "true");
    btn.setAttribute("aria-expanded", open ? "false" : "true");
  });
});

// self-check
(function(){
  const boxes = document.querySelectorAll('.check input[type="checkbox"]');
  const countEl = document.getElementById("ist-zustand-count");
  const msgEl = document.getElementById("ist-zustand-message");
  if (!boxes.length || !countEl) return;
  const M = {
    neutral: "Markiert, was heute zutrifft.",
    watch: "Ein Anfang ist da — ein Blick auf die Angebote lohnt sich.",
    action: "Klarer Fall — bringt einen konkreten Ablauf mit.",
    urgent: "Volles Bild — startet direkt mit dem ersten Gespräch."
  };
  function upd(){
    let n = 0; boxes.forEach(b=>{ if (b.checked) n++; });
    countEl.textContent = n + " von 5 markiert";
    msgEl.textContent = M[n===0?"neutral":n<=2?"watch":n<=4?"action":"urgent"];
  }
  boxes.forEach(b=>b.addEventListener("change", upd));
})();

/* ---------------- three.js scene ---------------- */

const canvas = document.getElementById("gl");
let renderer = null;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
} catch (e) {
  renderer = null;
}
if (!renderer) {
  canvas.remove(); document.body.classList.add("webgl-fallback");
}
if (renderer) {

const isSmall = window.innerWidth < 720;
const N = isSmall ? 3400 : 6400;

renderer.setClearColor(0x0a0a10, 1);
function sizeRenderer(){
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
}
sizeRenderer();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, .1, 400);
camera.position.set(0, 0, 62);

/* ---------- state generators ---------- */
function arr(){ return new Float32Array(N*3); }
function colArr(r,g,b,spread){
  const a = new Float32Array(N*3);
  for (let i=0;i<N;i++){
    const v = (Math.random()-.5)*spread;
    a[i*3]   = Math.min(1, Math.max(0, r+v));
    a[i*3+1] = Math.min(1, Math.max(0, g+v));
    a[i*3+2] = Math.min(1, Math.max(0, b+v));
  }
  return a;
}
const gauss = () => (Math.random()+Math.random()+Math.random()-1.5)/1.5;

// 0 noise cloud — unstrukturiertes Wissen
const S0 = arr();
for (let i=0;i<N;i++){ const r = 14 + Math.random()*24; const th = Math.random()*Math.PI*2; const ph = Math.acos(2*Math.random()-1);
  S0[i*3]=r*Math.sin(ph)*Math.cos(th); S0[i*3+1]=r*Math.sin(ph)*Math.sin(th)*.8; S0[i*3+2]=r*Math.cos(ph); }
// 1 twin systems — zwei Angebote
const S1 = arr();
for (let i=0;i<N;i++){
  const side = i%2 ? -1 : 1; const R = side<0 ? 13 : 10; const tube = 1.6+Math.random()*2.2;
  const a = Math.random()*Math.PI*2; const rr = R + gauss()*tube;
  S1[i*3] = side*15 + Math.cos(a)*rr; S1[i*3+1] = gauss()*tube*1.6; S1[i*3+2] = Math.sin(a)*rr;
}
// 2 scanned sphere + scanring — Ist-Zustand
const S2 = arr();
for (let i=0;i<N;i++){
  if (i % 9 === 0) { const a = Math.random()*Math.PI*2; S2[i*3]=Math.cos(a)*24; S2[i*3+1]=gauss()*.7; S2[i*3+2]=Math.sin(a)*24; }
  else { const r = 17 + gauss()*1.4; const th = Math.random()*Math.PI*2; const ph = Math.acos(2*Math.random()-1);
    S2[i*3]=r*Math.sin(ph)*Math.cos(th); S2[i*3+1]=r*Math.sin(ph)*Math.sin(th); S2[i*3+2]=r*Math.cos(ph); }
}
// 3 report rings — drei Formate
const S3 = arr();
for (let i=0;i<N;i++){
  const R = [12,19,26][i%3];
  const a = Math.random()*Math.PI*2;
  S3[i*3] = Math.cos(a)*(R+gauss()*.9); S3[i*3+1] = gauss()*1.1; S3[i*3+2] = Math.sin(a)*(R+gauss()*.9);
}
// 4 the loop — Torus mit vier Knoten
const S4 = arr();
for (let i=0;i<N;i++){
  if (i % 8 === 0) { const k = Math.floor(i/8)%4; const a = k*(Math.PI/2) + gauss()*.28;
    S4[i*3]=Math.cos(a)*22+gauss()*2.4; S4[i*3+1]=Math.sin(a)*22+gauss()*2.4; S4[i*3+2]=gauss()*2.4; }
  else { const a = Math.random()*Math.PI*2; const tube = gauss()*3.1;
    S4[i*3]=Math.cos(a)*(22+tube*.35); S4[i*3+1]=Math.sin(a)*(22+tube*.35); S4[i*3+2]=tube; }
}
// 5 lattice — Ordnung
const S5 = arr();
{ const g = Math.ceil(Math.cbrt(N)); const step = 34/(g-1);
  for (let i=0;i<N;i++){ const x=i%g, y=Math.floor(i/g)%g, z=Math.floor(i/(g*g))%g;
    S5[i*3]=(x*step-17)+gauss()*.28; S5[i*3+1]=(y*step-17)+gauss()*.28; S5[i*3+2]=(z*step-17)+gauss()*.28; } }
// 6 constellations — sechs Felder
const S6 = arr();
for (let i=0;i<N;i++){
  const ang = (i%6)*(Math.PI/3);
  const cx = Math.cos(ang)*26, cy = Math.sin(ang)*17;
  S6[i*3]=cx+gauss()*4.4; S6[i*3+1]=cy+gauss()*4.4; S6[i*3+2]=gauss()*6;
}
// 7 wave grid
const S7 = arr();
{ const side = Math.ceil(Math.sqrt(N));
  for (let i=0;i<N;i++){ const x=i%side, y=Math.floor(i/side);
    S7[i*3]=(x/(side-1)-.5)*46; S7[i*3+1]=Math.sin(x*.55)*Math.cos(y*.42)*3.4; S7[i*3+2]=(y/(side-1)-.5)*46; } }
// 8 drift — weiter Raum
const S8 = arr();
for (let i=0;i<N;i++){ const r=30+Math.random()*38; const th=Math.random()*Math.PI*2; const ph=Math.acos(2*Math.random()-1);
  S8[i*3]=r*Math.sin(ph)*Math.cos(th); S8[i*3+1]=r*Math.sin(ph)*Math.sin(th); S8[i*3+2]=r*Math.cos(ph); }
// 9 core — Beschluss
const S9 = arr();
for (let i=0;i<N;i++){ const r = i%5===0 ? 10+Math.random()*16 : Math.abs(gauss())*6.5;
  const th=Math.random()*Math.PI*2; const ph=Math.acos(2*Math.random()-1);
  S9[i*3]=r*Math.sin(ph)*Math.cos(th); S9[i*3+1]=r*Math.sin(ph)*Math.sin(th); S9[i*3+2]=r*Math.cos(ph); }

const STATES = [S0,S1,S2,S3,S4,S5,S6,S7,S8,S9];
const WOBBLE = [2.6, 1.1, .7, .5, .45, .16, 1.2, .8, 2.2, .5];
const SPIN   = [.05, .12, .08, .16, .3, .04, .07, .1, .02, .12];
const CAMZ   = [62, 58, 54, 56, 52, 58, 60, 58, 74, 50];
const CAMY   = [0, 4, 0, 14, 10, 8, 0, 16, 0, 0];

const C = [];
C.push(colArr(.20,.33,1.0,.22));
C.push(colArr(.20,.33,1.0,.22));
C.push(colArr(.58,.65,1.0,.18));
C.push(colArr(.35,.45,1.0,.20));
C.push(colArr(1.0,.70,.36,.20));
C.push(colArr(.58,.65,1.0,.14));
C.push(colArr(.45,.52,1.0,.22));
C.push(colArr(.30,.38,.95,.22));
C.push(colArr(.55,.58,.85,.25));
C.push(colArr(1.0,.82,.55,.18));

/* ---------- geometry ---------- */
const positions = new Float32Array(S0);
const colors = new Float32Array(C[0]);
const phases = new Float32Array(N);
for (let i=0;i<N;i++) phases[i] = Math.random()*Math.PI*2;

const geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const cnv = document.createElement("canvas"); cnv.width = cnv.height = 64;
const cx2 = cnv.getContext("2d");
const grad = cx2.createRadialGradient(32,32,0,32,32,32);
grad.addColorStop(0,"rgba(255,255,255,1)"); grad.addColorStop(.35,"rgba(255,255,255,.7)"); grad.addColorStop(1,"rgba(255,255,255,0)");
cx2.fillStyle = grad; cx2.fillRect(0,0,64,64);
const sprite = new THREE.CanvasTexture(cnv);

const mat = new THREE.PointsMaterial({
  size: isSmall ? .8 : .62, map: sprite, vertexColors: true,
  transparent: true, opacity: .92, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
});
const points = new THREE.Points(geo, mat);
scene.add(points);

/* ---------- scroll → story index ---------- */
const chapters = Array.from(document.querySelectorAll("[data-state]"));
let anchors = [];
function measure(){
  anchors = chapters.map(function(el){
    const r = el.getBoundingClientRect();
    return { y: r.top + window.scrollY + r.height/2, state: parseInt(el.getAttribute("data-state"), 10) };
  });
}
measure();

const indicator = document.getElementById("chapter-indicator");
const dots = Array.from(document.querySelectorAll(".dots a"));

function storyIndex(){
  const c = window.scrollY + window.innerHeight/2;
  if (!anchors.length) return { idx: 0, f: 0, chapter: 0 };
  if (c <= anchors[0].y) return { idx: 0, f: 0, chapter: 0 };
  for (let k = 0; k < anchors.length - 1; k++){
    if (c < anchors[k+1].y){
      const f = (c - anchors[k].y) / (anchors[k+1].y - anchors[k].y);
      return { idx: k, f: f, chapter: c >= (anchors[k].y + anchors[k+1].y)/2 ? k+1 : k };
    }
  }
  return { idx: anchors.length - 2, f: 1, chapter: anchors.length - 1 };
}
const smooth = (t) => t*t*(3-2*t);

let mouse = { x: 0, y: 0 }, mouseT = { x: 0, y: 0 };
window.addEventListener("pointermove", function(e){
  mouseT.x = (e.clientX/window.innerWidth - .5);
  mouseT.y = (e.clientY/window.innerHeight - .5);
}, { passive: true });

/* ---------- render loop ---------- */
let story = { idx: 0, f: 0, chapter: 0 };
let lastChapter = -1;
function updateChapterUI(){
  if (story.chapter === lastChapter) return;
  lastChapter = story.chapter;
  if (indicator){
    const el = chapters[story.chapter];
    indicator.textContent = el ? el.getAttribute("data-name") || "" : "";
  }
  dots.forEach(function(d,i){ d.classList.toggle("active", i === story.chapter); });
}

const posAttr = geo.getAttribute("position");
const colAttr = geo.getAttribute("color");
let clock0 = performance.now();
let running = true;
document.addEventListener("visibilitychange", function(){ running = !document.hidden; if (running) { clock0 = performance.now(); tick(); } });

function frame(scrollOnly){
  const A = STATES[story.idx], B = STATES[Math.min(story.idx+1, STATES.length-1)];
  const CA = C[story.idx], CB = C[Math.min(story.idx+1, C.length-1)];
  const f = smooth(Math.min(1, Math.max(0, story.f)));
  const wob = WOBBLE[story.idx] + (WOBBLE[Math.min(story.idx+1, WOBBLE.length-1)] - WOBBLE[story.idx]) * f;
  const t = scrollOnly ? 0 : (performance.now() - clock0) * .001;
  for (let i = 0; i < N; i++){
    const i3 = i*3, ph = phases[i];
    const wx = Math.sin(t*.7 + ph) * wob, wy = Math.cos(t*.6 + ph*1.3) * wob, wz = Math.sin(t*.5 + ph*.7) * wob;
    positions[i3]   = A[i3]   + (B[i3]  -A[i3]  )*f + wx;
    positions[i3+1] = A[i3+1] + (B[i3+1]-A[i3+1])*f + wy;
    positions[i3+2] = A[i3+2] + (B[i3+2]-A[i3+2])*f + wz;
    colors[i3]   = CA[i3]   + (CB[i3]  -CA[i3]  )*f;
    colors[i3+1] = CA[i3+1] + (CB[i3+1]-CA[i3+1])*f;
    colors[i3+2] = CA[i3+2] + (CB[i3+2]-CA[i3+2])*f;
  }
  posAttr.needsUpdate = true;
  colAttr.needsUpdate = true;

  const s0 = story.idx, s1 = Math.min(story.idx+1, STATES.length-1);
  points.rotation.y += (SPIN[s0] + (SPIN[s1]-SPIN[s0])*f) * .016;
  points.rotation.x = Math.sin(t*.05)*.06;

  const cz = CAMZ[s0] + (CAMZ[s1]-CAMZ[s0])*f;
  const cy = CAMY[s0] + (CAMY[s1]-CAMY[s0])*f;
  mouse.x += (mouseT.x - mouse.x)*.04;
  mouse.y += (mouseT.y - mouse.y)*.04;
  camera.position.x += (mouse.x*7 - camera.position.x)*.05;
  camera.position.y += (cy + mouse.y*5 - camera.position.y)*.05;
  camera.position.z += (cz - camera.position.z)*.05;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

function onScroll(){
  story = storyIndex();
  updateChapterUI();
  frame(REDUCED);
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", function(){
  sizeRenderer();
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  measure();
  onScroll();
});

// start
story = storyIndex();
updateChapterUI();
if (REDUCED) {
  frame(true); // ein statisches Bild
} else {
  function tick(){ if (!running) return; frame(false); requestAnimationFrame(tick); }
  tick();
}

} // end renderer guard
