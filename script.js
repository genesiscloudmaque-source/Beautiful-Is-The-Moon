/* ════════════════════════════════════════════
   CINEMATIC INTRO
   ════════════════════════════════════════════ */
const introEl = document.getElementById('cinematic-intro');
const introLines = [
    { el: document.getElementById('intro1'), delay: 500 },
    { el: document.getElementById('intro2'), delay: 1800 },
    { el: document.getElementById('intro3'), delay: 3500 },
    { el: document.getElementById('intro4'), delay: 4800 },
    { el: document.getElementById('intro5'), delay: 6500 },
    { el: document.getElementById('intro6'), delay: 7800 },
    { el: document.getElementById('intro7'), delay: 9500 },
];
let introTimeout;

function playIntro() {
    introLines.forEach(({ el, delay }) => {
        setTimeout(() => el.classList.add('show'), delay);
    });
    introTimeout = setTimeout(() => {
        introEl.classList.add('fade-out');
        setTimeout(() => { introEl.style.display = 'none'; animateHero(); }, 2000);
    }, 12500);
}

function skipIntro() {
    clearTimeout(introTimeout);
    introLines.forEach(({ el }) => { el.classList.remove('show'); });
    introEl.classList.add('fade-out');
    setTimeout(() => { introEl.style.display = 'none'; animateHero(); }, 800);
}

document.getElementById('skipIntro').addEventListener('click', skipIntro);
playIntro();

/* ════════════════════════════════════════════
   HERO ANIMATION
   ════════════════════════════════════════════ */
function animateHero() {
    const items = document.querySelectorAll('.hero-items > *');
    items.forEach((el, i) => {
        setTimeout(() => {
            el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 500 + 300);
    });
}

/* ════════════════════════════════════════════
   STARFIELD
   ════════════════════════════════════════════ */
const sC = document.getElementById('starfield');
const sX = sC.getContext('2d');
let stars = [];

function initStars() {
    sC.width = innerWidth; sC.height = innerHeight;
    stars = [];
    const n = Math.floor((sC.width * sC.height) / 2200);
    for (let i = 0; i < n; i++) {
        stars.push({
            x: Math.random() * sC.width, y: Math.random() * sC.height,
            s: Math.random() * 2 + 0.2, o: Math.random() * 0.85 + 0.15,
            ts: Math.random() * 0.02 + 0.004, to: Math.random() * Math.PI * 2,
            c: Math.random() > 0.88 ? `hsl(${215 + Math.random() * 40},55%,82%)` :
                Math.random() > 0.75 ? `hsl(${25 + Math.random() * 20},75%,88%)` : '#fff'
        });
    }
}

function drawStars(t) {
    sX.clearRect(0, 0, sC.width, sC.height);
    for (const s of stars) {
        const tw = Math.sin(t * s.ts + s.to) * 0.5 + 0.5;
        const a = s.o * tw;
        sX.globalAlpha = a;
        sX.beginPath();
        sX.arc(s.x, s.y, s.s, 0, Math.PI * 2);
        sX.fillStyle = s.c;
        sX.fill();
        if (s.s > 1.3) {
            const g = sX.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.s * 4);
            g.addColorStop(0, s.c);
            g.addColorStop(1, 'transparent');
            sX.globalAlpha = a * 0.12;
            sX.beginPath();
            sX.arc(s.x, s.y, s.s * 4, 0, Math.PI * 2);
            sX.fillStyle = g;
            sX.fill();
        }
    }
    sX.globalAlpha = 1;
}

/* ════════════════════════════════════════════
   SHOOTING STARS
   ════════════════════════════════════════════ */
const ssC = document.getElementById('shooting-stars');
const ssX = ssC.getContext('2d');
let shootingStars = [];

function initShootingStars() {
    ssC.width = innerWidth; ssC.height = innerHeight;
}

function spawnShootingStar() {
    if (Math.random() > 0.008) return;
    shootingStars.push({
        x: Math.random() * ssC.width * 0.8,
        y: Math.random() * ssC.height * 0.4,
        len: 60 + Math.random() * 100,
        speed: 8 + Math.random() * 12,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
        life: 1, decay: 0.015 + Math.random() * 0.01
    });
}

