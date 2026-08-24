// ============================================================
// BLINKIN V8 — "DER HELLE WEG"
// A cobalt signal river flows along a spline through the page.
// Scrolling flies the camera along the curve: four gate rings
// (the weeks), case pillars, and a warm destination core — the
// conversation. Bright editorial world, one accent, fog to paper.
// ============================================================
import * as THREE from "./vendor/three.module.js";

document.documentElement.classList.add("js");
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= UI interactions ================= */

// reveal
(function(){
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || REDUCED) { els.forEach(e=>e.classList.add("in")); return; }
  const io = new IntersectionObserver(function(en){
    en.forEach(function(x){ if (x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target);} });
  }, { threshold:.12 });
  els.forEach(e=>io.observe(e));
})();

// progress bar + sticky cta
(function(){
  const bar = document.getElementById("progress");
  const pill = document.getElementById("sticky-cta");
  const hero = document.getElementById("hero");
  function upd(){
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h>0 ? Math.min(100, window.scrollY/h*100) : 0) + "%";
    if (pill && hero){
      const past = window.scrollY > hero.offsetTop + hero.offsetHeight*0.6;
      pill.classList.toggle("show", past);
    }
  }
  window.addEventListener("scroll", upd, { passive:true }); upd();
})();

// faq
document.querySelectorAll(".frage-kopf").forEach(function(btn){
  btn.addEventListener("click", function(){
    const row = btn.closest(".frage");
    const open = row.getAttribute("data-open")==="true";
    row.setAttribute("data-open", open?"false":"true");
    btn.setAttribute("aria-expanded", open?"false":"true");
  });
});

// tabs (cases)
(function(){
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll(".tabpanel"));
  if (!tabs.length) return;
  function activate(i, focus){
    tabs.forEach(function(t,j){
      const sel = i===j;
      t.setAttribute("aria-selected", sel?"true":"false");
      t.tabIndex = sel?0:-1;
    });
    panels.forEach(function(p,j){
      p.setAttribute("aria-hidden", i===j?"false":"true");
      p.hidden = i!==j;
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function(t,i){
    t.addEventListener("click", function(){ activate(i,false); });
    t.addEventListener("keydown", function(e){
      let n = null;
      if (e.key==="ArrowRight") n=(i+1)%tabs.length;
      if (e.key==="ArrowLeft") n=(i-1+tabs.length)%tabs.length;
      if (e.key==="Home") n=0;
      if (e.key==="End") n=tabs.length-1;
      if (n!==null){ e.preventDefault(); activate(n,true); }
    });
  });
  activate(0,false);
})();

// quali recommender
(function(){
  const boxes = Array.from(document.querySelectorAll('.check input[type="checkbox"]'));
  const reco = document.getElementById("reco");
  if (!boxes.length || !reco) return;
  // data-weight: "hours" | "sprint"
  function evaluate(){
    let hours=0, sprint=0, total=0;
    boxes.forEach(function(b){
      if (!b.checked) return;
      total++;
      if (b.dataset.weight==="sprint") sprint+=1.4; else hours+=1;
    });
    const titleEl = document.getElementById("reco-title");
    const textEl = document.getElementById("reco-text");
    const btn = document.getElementById("reco-btn");
    let sprintChecked = 0;
    boxes.forEach(function(b){ if (b.checked && b.dataset.weight==="sprint") sprintChecked++; });
    if (total===0){
      reco.setAttribute("data-level","none");
      titleEl.textContent = "Noch alles offen.";
      textEl.textContent = "Markiert links, was heute zutrifft — die Empfehlung passt sich sofort an.";
      btn.href = "mailto:hello@blinkin.io?subject=Gespr%C3%A4ch%20buchen";
      return;
    }
    if (sprintChecked >= 2){
      reco.setAttribute("data-level","sprint");
      titleEl.textContent = "Empfehlung: Build Sprint";
      textEl.textContent = "Es gibt bereits einen konkreten Anwendungsfall mit Daten und fachlicher Verantwortung — hier bringt ein Sprint mit Konzeption und technischer Umsetzung den schnellsten messbaren Schritt.";
      btn.href = "mailto:hello@blinkin.io?subject=Build%20Sprint%20reservieren%20%E2%80%93%20%C3%BCber%20den%20Selbst-Check";
    } else {
      reco.setAttribute("data-level","hours");
      titleEl.textContent = "Empfehlung: AI Office Hours";
      textEl.textContent = "Es geht darum, den richtigen Anfang zu finden und Prioritäten zu setzen — genau dafür ist der monatliche Fahrplan gedacht. Monatlich kündbar.";
      btn.href = "mailto:hello@blinkin.io?subject=AI%20Office%20Hours%20starten%20%E2%80%93%20%C3%BCber%20den%20Selbst-Check";
    }
  }
  const countEl = document.getElementById("ist-zustand-count");
  const _origEvaluate = evaluate;
  evaluate = function(){
    _origEvaluate();
    let t = 0;
    boxes.forEach(function(b){ if (b.checked) t++; });
    if (countEl) countEl.textContent = t + " von " + boxes.length + " markiert";
  };
  boxes.forEach(b=>b.addEventListener("change", evaluate));
  evaluate();
})();

/* ================= three.js: the signal river ================= */
const canvas = document.getElementById("gl");
let renderer = null;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias:true, powerPreference:"high-performance" }); } catch(e){ renderer = null; }
if (!renderer){ canvas.remove(); document.documentElement.classList.add("webgl-fallback"); }
if (renderer){

renderer.setClearColor(0xf6f4ee, 1);
function sizeRenderer(){
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
}
sizeRenderer();

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xf6f4ee, 34, 150);
const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, .1, 500);

