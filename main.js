// Shared: scroll progress bar at the top of the page (used on the projects page).
const scrollBar = document.getElementById('scroll-progress');
if (scrollBar) {
  const update = () => {
    const pageHeight = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    scrollBar.style.width = (window.scrollY / pageHeight) * 100 + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