function drawShootingStars() {
    ssX.clearRect(0, 0, ssC.width, ssC.height);
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= s.decay;
        if (s.life <= 0) { shootingStars.splice(i, 1); continue; }
        const tx = s.x - Math.cos(s.angle) * s.len;
        const ty = s.y - Math.sin(s.angle) * s.len;
        const grad = ssX.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, `rgba(255,255,255,${s.life * 0.8})`);
        ssX.strokeStyle = grad;
        ssX.lineWidth = 1.5;
        ssX.beginPath();
        ssX.moveTo(tx, ty);
        ssX.lineTo(s.x, s.y);
        ssX.stroke();
        ssX.beginPath();
        ssX.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ssX.fillStyle = `rgba(255,255,255,${s.life})`;
        ssX.fill();
    }
}

/* ════════════════════════════════════════════
   FIREFLIES
   ════════════════════════════════════════════ */
const fC = document.getElementById('fireflies');
const fX = fC.getContext('2d');
let fireflies = [];

function initFireflies() {
    fC.width = innerWidth; fC.height = innerHeight;
    fireflies = [];
    const n = Math.floor(innerWidth / 55);
    for (let i = 0; i < n; i++) {
        fireflies.push({
            x: Math.random() * fC.width, y: Math.random() * fC.height,
            s: Math.random() * 2.5 + 1,
            sx: (Math.random() - 0.5) * 0.35, sy: (Math.random() - 0.5) * 0.25,
            gp: Math.random() * Math.PI * 2, gs: Math.random() * 0.015 + 0.006,
            h: Math.random() > 0.5 ? 45 : 340
        });
    }
}

function drawFireflies(t) {
    fX.clearRect(0, 0, fC.width, fC.height);
    for (const f of fireflies) {
        f.x += f.sx + Math.sin(t * 0.001 + f.gp) * 0.3;
        f.y += f.sy + Math.cos(t * 0.001 + f.gp) * 0.2;
        if (f.x < -10) f.x = fC.width + 10;
        if (f.x > fC.width + 10) f.x = -10;
        if (f.y < -10) f.y = fC.height + 10;
        if (f.y > fC.height + 10) f.y = -10;
        const gl = Math.sin(t * f.gs + f.gp) * 0.5 + 0.5;
        const a = gl * 0.55;
        const r = f.s * (0.8 + gl * 0.4);
        const g = fX.createRadialGradient(f.x, f.y, 0, f.x, f.y, r * 8);
        g.addColorStop(0, `hsla(${f.h},80%,75%,${a})`);
        g.addColorStop(0.3, `hsla(${f.h},70%,60%,${a * 0.35})`);
        g.addColorStop(1, 'transparent');
        fX.beginPath();
        fX.arc(f.x, f.y, r * 8, 0, Math.PI * 2);
        fX.fillStyle = g;
        fX.fill();
        fX.beginPath();
        fX.arc(f.x, f.y, r, 0, Math.PI * 2);
        fX.fillStyle = `hsla(${f.h},90%,85%,${a})`;
        fX.fill();
    }
}

/* ════════════════════════════════════════════
   SAKURA PETALS
   ════════════════════════════════════════════ */
const pC = document.getElementById('sakura-canvas');
const pX = pC.getContext('2d');
let petals = [];

function initSakura() {
    pC.width = innerWidth; pC.height = innerHeight;
    petals = [];
    const n = Math.floor(innerWidth / 45);
    for (let i = 0; i < n; i++) petals.push(mkPetal());
}

function mkPetal() {
    return {
        x: Math.random() * pC.width, y: -20 - Math.random() * pC.height,
        s: Math.random() * 8 + 4, sy: Math.random() * 0.7 + 0.25,
        sx: Math.random() * 0.5 - 0.25, r: Math.random() * 360,
        rs: (Math.random() - 0.5) * 2, o: Math.random() * 0.35 + 0.08,
        w: Math.random() * Math.PI * 2, ws: Math.random() * 0.025 + 0.008,
        c: ['#ffb7c5', '#ffd6e0', '#e88fa2', '#ffc8d6'][Math.floor(Math.random() * 4)]
    };
}

