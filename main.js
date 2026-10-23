// ===== CYBER STATS SLIDER =====
var cyberIdx=0;
var cyberTimer;
function cyberSlide(n){
  var slides=document.querySelectorAll('.cyber-slide');
  var dots=document.querySelectorAll('.cyber-dot');
  slides.forEach(function(s){s.classList.remove('active');});
  dots.forEach(function(d){d.classList.remove('active');});
  if(slides[n])slides[n].classList.add('active');
  if(dots[n])dots[n].classList.add('active');
  cyberIdx=n;
  clearInterval(cyberTimer);
  cyberTimer=setInterval(function(){cyberSlide((cyberIdx+1)%4);},4000);
}
document.addEventListener('DOMContentLoaded',function(){
  cyberTimer=setInterval(function(){cyberSlide((cyberIdx+1)%4);},4000);
});

document.addEventListener('DOMContentLoaded',function(){

var hbg=document.getElementById('hamburger');
var mMenu=document.getElementById('main-menu');
var nOv=document.getElementById('nav-overlay');

function closeNav(){
  if(hbg)hbg.classList.remove('open');
  if(mMenu)mMenu.classList.remove('open');
  if(nOv)nOv.classList.remove('open');
  if(hbg)hbg.setAttribute('aria-expanded','false');
}

if(hbg){hbg.addEventListener('click',function(){
  var o=mMenu&&mMenu.classList.contains('open');
  if(o){closeNav();}
  else{hbg.classList.add('open');if(mMenu)mMenu.classList.add('open');if(nOv)nOv.classList.add('open');hbg.setAttribute('aria-expanded','true');}
});}
if(nOv)nOv.addEventListener('click',closeNav);
if(mMenu){mMenu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setTimeout(closeNav,100);});});}

document.querySelectorAll('.nav-dropdown > a').forEach(function(btn){
  btn.addEventListener('click',function(e){
    if(window.innerWidth>900){
      e.preventDefault();
      e.stopPropagation();
      var li=this.parentElement;
      var open=li.classList.contains('open');
      document.querySelectorAll('.nav-dropdown').forEach(function(d){d.classList.remove('open');});
      if(!open){li.classList.add('open');}
      this.setAttribute('aria-expanded',String(!open));
    }
  });
});

document.addEventListener('click',function(e){
  if(!e.target.closest('.nav-dropdown')){
    document.querySelectorAll('.nav-dropdown').forEach(function(d){d.classList.remove('open');});
  }
});

var tBar=document.getElementById('tooltip-bar');
var tText=document.getElementById('tooltip-text');
var tIcon=document.getElementById('tooltip-icon');
var tTimer=null;
function showTip(el){var tip=el.getAttribute('data-tip');if(!tip)return;var parts=tip.split('|');if(tIcon)tIcon.textContent=parts.length>1?parts[0]:'i';if(tText)tText.textContent=parts.length>1?parts[1]:parts[0];if(tBar)tBar.classList.add('visible');clearTimeout(tTimer);}
function hideTip(){tTimer=setTimeout(function(){if(tBar)tBar.classList.remove('visible');},300);}
document.querySelectorAll('[data-tip]').forEach(function(el){el.addEventListener('mouseenter',function(){showTip(this);});el.addEventListener('mouseleave',hideTip);});

