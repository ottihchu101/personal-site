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
