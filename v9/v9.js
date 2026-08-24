// ============================================================
// BLINKIN V9 — Parloa-Grammatik. Interaktionen ohne Framework.
// ============================================================
document.documentElement.classList.add("js");
var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* reveal */
(function(){
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || REDUCED){ els.forEach(function(e){ e.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function(en){
    en.forEach(function(x){ if (x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target); } });
  }, { threshold:.12 });
  els.forEach(function(e){ io.observe(e); });
})();

/* sticky cta */
(function(){
  var pill = document.getElementById("sticky-cta"), hero = document.getElementById("hero");
  function upd(){
    if (pill && hero) pill.classList.toggle("show", window.scrollY > hero.offsetTop + hero.offsetHeight*.6);
  }
  window.addEventListener("scroll", upd, { passive:true }); upd();
})();

/* branchen-switcher */
(function(){
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".seg-tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".seg-panel"));
  if (!tabs.length) return;
  function activate(i, focus){
    tabs.forEach(function(t,j){
      t.setAttribute("aria-selected", i===j ? "true" : "false");
      t.tabIndex = i===j ? 0 : -1;
    });
    panels.forEach(function(p,j){
      p.hidden = i!==j;
      p.setAttribute("aria-hidden", i!==j ? "true" : "false");
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function(t,i){
    t.addEventListener("click", function(){ activate(i,false); });
    t.addEventListener("keydown", function(e){
      var n = null;
      if (e.key==="ArrowDown"||e.key==="ArrowRight") n=(i+1)%tabs.length;
      if (e.key==="ArrowUp"||e.key==="ArrowLeft") n=(i-1+tabs.length)%tabs.length;
      if (e.key==="Home") n=0;
      if (e.key==="End") n=tabs.length-1;
      if (n!==null){ e.preventDefault(); activate(n,true); }
    });
  });
  activate(0,false);
})();

/* case tabs (dunkles Band) */
(function(){
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".case-tabs .tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".case-panel"));
  if (!tabs.length) return;
  function activate(i, focus){
    tabs.forEach(function(t,j){
      t.setAttribute("aria-selected", i===j ? "true" : "false");
      t.tabIndex = i===j ? 0 : -1;
    });
    panels.forEach(function(p,j){
      p.hidden = i!==j;
      p.setAttribute("aria-hidden", i!==j ? "true" : "false");
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function(t,i){
    t.addEventListener("click", function(){ activate(i,false); });
    t.addEventListener("keydown", function(e){
      var n = null;
      if (e.key==="ArrowRight") n=(i+1)%tabs.length;
      if (e.key==="ArrowLeft") n=(i-1+tabs.length)%tabs.length;
      if (n!==null){ e.preventDefault(); activate(n,true); }
    });
  });
  activate(0,false);
})();

/* faq */
document.querySelectorAll(".frage-kopf").forEach(function(btn){
  btn.addEventListener("click", function(){
    var row = btn.closest(".frage");
    var open = row.getAttribute("data-open")==="true";
    row.setAttribute("data-open", open ? "false" : "true");
    btn.setAttribute("aria-expanded", open ? "false" : "true");
  });
});

/* quali recommender */
(function(){
  var boxes = Array.prototype.slice.call(document.querySelectorAll('.check input[type="checkbox"]'));
  var reco = document.getElementById("reco");
  var countEl = document.getElementById("ist-zustand-count");
  if (!boxes.length || !reco) return;
  function evaluate(){
    var total = 0, sprintChecked = 0;
    boxes.forEach(function(b){
      if (!b.checked) return;
      total++;
      if (b.dataset.weight === "sprint") sprintChecked++;
    });
    if (countEl) countEl.textContent = total + " von " + boxes.length + " markiert";
    var titleEl = document.getElementById("reco-title");
    var textEl = document.getElementById("reco-text");
    var btn = document.getElementById("reco-btn");
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
      textEl.textContent = "Ein konkreter Anwendungsfall mit Daten und fachlicher Verantwortung ist bereit für die Umsetzung — der Build Sprint baut in vier Wochen den ersten testbaren Prototyp.";
      btn.href = "mailto:hello@blinkin.io?subject=Build%20Sprint%20reservieren%20%E2%80%93%20%C3%BCber%20den%20Selbst-Check";
    } else {
      reco.setAttribute("data-level","hours");
      titleEl.textContent = "Empfehlung: AI Office Hours";
      textEl.textContent = "Es geht darum, den richtigen Anfang zu finden und Prioritäten zu setzen — genau dafür ist der monatliche Fahrplan gedacht. Monatlich kündbar.";
      btn.href = "mailto:hello@blinkin.io?subject=AI%20Office%20Hours%20starten%20%E2%80%93%20%C3%BCber%20den%20Selbst-Check";
    }
  }
  boxes.forEach(function(b){ b.addEventListener("change", evaluate); });
  evaluate();
})();