function drawSakura(t) {
    pX.clearRect(0, 0, pC.width, pC.height);
    for (const p of petals) {
        p.y += p.sy; p.x += p.sx + Math.sin(t * p.ws + p.w) * 0.5; p.r += p.rs;
        if (p.y > pC.height + 20) Object.assign(p, mkPetal(), { y: -20 });
        pX.save();
        pX.translate(p.x, p.y);
        pX.rotate(p.r * Math.PI / 180);
        pX.globalAlpha = p.o;
        pX.fillStyle = p.c;
        pX.beginPath();
        pX.moveTo(0, 0);
        pX.bezierCurveTo(p.s * 0.5, -p.s * 0.8, p.s, -p.s * 0.5, p.s * 0.5, p.s * 0.3);
        pX.bezierCurveTo(p.s * 0.2, p.s * 0.6, -p.s * 0.2, p.s * 0.6, -p.s * 0.5, p.s * 0.3);
        pX.bezierCurveTo(-p.s, -p.s * 0.5, -p.s * 0.5, -p.s * 0.8, 0, 0);
        pX.fill();
        pX.restore();
    }
}

/* ════════════════════════════════════════════
   SKY LANTERNS
   ════════════════════════════════════════════ */
const lC = document.getElementById('lanterns-canvas');
const lX = lC.getContext('2d');
let lanterns = [];

function initLanterns() {
    lC.width = innerWidth; lC.height = innerHeight;
}

function spawnLantern(text) {
    lanterns.push({
        x: innerWidth * 0.3 + Math.random() * innerWidth * 0.4,
        y: innerHeight + 30,
        targetY: -100,
        speed: 0.3 + Math.random() * 0.4,
        wobble: Math.random() * Math.PI * 2,
        size: 18 + Math.random() * 10,
        opacity: 0.9,
        text: text || '',
        glow: 0.4 + Math.random() * 0.3
    });
}

function drawLanterns(t) {
    lX.clearRect(0, 0, lC.width, lC.height);
    for (let i = lanterns.length - 1; i >= 0; i--) {
        const l = lanterns[i];
        l.y -= l.speed;
        l.x += Math.sin(t * 0.001 + l.wobble) * 0.3;
        if (l.y < l.targetY) { lanterns.splice(i, 1); continue; }
        const progress = 1 - (l.y / innerHeight);
        l.opacity = Math.max(0, 0.9 - progress * 0.5);
        // Glow
        const grd = lX.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.size * 3);
        grd.addColorStop(0, `rgba(255,200,87,${l.glow * l.opacity * 0.4})`);
        grd.addColorStop(0.5, `rgba(255,145,71,${l.glow * l.opacity * 0.15})`);
        grd.addColorStop(1, 'transparent');
        lX.fillStyle = grd;
        lX.fillRect(l.x - l.size * 3, l.y - l.size * 3, l.size * 6, l.size * 6);
        // Body
        lX.globalAlpha = l.opacity;
        lX.fillStyle = '#ff9147';
        lX.beginPath();
        lX.ellipse(l.x, l.y, l.size * 0.6, l.size * 0.8, 0, 0, Math.PI * 2);
        lX.fill();
        lX.fillStyle = '#ffc857';
        lX.beginPath();
        lX.ellipse(l.x, l.y, l.size * 0.35, l.size * 0.5, 0, 0, Math.PI * 2);
        lX.fill();
        lX.globalAlpha = 1;
    }
}

// Auto-spawn ambient lanterns
setInterval(() => { if (Math.random() > 0.6) spawnLantern(); }, 4000);

/* ════════════════════════════════════════════
   ANIMATION LOOP
   ════════════════════════════════════════════ */
function animate(t) {
    drawStars(t);
    spawnShootingStar();
    drawShootingStars();
    drawFireflies(t);
    drawSakura(t);
    drawLanterns(t);
    requestAnimationFrame(animate);
}
initStars(); initShootingStars(); initFireflies(); initSakura(); initLanterns();
requestAnimationFrame(animate);
addEventListener('resize', () => { initStars(); initShootingStars(); initFireflies(); initSakura(); initLanterns(); });

