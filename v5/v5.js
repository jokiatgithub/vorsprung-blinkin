// BLINKIN V5 — Shibuya Sleeve interactions
document.documentElement.classList.add('js');

// crate menu
(function(){
  var t=document.querySelector('.menu-toggle'),n=document.getElementById('site-nav');
  if(!t||!n)return;
  t.addEventListener('click',function(){
    var open=n.classList.toggle('open');
    t.setAttribute('aria-expanded',open?'true':'false');
  });
  n.addEventListener('keydown',function(e){if(e.key==='Escape'){n.classList.remove('open');t.setAttribute('aria-expanded','false');t.focus();}});
})();

// reveal on scroll
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
  },{threshold:.12});
  els.forEach(function(e){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){e.classList.add('in');}else{io.observe(e);}
  });
})();

// tracklist accordion (details-free, button + aria)
(function(){
  document.querySelectorAll('.track-head').forEach(function(btn){
    btn.addEventListener('click',function(){
      var row=btn.closest('.track');
      var open=row.getAttribute('data-open')==='true';
      row.setAttribute('data-open',open?'false':'true');
      btn.setAttribute('aria-expanded',open?'false':'true');
    });
  });
})();

// self-check lamp
(function(){
  var boxes=document.querySelectorAll('.check-list input[type="checkbox"]');
  var card=document.querySelector('.postcard-head[data-level]');
  var count=document.getElementById('self-check-count');
  var msg=document.getElementById('self-check-message');
  if(!boxes.length||!card)return;
  var M={
    neutral:['0 von 5 markiert','Markiert, was heute zutrifft.'],
    watch:['Erste Treffer','Ein oder zwei Punkte treffen zu — ein Blick lohnt sich.'],
    action:['Klarer Fall','Mehrere Punkte treffen zu — bringt einen Ablauf mit.'],
    urgent:['Volles Bild','Fast alles trifft zu — startet sofort durch.']
  };
  function upd(){
    var n=[...boxes].filter(b=>b.checked).length;
    var k=n===0?'neutral':n<=2?'watch':n<=4?'action':'urgent';
    card.setAttribute('data-level',k);
    count.textContent=M[k][0].replace(/^\d/,String(n)).replace('0 von','0 von').replace('1 von','1 von');
    count.textContent=n+' von 5 markiert';
    msg.textContent=M[k][1];
  }
  boxes.forEach(function(b){b.addEventListener('change',upd)});
})();
