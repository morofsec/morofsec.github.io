/* --- MorOfSec - main.js Full Version --- */

// 1. רקע הקנבס והחלקיקים
const canvas = document.getElementById('bg-canvas'), ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.2 + 0.4;
        this.alpha = Math.random() * 0.35 + 0.1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
}

for (let i = 0; i < 70; i++) particles.push(new Particle());

function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,119,170,' + p.alpha + ')';
        ctx.fill();
    });
    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 110) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = 'rgba(0,119,170,' + (0.15 - d / 800) + ')';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(draw);
}
draw();

// 2. ניהול המודל (Pop-up)
const mOv = document.getElementById('modal-overlay'), mCl = document.getElementById('modal-close');
const servicesData = {
    'penetration': { label: 'בדיקת חדירות', title: 'בדיקות חדירות (PT)', desc: 'בדיקת חוסן המערכות שלך מול התקפות אמת.', items: ['איתור חולשות אבטחה', 'סימולציית תקיפה', 'דו"ח המלצות לתיקון'] },
    'incident': { label: 'תגובה לאירוע', title: 'תגובה לאירועי סייבר', desc: 'טיפול מהיר ומקצועי בזמן אמת באירועי פריצה.', items: ['בלימת התקיפה', 'חקירה פורנזית', 'חזרה לשגרה'] },
    'compliance': { label: 'רגולציה', title: 'עמידה בתקנים ורגולציה', desc: 'הכנת הארגון לעמידה בתקני אבטחה בינלאומיים.', items: ['ISO 27001', 'SOC2', 'הגנת הפרטיות'] },
    'consulting': { label: 'ייעוץ IT', title: 'ייעוץ אבטחה ו-IT', desc: 'ליווי טכנולוגי מקצה לקצה לעסק שלך.', items: ['תכנון ארכיטקטורה', 'ניהול סיכונים', 'פתרונות ענן'] }
};

function openModal(id) {
    const d = servicesData[id];
    if (!d) return;
    document.getElementById('modal-label').textContent = d.label;
    document.getElementById('modal-title').textContent = d.title;
    document.getElementById('modal-desc').textContent = d.desc;
    var ul = document.getElementById('modal-list');
    ul.innerHTML = '';
    d.items.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    mOv.classList.add('open');
    mOv.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    mCl.focus();
}

function closeModal() {
    mOv.classList.remove('open');
    mOv.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// 3. לוגיקת הסליידר (Hero Slider)
var heroIdx = 0;
var heroTimer = setInterval(function () { heroSlide(heroIdx === 0 ? 1 : 0); }, 4000);

function pauseHero() { clearInterval(heroTimer); }
function resumeHero() {
    clearInterval(heroTimer);
    heroTimer = setInterval(function () { heroSlide(heroIdx === 0 ? 1 : 0); }, 4000);
}

function heroSlide(n) {
    var s1 = document.getElementById('slide1'), s2 = document.getElementById('slide2'), d0 = document.getElementById('hdot0'), d1 = document.getElementById('hdot1');
    if (!s1 || !s2) return;
    heroIdx = n;
    s1.style.display = n === 0 ? 'block' : 'none';
    s2.style.display = n === 1 ? 'block' : 'none';
    if (d0 && d1) {
        d0.classList.toggle('active', n === 0);
        d1.classList.toggle('active', n === 1);
    }
}

// 4. מאזיני אירועים (EventListeners) - זה מה שמאפשר להסיר את ה-onclick מה-HTML
document.addEventListener('DOMContentLoaded', function() {
    
    // סגירת מודל
    if (mCl) mCl.addEventListener('click', closeModal);
    if (mOv) mOv.addEventListener('click', function (e) { if (e.target === mOv) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

    // פתיחת מודלים מכרטיסיות שירותים
    document.querySelectorAll('[data-service]').forEach(function (card) {
        card.addEventListener('click', function () { openModal(this.getAttribute('data-service')); });
    });

    // כפתורי הניקוד (Dots) של הסליידר - השורה שחיפשת!
    const dot0 = document.getElementById('hdot0');
    const dot1 = document.getElementById('hdot1');
    
    if (dot0) {
        dot0.addEventListener('click', function() {
            heroSlide(0);
            pauseHero(); // עוצר את הטיימר כדי שלא יקפוץ מיד
        });
    }
    
    if (dot1) {
        dot1.addEventListener('click', function() {
            heroSlide(1);
            pauseHero();
        });
    }

    // עצירת הסליידר במעבר עכבר
    const heroArea = document.querySelector('.hero-content');
    if (heroArea) {
        heroArea.addEventListener('mouseenter', pauseHero);
        heroArea.addEventListener('mouseleave', resumeHero);
    }
});
