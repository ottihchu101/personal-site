const first = 'CHUKWUDI', last = 'OTTIH';
const typed = document.getElementById('typed'), lastEl = document.getElementById('last');
lastEl.innerHTML = [...last].map((c, i) => `<span class="ch" aria-hidden="true" style="transition-delay:${i * 70}ms">${c}</span>`).join('');
const reveal = () => {
typed.classList.add('done');
// split the typed name into letters so each can lift on hover
typed.setAttribute('aria-label', first);
typed.innerHTML = [...first].map(c => `<span class="ch" aria-hidden="true">${c}</span>`).join('');
// once OTTIH has revealed, drop the stagger so hover feels instant
setTimeout(() => lastEl.querySelectorAll('.ch').forEach(c => c.style.transitionDelay = ''), 1200);
lastEl.classList.add('show');
setTimeout(() => ['tagline', 'rule', 'ap'].forEach(id => document.getElementById(id).classList.add('show')), 350);
};
if (matchMedia('(prefers-reduced-motion: reduce)').matches) { typed.textContent = first; reveal(); }
else {
let i = 0;
const type = () => { if (i < first.length) { typed.textContent += first[i++]; setTimeout(type, 110 + Math.random() * 60); } else setTimeout(reveal, 250); };
setTimeout(type, 500);
}

// ---- extra motion ----
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (matchMedia('(hover: hover)').matches && !reduce) {
    // dot grid follows the cursor
    addEventListener('mousemove', e => {
        document.body.style.setProperty('--mx', e.clientX + 'px');
        document.body.style.setProperty('--my', e.clientY + 'px');
    });
    // buttons pull slightly toward the cursor
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            btn.classList.add('magnet');
            btn.style.translate = `${(e.clientX - r.left - r.width / 2) * .2}px ${(e.clientY - r.top - r.height / 2) * .3}px`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.translate = ''; });
    });
}
