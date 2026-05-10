document.addEventListener('DOMContentLoaded',function(){
var _fs=100;
document.getElementById('btn-contrast').addEventListener('click',function(){var on=document.body.classList.toggle('high-contrast');this.setAttribute('aria-pressed',String(on));});
document.getElementById('btn-larger').addEventListener('click',function(){if(_fs<150){_fs+=10;document.documentElement.style.fontSize=_fs+'%';}this.setAttribute('aria-pressed',_fs>100?'true':'false');});
document.getElementById('btn-smaller').addEventListener('click',function(){if(_fs>80){_fs-=10;document.documentElement.style.fontSize=_fs+'%';}this.setAttribute('aria-pressed',_fs<100?'true':'false');});
document.getElementById('btn-links').addEventListener('click',function(){var on=document.body.classList.toggle('highlight-links');this.setAttribute('aria-pressed',String(on));if(on){var st=document.createElement('style');st.id='hl';st.textContent='a{outline:2px solid #005f8a!important;text-decoration:underline!important;}';document.head.appendChild(st);}else{var s=document.getElementById('hl');if(s)s.remove();}});

// ===== NAV DROPDOWN (מחשב) =====
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

// ===== HAMBURGER (סלולרי) =====
var hbg=document.getElementById('hamburger');
var mMenu=document.getElementById('main-menu');
var nOv=document.getElementById('nav-overlay');

function closeNav(){
  if(hbg)hbg.classList.remove('open');
  if(mMenu)mMenu.classList.remove('open');
  if(nOv)nOv.classList.remove('open');
  if(hbg)hbg.setAttribute('aria-expanded','false');
}

if(hbg){
  hbg.addEventListener('click',function(){
    var o=mMenu&&mMenu.classList.contains('open');
    if(o){closeNav();}
    else{
      hbg.classList.add('open');
      if(mMenu)mMenu.classList.add('open');
      if(nOv)nOv.classList.add('open');
      hbg.setAttribute('aria-expanded','true');
    }
  });
}
if(nOv)nOv.addEventListener('click',closeNav);
if(mMenu){
  mMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      setTimeout(closeNav,100);
    });
  });
}

// ===== TOOLTIP =====
var tBar=document.getElementById('tooltip-bar');
var tText=document.getElementById('tooltip-text');
var tIcon=document.getElementById('tooltip-icon');
var tTimer=null;
function showTip(el){
  var tip=el.getAttribute('data-tip');
  if(!tip)return;
  var parts=tip.split('|');
  if(tIcon)tIcon.textContent=parts.length>1?parts[0]:'i';
  if(tText)tText.textContent=parts.length>1?parts[1]:parts[0];
  if(tBar)tBar.classList.add('visible');
  clearTimeout(tTimer);
}
function hideTip(){tTimer=setTimeout(function(){if(tBar)tBar.classList.remove('visible');},300);}
document.querySelectorAll('[data-tip]').forEach(function(el){
  el.addEventListener('mouseenter',function(){showTip(this);});
  el.addEventListener('mouseleave',hideTip);
});

// ===== FORM =====
var form=document.getElementById('contact-form');
if(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var valid=true;
    var name=document.getElementById('name');
    var email=document.getElementById('email');
    var phone=document.getElementById('phone');
    var ne=document.getElementById('name-error');
    var ee=document.getElementById('email-error');
    var pe=document.getElementById('phone-error');
    if(name&&ne){
      var cn=name.value.trim();
      if(cn.length<2||cn.length>30){ne.style.display='block';name.setAttribute('aria-invalid','true');valid=false;}
      else{ne.style.display='none';name.setAttribute('aria-invalid','false');}
    }
    if(email&&ee){
      var er=/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
      if(!er.test(email.value.trim())){ee.style.display='block';email.setAttribute('aria-invalid','true');valid=false;}
      else{ee.style.display='none';email.setAttribute('aria-invalid','false');}
    }
    if(phone&&pe){
      var ph=phone.value.trim().replace(/[-\s]/g,'');
      if(!/^05\d{8}$/.test(ph)&&!/^0[^5]\d{7}$/.test(ph)){pe.style.display='block';phone.setAttribute('aria-invalid','true');valid=false;}
      else{pe.style.display='none';phone.setAttribute('aria-invalid','false');}
    }
    if(!valid)return;
    var data=new FormData(form);
    fetch('https://api.web3forms.com/submit',{method:'POST',body:data})
    .then(function(r){return r.json();})
    .then(function(res){
      if(res.success){form.reset();alert('תודה! ההודעה התקבלה. נחזור אליך בהקדם.');}
      else{alert('שגיאה בשליחה. נסה שוב.');}
    }).catch(function(){alert('שגיאה בשליחה. נסה שוב.');});
  });
}