/* ---------- the path ---------- */
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 6),
  new THREE.Vector3(7, .8, -34),
  new THREE.Vector3(-7, -1.5, -76),
  new THREE.Vector3(6, 1.2, -118),
  new THREE.Vector3(-4, .5, -158),
  new THREE.Vector3(0, 2.2, -196),
  new THREE.Vector3(0, 1.5, -232)
], false, "catmullrom", .5);
const SEG = 1600;
const samples = [];
for (let i=0;i<=SEG;i++) samples.push(curve.getPointAt(i/SEG));
function sampleAt(u){
  const f = Math.min(.99999, Math.max(0, u)) * SEG;
  const i = Math.floor(f);
  return samples[i]; // nah genug für Partikel
}

/* ---------- flow particles ---------- */
const isSmall = window.innerWidth < 720;
const NFLOW = isSmall ? 1500 : 2600;
const NDUST = isSmall ? 700 : 1300;
const flowPos = new Float32Array(NFLOW*3);
const flowCol = new Float32Array(NFLOW*3);
const flow = { u: new Float32Array(NFLOW), r: new Float32Array(NFLOW), a: new Float32Array(NFLOW), sp: new Float32Array(NFLOW), mix: new Float32Array(NFLOW), ox: new Float32Array(NFLOW), oy: new Float32Array(NFLOW), oz: new Float32Array(NFLOW) };
const COB = new THREE.Color(0x2440e0), LITE = new THREE.Color(0xb9c4f2), AMB = new THREE.Color(0xe88a00);
// finish-review F10: excited variants precomputed once (no per-frame clones)
const EXC = { cobalt: COB.clone().lerp(AMB,.85), lite: LITE.clone().lerp(AMB,.85), amber: AMB.clone() };
for (let i=0;i<NFLOW;i++){
  flow.u[i] = Math.random();
  flow.r[i] = Math.pow(Math.random(), .6) * (i%7===0 ? 10 : 5.5);
  flow.a[i] = Math.random()*Math.PI*2;
  flow.sp[i] = .006 + Math.random()*.012;
  flow.mix[i] = Math.random();
  flow.ox[i] = (Math.random()-.5)*1.6; flow.oy[i] = (Math.random()-.5)*1.6; flow.oz[i] = (Math.random()-.5)*1.6;
}
const flowGeo = new THREE.BufferGeometry();
flowGeo.setAttribute("position", new THREE.BufferAttribute(flowPos,3));
flowGeo.setAttribute("color", new THREE.BufferAttribute(flowCol,3));
const cnv = document.createElement("canvas"); cnv.width = cnv.height = 64;
const c2 = cnv.getContext("2d");
const g2 = c2.createRadialGradient(32,32,0,32,32,32);
g2.addColorStop(0,"rgba(255,255,255,1)"); g2.addColorStop(.4,"rgba(255,255,255,.65)"); g2.addColorStop(1,"rgba(255,255,255,0)");
c2.fillStyle = g2; c2.fillRect(0,0,64,64);
const sprite = new THREE.CanvasTexture(cnv);
const flowMat = new THREE.PointsMaterial({ size: isSmall? .9 : .7, map: sprite, vertexColors:true, transparent:true, opacity:.95, depthWrite:false, blending:THREE.AdditiveBlending });
scene.add(new THREE.Points(flowGeo, flowMat));