/* ════════════════════════════════════════════
   CURSOR GLOW & TRAIL
   ════════════════════════════════════════════ */
const cg = document.getElementById('cursorGlow');
const trailDots = [];
for (let i = 0; i < 8; i++) {
    const d = document.createElement('div');
    d.className = 'cursor-trail';
    document.body.appendChild(d);
    trailDots.push({ el: d, x: 0, y: 0 });
}
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cg.style.left = mx + 'px'; cg.style.top = my + 'px';
});
function updateTrail() {
    let px = mx, py = my;
    trailDots.forEach((d, i) => {
        d.x += (px - d.x) * (0.3 - i * 0.03);
        d.y += (py - d.y) * (0.3 - i * 0.03);
        d.el.style.left = d.x + 'px';
        d.el.style.top = d.y + 'px';
        d.el.style.opacity = (1 - i / trailDots.length) * 0.4;
        d.el.style.width = (4 - i * 0.3) + 'px';
        d.el.style.height = (4 - i * 0.3) + 'px';
        px = d.x; py = d.y;
    });
    requestAnimationFrame(updateTrail);
}
updateTrail();

/* ════════════════════════════════════════════
   CLICK PARTICLES
   ════════════════════════════════════════════ */
const emojis = ['🌸', '✨', '💖', '🌙', '⭐', '💫', '🩷', '🦋', '🌺', '💕'];
document.addEventListener('click', e => {
    const n = 8 + Math.floor(Math.random() * 5);
    for (let i = 0; i < n; i++) {
        const p = document.createElement('div');
        p.className = 'click-particle';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.5;
        const d = 50 + Math.random() * 100;
        p.style.setProperty('--tx', Math.cos(a) * d + 'px');
        p.style.setProperty('--ty', (Math.sin(a) * d - 40) + 'px');
        p.style.setProperty('--rot', (Math.random() * 360) + 'deg');
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1200);
    }
});

/* ════════════════════════════════════════════
   SCROLL ANIMATIONS
   ════════════════════════════════════════════ */
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .divider').forEach((el, i) => {
    el.style.transitionDelay = (i % 8) * 0.08 + 's';
    obs.observe(el);
});

/* ════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ════════════════════════════════════════════ */
const sp = document.getElementById('scrollProgress');
addEventListener('scroll', () => {
    const pct = scrollY / (document.body.scrollHeight - innerHeight) * 100;
    sp.style.width = pct + '%';
});

/* ════════════════════════════════════════════
   NAV HIDE/SHOW
   ════════════════════════════════════════════ */
let ls = 0;
const nav = document.getElementById('mainNav');
addEventListener('scroll', () => {
    if (scrollY > ls && scrollY > 100) nav.classList.add('nav-hidden');
    else nav.classList.remove('nav-hidden');
    ls = scrollY;
});

/* ════════════════════════════════════════════
   MOON PARALLAX
   ════════════════════════════════════════════ */
const mc = document.getElementById('moonContainer');
addEventListener('scroll', () => {
    const p = Math.min(scrollY / innerHeight, 1);
    mc.style.transform = `translateY(${p * 70}px) scale(${1 - p * 0.18})`;
    mc.style.opacity = 1 - p * 0.85;
});

/* ════════════════════════════════════════════
   RED STRING CANVAS
   ════════════════════════════════════════════ */
const rsC = document.getElementById('red-string-canvas');
const rsX = rsC.getContext('2d');