// ===== MODALS (שירותים) =====
var serviceData={
  cyber:{icon:'🛡️',label:'אבטחת סייבר',title:'הגנה מקיפה על המערכות שלך',desc:'הגנה רב-שכבתית מפני איומי סייבר.',items:['ניטור איומים 24/7','זיהוי ומניעת חדירות','הגנה מפני וירוסים','תגובה מהירה','דוחות אבטחה']},
  it:{icon:'💻',label:'ניהול IT',title:'ניהול מלא של תשתיות המחשוב',desc:'שירותי IT מנוהלים מלאים.',items:['הקמה וניהול שרתים','תמיכה טכנית','עדכוני תוכנה','ניהול הרשאות','פתרונות מותאמים']},
  backup:{icon:'☁️',label:'גיבוי וענן',title:'הנתונים שלך מוגנים תמיד',desc:'גיבוי אוטומטי לפי כלל 3-2-1.',items:['גיבוי יומי לענן','גיבוי חיצוני','בדיקות שחזור','הצפנה','שחזור מהיר']},
  monitor:{icon:'👁️',label:'ניטור 24/7',title:'עין פקוחה סביב השעון',desc:'מרכז תפעול אבטחה 24/7.',items:['מעקב רציף','התראות מיידיות','זיהוי תקיפות','דוחות שוטפים','תגובה מיידית']},
  pentest:{icon:'🔓',label:'בדיקות חדירה',title:'מצא חולשות לפני האקרים',desc:'סימולציית תקיפה מבוקרת.',items:['סריקה מלאה','ניצול מבוקר','דוח סיכונים','המלצות תיקון','בדיקה חוזרת']},
  training:{icon:'🎓',label:'הדרכות אבטחה',title:'הצוות — קו ההגנה הראשון',desc:'95% מהפרצות בטעות אנוש.',items:['זיהוי פישינג','סיסמאות ו-MFA','נהלי אבטחה','תרגילים','הדרכות מותאמות']}
};

var mOv=document.getElementById('modal-overlay');
var mCl=document.getElementById('modal-close');

function closeModal(){
  if(mOv){mOv.classList.remove('open');mOv.setAttribute('aria-hidden','true');}
  document.body.style.overflow='';
}

function openModal(key){
  var d=serviceData[key];
  if(!d||!mOv)return;
  document.getElementById('modal-icon').textContent=d.icon;
  document.getElementById('modal-label').textContent=d.label;
  document.getElementById('modal-title').textContent=d.title;
  document.getElementById('modal-desc').textContent=d.desc;
  var ul=document.getElementById('modal-list');
  ul.innerHTML='';
  d.items.forEach(function(item){var li=document.createElement('li');li.textContent=item;ul.appendChild(li);});
  mOv.classList.add('open');
  mOv.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  if(mCl)mCl.focus();
}

if(mCl)mCl.addEventListener('click',closeModal);
if(mOv)mOv.addEventListener('click',function(e){if(e.target===mOv)closeModal();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});

document.querySelectorAll('[data-service]').forEach(function(card){
  card.addEventListener('click',function(e){
    e.stopPropagation();
    openModal(this.getAttribute('data-service'));
  });
  card.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(this.getAttribute('data-service'));}
  });
});

// ===== HERO SLIDER =====
var heroIdx=0;
var heroTimer=setInterval(function(){heroSlide(heroIdx===0?1:0);},4000);
function heroSlide(n){
  var s1=document.getElementById('slide1');
  var s2=document.getElementById('slide2');
  var d0=document.getElementById('hdot0');
  var d1=document.getElementById('hdot1');
  if(!s1||!s2)return;
  heroIdx=n;
  s1.style.display=n===0?'block':'none';
  s2.style.display=n===1?'block':'none';
  if(d0)d0.style.background=n===0?'#005f8a':'transparent';
  if(d1)d1.style.background=n===1?'#005f8a':'transparent';
  clearInterval(heroTimer);
  heroTimer=setInterval(function(){heroSlide(heroIdx===0?1:0);},4000);
}
var hdot0=document.getElementById('hdot0');
var hdot1=document.getElementById('hdot1');
if(hdot0)hdot0.addEventListener('click',function(){heroSlide(0);});
if(hdot1)hdot1.addEventListener('click',function(){heroSlide(1);});

// ===== נגישות =====
var _fs=100;
var bc=document.getElementById('btn-contrast');
var bl=document.getElementById('btn-larger');
var bs=document.getElementById('btn-smaller');
var bk=document.getElementById('btn-links');
if(bc)bc.addEventListener('click',function(){
  var on=document.body.classList.toggle('high-contrast');
  this.setAttribute('aria-pressed',String(on));
});
if(bl)bl.addEventListener('click',function(){
  if(_fs<150){_fs+=10;document.documentElement.style.fontSize=_fs+'%';}
  this.setAttribute('aria-pressed',_fs>100?'true':'false');
});
if(bs)bs.addEventListener('click',function(){
  if(_fs>80){_fs-=10;document.documentElement.style.fontSize=_fs+'%';}
  this.setAttribute('aria-pressed',_fs<100?'true':'false');
});
if(bk)bk.addEventListener('click',function(){
  var on=document.body.classList.toggle('highlight-links');
  this.setAttribute('aria-pressed',String(on));
  if(on){
    var st=document.createElement('style');
    st.id='hl';
    st.textContent='a{outline:2px solid #005f8a!important;text-decoration:underline!important;}';
    document.head.appendChild(st);
  }else{
    var s=document.getElementById('hl');
    if(s)s.remove();
  }
});

});