/* ---------- dust ---------- */
const dustPos = new Float32Array(NDUST*3);
for (let i=0;i<NDUST;i++){
  const p = curve.getPointAt(Math.random());
  dustPos[i*3] = p.x + (Math.random()-.5)*46;
  dustPos[i*3+1] = p.y + (Math.random()-.5)*30;
  dustPos[i*3+2] = p.z + (Math.random()-.5)*46;
}
const dustGeo = new THREE.BufferGeometry();
dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos,3));
scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ size: isSmall? .55 : .42, map: sprite, color:0x9aa6d8, transparent:true, opacity:.5, depthWrite:false })));

/* ---------- gates (weeks) ---------- */
const gates = [];
[.30,.355,.41,.465].forEach(function(t,i){
  const geoT = new THREE.TorusGeometry(8.6, .22, 10, 72);
  const matT = new THREE.MeshBasicMaterial({ color: i===3 ? 0xe88a00 : 0x2440e0, transparent:true, opacity:.9 });
  const m = new THREE.Mesh(geoT, matT);
  const p = curve.getPointAt(t), pn = curve.getPointAt(t+.004);
  m.position.copy(p); m.lookAt(pn);
  scene.add(m); gates.push(m);
});
/* ---------- pillars (proof) ---------- */
for (let i=0;i<10;i++){
  const t = .60 + i*.016;
  const p = curve.getPointAt(t), pn = curve.getPointAt(t+.004);
  const side = i%2 ? 1 : -1;
  const right = new THREE.Vector3().subVectors(pn,p).cross(new THREE.Vector3(0,1,0)).normalize();
  const m = new THREE.Mesh(new THREE.BoxGeometry(2.2, 13+Math.random()*7, 2.2), new THREE.MeshBasicMaterial({ color:0xd7ddf4, transparent:true, opacity:.9 }));
  m.position.copy(p).addScaledVector(right, side*(11+Math.random()*5));
  m.position.y -= 3;
  m.lookAt(pn.x, m.position.y, pn.z);
  scene.add(m);
}
/* ---------- destination core ---------- */
const coreT = .985;
const corePos = curve.getPointAt(coreT);
const core = new THREE.Mesh(new THREE.SphereGeometry(3.4, 32, 32), new THREE.MeshBasicMaterial({ color:0xffb35c }));
core.position.copy(corePos); scene.add(core);
const haloCnv = document.createElement("canvas"); haloCnv.width = haloCnv.height = 128;
const hc = haloCnv.getContext("2d");
const hg = hc.createRadialGradient(64,64,0,64,64,64);
hg.addColorStop(0,"rgba(255,179,92,.9)"); hg.addColorStop(.4,"rgba(255,179,92,.35)"); hg.addColorStop(1,"rgba(255,179,92,0)");
hc.fillStyle = hg; hc.fillRect(0,0,128,128);
const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map:new THREE.CanvasTexture(haloCnv), transparent:true, depthWrite:false }));
halo.scale.set(46,46,1); halo.position.copy(corePos); scene.add(halo);

/* ---------- scroll → camera t ---------- */
const camStops = Array.from(document.querySelectorAll("[data-cam]"));
let anchors = [];
function measure(){
  anchors = camStops.map(function(el){
    const r = el.getBoundingClientRect();
    return { y: r.top + window.scrollY + r.height/2, t: parseFloat(el.getAttribute("data-cam")) };
  }).sort(function(a,b){ return a.y-b.y; });
}
measure();
function camTarget(){
  const c = window.scrollY + window.innerHeight/2;
  if (!anchors.length) return 0;
  if (c <= anchors[0].y) return anchors[0].t;
  for (let k=0;k<anchors.length-1;k++){
    if (c < anchors[k+1].y){
      const f = (c-anchors[k].y)/(anchors[k+1].y-anchors[k].y);
      const s = f*f*(3-2*f);
      return anchors[k].t + (anchors[k+1].t-anchors[k].t)*s;
    }
  }
  return anchors[anchors.length-1].t;
}