function drawRedString() {
    const rect = rsC.parentElement.getBoundingClientRect();
    rsC.width = rect.width;
    rsC.height = rect.height;
    rsX.clearRect(0, 0, rsC.width, rsC.height);
    const t = performance.now() * 0.001;
    rsX.strokeStyle = 'rgba(217, 79, 92, 0.12)';
    rsX.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        rsX.beginPath();
        const startX = Math.sin(t + i) * 50 + rsC.width * 0.1;
        const startY = Math.sin(t * 0.5 + i) * 30 + rsC.height * 0.2;
        rsX.moveTo(startX, startY);
        const cp1x = rsC.width * 0.3 + Math.sin(t * 0.7 + i) * 80;
        const cp1y = rsC.height * 0.5 + Math.cos(t * 0.6 + i) * 60;
        const cp2x = rsC.width * 0.7 + Math.sin(t * 0.8 + i) * 80;
        const cp2y = rsC.height * 0.4 + Math.cos(t * 0.9 + i) * 60;
        const endX = rsC.width * 0.9 + Math.sin(t + i) * 30;
        const endY = rsC.height * 0.8 + Math.cos(t * 0.5 + i) * 40;
        rsX.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        rsX.stroke();
    }
    requestAnimationFrame(drawRedString);
}
drawRedString();

/* ════════════════════════════════════════════
   HEART CLICK
   ════════════════════════════════════════════ */
const heart = document.getElementById('heartEmoji');
const hMsgs = ['好きだよ ♡', 'I love you 🌙', '愛してる ✨', 'Forever 🌸', '月が綺麗 🌕', 'My heart 💫', 'いつまでも ♡', 'Always 🩷', 'ずっと一緒 💕', '大好き 🦋'];
let hIdx = 0;
heart.addEventListener('click', e => {
    e.stopPropagation();
    const m = document.createElement('div');
    m.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY - 30}px;font-family:'Noto Serif JP',serif;font-size:1rem;color:#ffb7c5;pointer-events:none;z-index:9999;white-space:nowrap;text-shadow:0 0 12px rgba(255,183,197,0.5);animation:hMsg 2s ease forwards;`;
    m.textContent = hMsgs[hIdx++ % hMsgs.length];
    document.body.appendChild(m);
    setTimeout(() => m.remove(), 2000);
});

if (!document.getElementById('hMsgStyle')) {
    const s = document.createElement('style');
    s.id = 'hMsgStyle';
    s.textContent = '@keyframes hMsg{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-90px) scale(1.4)}}';
    document.head.appendChild(s);
}

/* ════════════════════════════════════════════
   WISHING LANTERN
   ════════════════════════════════════════════ */
const wishInput = document.getElementById('wishInput');
const wishBtn = document.getElementById('wishBtn');
const wishMsg = document.getElementById('wishMsg');

wishBtn.addEventListener('click', () => {
    const text = wishInput.value.trim();
    for (let i = 0; i < 3; i++) setTimeout(() => spawnLantern(text), i * 400);
    wishInput.value = '';
    wishMsg.classList.add('show');
    setTimeout(() => wishMsg.classList.remove('show'), 3000);
});

wishInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') wishBtn.click();
});

/* ════════════════════════════════════════════
   CONSTELLATION CANVAS
   ════════════════════════════════════════════ */
const ccC = document.getElementById('constellation-canvas');
const ccX = ccC.getContext('2d');
const cStars = [];

function resizeConstellation() {
    const rect = ccC.getBoundingClientRect();
    ccC.width = rect.width;
    ccC.height = rect.height;
}
resizeConstellation();
addEventListener('resize', resizeConstellation);

ccC.addEventListener('click', e => {
    const rect = ccC.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cStars.push({ x, y, size: 2 + Math.random() * 2, pulse: Math.random() * Math.PI * 2 });
});