function sanitizeInput(str){return str.replace(/[<>"'&]/g,function(c){return{'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;','&':'&amp;'}[c];});}
var form=document.getElementById('contact-form');
if(form){form.addEventListener('submit',function(e){
  e.preventDefault();
  var valid=true;
  var name=document.getElementById('name');
  var email=document.getElementById('email');
  var phone=document.getElementById('phone');
  var ne=document.getElementById('name-error');
  var ee=document.getElementById('email-error');
  var pe=document.getElementById('phone-error');
  if(name&&ne){var cn=name.value.trim();if(cn.length<2||cn.length>30){ne.style.display='block';name.setAttribute('aria-invalid','true');valid=false;}else{ne.style.display='none';name.setAttribute('aria-invalid','false');name.value=sanitizeInput(cn);}}
  if(email&&ee){var er=/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;var ec=email.value.trim();if(!er.test(ec)){ee.style.display='block';email.setAttribute('aria-invalid','true');valid=false;}else{ee.style.display='none';email.setAttribute('aria-invalid','false');email.value=sanitizeInput(ec);}}
  if(phone&&pe){var ph=phone.value.trim().replace(/[-\s]/g,'');if(!/^05\d{8}$/.test(ph)&&!/^0[^5]\d{7}$/.test(ph)){pe.style.display='block';phone.setAttribute('aria-invalid','true');valid=false;}else{pe.style.display='none';phone.setAttribute('aria-invalid','false');phone.value=sanitizeInput(phone.value.trim());}}
  var msgEl=document.getElementById('message');if(msgEl){msgEl.value=sanitizeInput(msgEl.value.trim());}
  if(msgEl&&msgEl.value.length>1000){alert('ההודעה ארוכה מדי (מקסימום 1000 תווים).');return;}
  if(!valid){return;}
  var consent=document.getElementById('privacy-consent');
  if(consent&&!consent.checked){alert('יש לאשר את מדיניות הפרטיות לפני שליחה.');return;}
  var submitBtn=form.querySelector('[type="submit"]');
  if(submitBtn){submitBtn.disabled=true;submitBtn.textContent='שולח...';}
  var data=new FormData(form);
  var fMsg=document.getElementById('form-msg');
  fetch('https://api.web3forms.com/submit',{method:'POST',body:data}).then(function(r){return r.json();}).then(function(res){if(res.success){form.reset();if(fMsg){fMsg.style.display='block';fMsg.style.background='#d4edda';fMsg.style.color='#155724';fMsg.style.border='1px solid #c3e6cb';fMsg.textContent='תודה! ההודעה התקבלה. נחזור אליך בהקדם.';setTimeout(function(){fMsg.style.display='none';},6000);}}else{if(fMsg){fMsg.style.display='block';fMsg.style.background='#f8d7da';fMsg.style.color='#721c24';fMsg.style.border='1px solid #f5c6cb';fMsg.textContent='שגיאה בשליחה. אנא נסה שוב.';}}}).catch(function(){if(fMsg){fMsg.style.display='block';fMsg.style.background='#f8d7da';fMsg.style.color='#721c24';fMsg.style.border='1px solid #f5c6cb';fMsg.textContent='שגיאה בשליחה. אנא נסה שוב.';}}).finally(function(){if(submitBtn){submitBtn.disabled=false;submitBtn.textContent='שלח פנייה';}});
});}

var serviceData={cyber:{icon:'🛡️',label:'אבטחת סייבר',title:'הגנה מקיפה',desc:'הגנה רב-שכבתית.',items:['ניטור 24/7','זיהוי חדירות','הגנת וירוסים','תגובה מהירה','דוחות']},it:{icon:'💻',label:'ניהול IT',title:'ניהול תשתיות',desc:'שירותי IT מנוהלים.',items:['שרתים','תמיכה טכנית','עדכונים','הרשאות','פתרונות']},backup:{icon:'☁️',label:'גיבוי וענן',title:'הנתונים מוגנים',desc:'גיבוי לפי כלל 3-2-1.',items:['גיבוי יומי','גיבוי חיצוני','שחזור','הצפנה','זמינות']},monitor:{icon:'👁️',label:'ניטור 24/7',title:'עין פקוחה',desc:'מרכז תפעול 24/7.',items:['מעקב רציף','התראות','זיהוי','דוחות','תגובה']},pentest:{icon:'🔓',label:'בדיקות חדירה',title:'מצא חולשות',desc:'סימולציה מבוקרת.',items:['סריקה','ניצול מבוקר','דוח','המלצות','בדיקה חוזרת']},training:{icon:'🎓',label:'הדרכות',title:'קו ההגנה הראשון',desc:'95% בטעות אנוש.',items:['פישינג','סיסמאות','נהלים','תרגילים','הדרכות']}};

var mOv=document.getElementById('modal-overlay');
var mCl=document.getElementById('modal-close');
function closeModal(){if(mOv){mOv.classList.remove('open');mOv.setAttribute('aria-hidden','true');}if(mCl)mCl.setAttribute('tabindex','-1');var mCta=document.querySelector('.modal-cta');if(mCta)mCta.setAttribute('tabindex','-1');document.body.style.overflow='';}
function openModal(key){var d=serviceData[key];if(!d||!mOv)return;document.getElementById('modal-icon').textContent=d.icon;document.getElementById('modal-label').textContent=d.label;document.getElementById('modal-title').textContent=d.title;document.getElementById('modal-desc').textContent=d.desc;var ul=document.getElementById('modal-list');ul.innerHTML='';d.items.forEach(function(item){var li=document.createElement('li');li.textContent=item;ul.appendChild(li);});mOv.classList.add('open');mOv.setAttribute('aria-hidden','false');if(mCl)mCl.setAttribute('tabindex','0');var mCta=document.querySelector('.modal-cta');if(mCta)mCta.setAttribute('tabindex','0');document.body.style.overflow='hidden';if(mCl)mCl.focus();}
if(mCl)mCl.addEventListener('click',closeModal);
if(mOv)mOv.addEventListener('click',function(e){if(e.target===mOv)closeModal();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});
document.querySelectorAll('[data-service]').forEach(function(card){card.addEventListener('click',function(e){e.stopPropagation();openModal(this.getAttribute('data-service'));});card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(this.getAttribute('data-service'));}});});