let curT = 0, vel = 0, lastY = window.scrollY;
let mx = 0, my = 0, mxT = 0, myT = 0;
let ppx = .5, ppy = .5, pSpeed = 0, lastPX = null, lastPY = null;
window.addEventListener("pointermove", function(e){
  mxT = e.clientX/window.innerWidth - .5;
  myT = e.clientY/window.innerHeight - .5;
  if (lastPX !== null){
    const dx = e.clientX - lastPX, dy = e.clientY - lastPY;
    pSpeed = Math.min(1, Math.hypot(dx,dy)/60);
  }
  lastPX = e.clientX; lastPY = e.clientY;
}, { passive:true });

const clock = { last: performance.now() };
let running = true;
document.addEventListener("visibilitychange", function(){ running = !document.hidden; if (running){ clock.last = performance.now(); tick(); } });

function render(dt, time){
  const target = REDUCED ? .16 : camTarget();
  curT += (target - curT) * Math.min(1, dt*3.4);
  // velocity → fov
  const y = window.scrollY;
  const instV = Math.abs(y - lastY) / Math.max(dt, .001); lastY = y;
  const fovT = 55 + Math.min(9, instV*.006);
  camera.fov += (fovT - camera.fov)*.06;
  camera.updateProjectionMatrix();

  const tPos = curve.getPointAt(Math.min(.999, Math.max(0, curT)));
  const ahead = curve.getPointAt(Math.min(.999, curT + .012));
  mx += (mxT-mx)*.05; my += (myT-my)*.05;
  const right = new THREE.Vector3().subVectors(ahead,tPos).cross(new THREE.Vector3(0,1,0)).normalize();
  camera.position.copy(tPos).addScaledVector(right, mx*3.2);
  camera.position.y += -my*2.2 + Math.sin(time*.6)*.25;
  camera.lookAt(ahead.x + mx*4, ahead.y - my*2.4, ahead.z);

  // flow particles — pointer-velocity excitement near the projected cursor
  // (finish-review F1: locality via screen-space projection of candidate particles)
  pSpeed *= .9; // decay between moves
  const excite = pSpeed > .04 && !REDUCED;
  const R2 = .16 * .16;
  const ndc = new THREE.Vector3();
  for (let i=0;i<NFLOW;i++){
    flow.u[i] = (flow.u[i] + flow.sp[i]*dt) % 1;
    const p = sampleAt(flow.u[i]);
    const a = flow.a[i];
    flowPos[i*3]   = p.x + Math.cos(a)*flow.r[i] + flow.ox[i];
    flowPos[i*3+1] = p.y + Math.sin(a)*flow.r[i]*.55 + flow.oy[i];
    flowPos[i*3+2] = p.z + flow.oz[i];
    const m = flow.mix[i];
    let col = m > .93 ? AMB : (m > .45 ? LITE : COB);
    if (excite && i % 3 === 0){
      ndc.set(flowPos[i*3], flowPos[i*3+1], flowPos[i*3+2]).project(camera);
      const dxn = (ndc.x - (ppx*2-1)) * camera.aspect, dyn = ndc.y - (ppy*2-1);
      if (ndc.z < 1 && dxn*dxn + dyn*dyn < R2) col = m > .93 ? EXC.amber : (m > .45 ? EXC.lite : EXC.cobalt);
    }
    flowCol[i*3] = col.r; flowCol[i*3+1] = col.g; flowCol[i*3+2] = col.b;
  }
  flowGeo.attributes.position.needsUpdate = true;
  flowGeo.attributes.color.needsUpdate = true;

  gates.forEach(function(g,i){ g.rotation.z = time*(i%2? -.12 : .12); });
  halo.material.opacity = .8 + Math.sin(time*1.4)*.15;

  renderer.render(scene, camera);
}

function tick(){
  if (!running || REDUCED) return;
  const now = performance.now();
  const dt = Math.min(.05, (now-clock.last)/1000); clock.last = now;
  render(dt, now/1000);
  requestAnimationFrame(tick);
}

window.addEventListener("resize", function(){
  sizeRenderer();
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  measure();
});
window.addEventListener("load", measure);
if ("ResizeObserver" in window) new ResizeObserver(function(){ measure(); }).observe(document.body);

// start
render(.016, 0);
if (!REDUCED) tick();

} // end renderer guard
