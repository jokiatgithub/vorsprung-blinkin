// BLINKIN V6 — Protokoll interactions
document.documentElement.classList.add('js');

// menu
(function(){
  var t=document.querySelector('.menu-toggle'),n=document.getElementById('site-nav');
  if(!t||!n)return;
  t.addEventListener('click',function(){
    var open=n.classList.toggle('open');
    t.setAttribute('aria-expanded',open?'true':'false');
  });
})();

// reveal
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(en){
    en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});
  },{threshold:.12});
  els.forEach(function(e){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){e.classList.add('in');}else{io.observe(e);}
  });
})();

// agenda scroll-spy + progress
(function(){
  var links=document.querySelectorAll('.agenda a[href^="#"]');
  var bar=document.querySelector('.progress em');
  if(!links.length)return;
  var map={};
  links.forEach(function(a){var s=document.getElementById(a.getAttribute('href').slice(1));if(s)map[s.id]=a;});
  function spy(){
    var y=window.scrollY+140,cur=null;
    Object.keys(map).forEach(function(id){
      var el=document.getElementById(id);
      if(el.offsetTop<=y)cur=id;
    });
    links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+cur);});
    if(bar){
      var h=document.documentElement.scrollHeight-window.innerHeight;
      bar.style.width=(h>0?Math.min(100,Math.round(window.scrollY/h*100)):0)+'%';
    }
  }
  window.addEventListener('scroll',spy,{passive:true});spy();
})();

// FAQ accordion
(function(){
  document.querySelectorAll('.frage-kopf').forEach(function(btn){
    btn.addEventListener('click',function(){
      var row=btn.closest('.frage');
      var open=row.getAttribute('data-open')==='true';
      row.setAttribute('data-open',open?'false':'true');
      btn.setAttribute('aria-expanded',open?'false':'true');
    });
  });
})();

// self-check
(function(){
  var boxes=document.querySelectorAll('.check-list input[type="checkbox"]');
  var countEl=document.getElementById('ist-zustand-count');
  var msgEl=document.getElementById('ist-zustand-message');
  if(!boxes.length||!countEl)return;
  var M={
    neutral:['0 von 5 markiert','Markiert, was heute zutrifft.'],
    watch:['1–2 Punkte markiert','Ein Anfang ist da — ein Blick auf die Angebote lohnt sich.'],
    action:['3–4 Punkte markiert','Klarer Fall — bringt einen konkreten Ablauf mit.'],
    urgent:['5 von 5 markiert','Volles Bild — startet direkt mit dem ersten Gespräch.']
  };
  function upd(){
    var n=Array.prototype.filter.call(boxes,function(b){return b.checked}).length;
    var k=n===0?'neutral':n<=2?'watch':n<=4?'action':'urgent';
    countEl.textContent=n+' von 5 markiert';
    msgEl.textContent=M[k][1];
  }
  boxes.forEach(function(b){b.addEventListener('change',upd)});
})();