var heroIdx=0;
var heroTimer=setInterval(function(){heroSlide((heroIdx+1)%3);},4000);
function heroSlide(n){
  var slides=[document.getElementById('slide1'),document.getElementById('slide2'),document.getElementById('slide3')];
  var dots=[document.getElementById('hdot0'),document.getElementById('hdot1'),document.getElementById('hdot2')];
  if(!slides[0])return;
  heroIdx=n;
  slides.forEach(function(s,i){if(s)s.style.display=i===n?'block':'none';});
  dots.forEach(function(d,i){if(d)d.style.background=i===n?'rgba(0,95,138,0.8)':'transparent';});
  clearInterval(heroTimer);
  heroTimer=setInterval(function(){heroSlide((heroIdx+1)%3);},4000);
}
var hdot0=document.getElementById('hdot0');var hdot1=document.getElementById('hdot1');var hdot2=document.getElementById('hdot2');
if(hdot0)hdot0.addEventListener('click',function(){heroSlide(0);});
if(hdot1)hdot1.addEventListener('click',function(){heroSlide(1);});
if(hdot2)hdot2.addEventListener('click',function(){heroSlide(2);});

var _fs=100;
var bc=document.getElementById('btn-contrast');
var bl=document.getElementById('btn-larger');
var bs=document.getElementById('btn-smaller');
var bk=document.getElementById('btn-links');
if(bc)bc.addEventListener('click',function(){var on=document.body.classList.toggle('high-contrast');this.setAttribute('aria-pressed',String(on));});
if(bl)bl.addEventListener('click',function(){if(_fs<150){_fs+=10;document.documentElement.style.fontSize=_fs+'%';}this.setAttribute('aria-pressed',_fs>100?'true':'false');});
if(bs)bs.addEventListener('click',function(){if(_fs>80){_fs-=10;document.documentElement.style.fontSize=_fs+'%';}this.setAttribute('aria-pressed',_fs<100?'true':'false');});
if(bk)bk.addEventListener('click',function(){var on=document.body.classList.toggle('highlight-links');this.setAttribute('aria-pressed',String(on));if(on){var st=document.createElement('style');st.id='hl';st.textContent='a{outline:2px solid #005f8a!important;text-decoration:underline!important;}';document.head.appendChild(st);}else{var s=document.getElementById('hl');if(s)s.remove();}});

});

// ===== EMAIL BUTTON =====
var emailBtn=document.getElementById('email-btn');
if(emailBtn){emailBtn.addEventListener('click',function(){window.location.href='mai'+'lto:morofsec74'+'@gmail.com';});}

// ===== BACK TO TOP =====
var btt=document.getElementById('back-to-top');
if(btt){
  window.addEventListener('scroll',function(){
    if(window.scrollY>400){btt.style.display='flex';}else{btt.style.display='none';}
  });
  btt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
}

// ===== COUNTER ANIMATION =====
function animateCounters(){
  var cells=document.querySelectorAll('.cyber-table tbody td:not(:first-child):not(:last-child):not(.change-up):not(.change-danger):not(.change-neutral)');
  cells.forEach(function(cell){
    var text=cell.getAttribute('data-orig')||cell.textContent.trim();
    var num=parseFloat(text.replace(/[^0-9.]/g,''));
    if(isNaN(num)||num===0)return;
    var prefix=text.match(/^[^0-9]*/)[0];
    var suffix=text.match(/[^0-9.]*$/)[0];
    var duration=1500;
    var steps=40;
    var step=0;
    var timer=setInterval(function(){
      step++;
      var val=num*(step/steps);
      var display=Number.isInteger(num)?Math.round(val).toString():val.toFixed(2);
      cell.textContent=prefix+display+suffix;
      if(step>=steps){cell.textContent=text;clearInterval(timer);}
    },duration/steps);
  });
}
var cyberTable=document.querySelector('.cyber-table');
if(cyberTable){
  var origCells=cyberTable.querySelectorAll('tbody td:not(:first-child):not(:last-child):not(.change-up):not(.change-danger):not(.change-neutral)');
  origCells.forEach(function(cell){cell.setAttribute('data-orig',cell.textContent.trim());});
  var counterObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        // איפוס לפני ריצה
        origCells.forEach(function(cell){cell.textContent=cell.getAttribute('data-orig');});
        animateCounters();
      }
    });
  },{threshold:0.3,rootMargin:'0px'});
  counterObserver.observe(cyberTable);
}

// ===== FADE-IN ON SCROLL =====
var fadeEls=document.querySelectorAll('section, .service-card, .cyber-stat-card');
var fadeObserver=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){entry.target.classList.add('fade-in-visible');}
  });
},{threshold:0.08});
fadeEls.forEach(function(el){
  el.classList.add('fade-in-ready');
  fadeObserver.observe(el);
});
