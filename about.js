// reveal sections, timeline items and the divider once they scroll into view
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .2 });
document.querySelectorAll('[data-observe]').forEach(el => io.observe(el));
document.querySelectorAll('.cells .cell').forEach((c, i) => c.style.transitionDelay = (i * 50) + 'ms');

// timeline line draws as you scroll; progress bar at the top
const tracks = [...document.querySelectorAll('.timeline')];
const bar = document.getElementById('scroll-progress');
const onScroll = () => {
bar.style.width = (scrollY / Math.max(document.body.scrollHeight - innerHeight, 1) * 100) + '%';
tracks.forEach(t => {
    const r = t.getBoundingClientRect();
    const p = Math.min(Math.max((innerHeight * .75 - r.top) / r.height, 0), 1);
    t.querySelector('.track span').style.transform = `scaleY(${p})`;
});
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- extra motion ----
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover)').matches;

// photo tilts toward the cursor, with a light sheen following it
const pic = document.getElementById('pic');
if (pic && fine && !reduce) {
    const ring = pic.querySelector('.ring');
    pic.addEventListener('mousemove', e => {
        const r = pic.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        ring.style.setProperty('--ry', `${(x - .5) * 16}deg`);
        ring.style.setProperty('--rx', `${(.5 - y) * 16}deg`);
        ring.style.setProperty('--gx', `${x * 100}%`);
        ring.style.setProperty('--gy', `${y * 100}%`);
    });
    pic.addEventListener('mouseleave', () => { ring.style.setProperty('--rx', '0deg'); ring.style.setProperty('--ry', '0deg'); });
}

// photo drifts slightly slower than the page while scrolling
const headshot = document.getElementById('headshot');
if (headshot && !reduce) {
    addEventListener('scroll', () => {
        if (scrollY < innerHeight) headshot.style.transform = `translateY(${scrollY * .12}px)`;
    }, { passive: true });
}

// buttons pull slightly toward the cursor
if (fine && !reduce) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            btn.classList.add('magnet');
            btn.style.translate = `${(e.clientX - r.left - r.width / 2) * .2}px ${(e.clientY - r.top - r.height / 2) * .3}px`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.translate = ''; });
    });
}