function drawConstellation(t) {
    ccX.clearRect(0, 0, ccC.width, ccC.height);
    // Draw connections
    if (cStars.length > 1) {
        ccX.strokeStyle = 'rgba(255,183,197,0.2)';
        ccX.lineWidth = 0.5;
        for (let i = 0; i < cStars.length; i++) {
            for (let j = i + 1; j < cStars.length; j++) {
                const dx = cStars[i].x - cStars[j].x;
                const dy = cStars[i].y - cStars[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ccX.globalAlpha = 1 - dist / 150;
                    ccX.beginPath();
                    ccX.moveTo(cStars[i].x, cStars[i].y);
                    ccX.lineTo(cStars[j].x, cStars[j].y);
                    ccX.stroke();
                }
            }
        }
        ccX.globalAlpha = 1;
    }
    // Draw stars
    for (const s of cStars) {
        const pulse = Math.sin(t * 0.003 + s.pulse) * 0.3 + 0.7;
        ccX.beginPath();
        ccX.arc(s.x, s.y, s.size * pulse, 0, Math.PI * 2);
        ccX.fillStyle = `rgba(255,236,210,${pulse})`;
        ccX.fill();
        const g = ccX.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 5);
        g.addColorStop(0, `rgba(255,236,210,${pulse * 0.2})`);
        g.addColorStop(1, 'transparent');
        ccX.beginPath();
        ccX.arc(s.x, s.y, s.size * 5, 0, Math.PI * 2);
        ccX.fillStyle = g;
        ccX.fill();
    }
    requestAnimationFrame(drawConstellation);
}
requestAnimationFrame(drawConstellation);

/* ════════════════════════════════════════════
   FLOATING KANJI
   ════════════════════════════════════════════ */
const kanjiList = ['愛', '月', '夢', '心', '光', '星', '花', '風', '空', '恋', '永', '美', '幸', '想'];
function spawnFloatingKanji() {
    const k = document.createElement('div');
    k.className = 'floating-kanji';
    k.textContent = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    k.style.left = Math.random() * 100 + 'vw';
    k.style.top = Math.random() * 100 + 'vh';
    k.style.fontSize = (1.5 + Math.random() * 3) + 'rem';
    k.style.transition = `all ${20 + Math.random() * 30}s linear`;
    document.body.appendChild(k);
    requestAnimationFrame(() => {
        k.style.transform = `translateY(-${200 + Math.random() * 300}px) rotate(${(Math.random() - 0.5) * 40}deg)`;
        k.style.opacity = '0';
    });
    setTimeout(() => k.remove(), 50000);
}
setInterval(spawnFloatingKanji, 3000);
for (let i = 0; i < 6; i++) setTimeout(spawnFloatingKanji, i * 500);

/* ════════════════════════════════════════════
   AMBIENT AUDIO
   ════════════════════════════════════════════ */
let audioCtx = null, isPlaying = false;
const musicBtn = document.getElementById('musicToggle');

function createAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const master = audioCtx.createGain();
    master.gain.value = 0.06;
    master.connect(audioCtx.destination);
    const freqs = [130.81, 164.81, 196.00, 246.94, 329.63, 392.00];
    freqs.forEach((freq, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'sine';
        o.frequency.value = freq;
        g.gain.value = 0.12 - i * 0.015;
        const lfo = audioCtx.createOscillator();
        const lg = audioCtx.createGain();
        lfo.type = 'sine';
        lfo.frequency.value = 0.2 + Math.random() * 0.3;
        lg.gain.value = freq * 0.003;
        lfo.connect(lg); lg.connect(o.frequency); lfo.start();
        o.connect(g); g.connect(master); o.start();
    });
}

musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        if (!audioCtx) createAudio();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        musicBtn.classList.add('playing');
        isPlaying = true;
    } else {
        if (audioCtx) audioCtx.suspend();
        musicBtn.classList.remove('playing');
        isPlaying = false;
    }
});

/* ════════════════════════════════════════════
   MOON TILT ON MOUSE MOVE
   ════════════════════════════════════════════ */
const moonEl = document.getElementById('moonEl');
addEventListener('mousemove', e => {
    const cx = innerWidth / 2, cy = innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    moonEl.style.boxShadow = `
    ${dx * -15}px ${dy * -15}px 50px rgba(255,236,210,0.5),
    0 0 100px rgba(255,236,210,0.25),
    0 0 180px rgba(255,236,210,0.12),
    0 0 300px rgba(255,236,210,0.06),
    inset ${dx * -25}px ${dy * -12}px 50px rgba(180,140,90,0.25)
`;
});

console.log('%c🌙 月が綺麗ですね — The moon is beautiful, isn\'t it?', 'color:#ffb7c5;font-size:16px;font-family:serif;padding:10px;');
console.log('%c♡ Crafted with love, moonlight, and sakura petals', 'color:#b8a8c8;font-size:11px;');
