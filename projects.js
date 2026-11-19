// Projects page: staggered scroll reveal, filter pill, cursor-follow screenshot preview.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const rows = [...document.querySelectorAll('.row')];

// Staggered scroll reveal (rows stay visible once revealed)
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

rows.forEach((row, i) => {
  row.style.transitionDelay = `${i * 80}ms`;
  // clear the stagger once revealed so hover dimming isn't delayed
  row.addEventListener('transitionend', () => { row.style.transitionDelay = ''; }, { once: true });
  revealObserver.observe(row);
});

// Filter with sliding pill
const filters = document.getElementById('filters');
if (filters) {
  const pill = filters.querySelector('.pill');
  const movePill = btn => {
    pill.style.left = `${btn.offsetLeft}px`;
    pill.style.width = `${btn.offsetWidth}px`;
  };
  const current = () => filters.querySelector('button.on');

  filters.querySelectorAll('button').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('on'));
    btn.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach(b => {
        b.classList.toggle('on', b === btn);
        b.setAttribute('aria-pressed', b === btn);
      });
      movePill(btn);
      // rows and their section labels share data-type
      document.querySelectorAll('#list [data-type]').forEach(el => {
        el.classList.toggle('hide', btn.dataset.f !== 'all' && el.dataset.type !== btn.dataset.f);
      });
    });
  });

  // place the pill once fonts have loaded (button widths depend on them)
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => movePill(current()));
  window.addEventListener('resize', () => movePill(current()));
}

// Cursor-follow preview, only for rows that have a screenshot (any device with a mouse/trackpad)
const preview = document.getElementById('preview');
if (preview && window.matchMedia('(hover: hover)').matches) {
  const img = preview.querySelector('img');
  let targetX = 0, targetY = 0, x = 0, y = 0, running = false;

  const loop = () => {
    const ease = reduceMotion ? 1 : 0.12;
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    preview.style.left = `${x}px`;
    preview.style.top = `${y}px`;
    if (running) requestAnimationFrame(loop);
  };

  window.addEventListener('mousemove', e => {
    // sit to the right of the cursor, flipping left near the window edge
    const half = preview.offsetWidth / 2;
    const gap = half + 60;
    const offset = e.clientX + gap + half > window.innerWidth ? -gap : gap;
    const halfH = preview.offsetHeight / 2;
    // keep the whole preview inside the window
    targetX = Math.min(Math.max(e.clientX + offset, half + 8), window.innerWidth - half - 8);
    targetY = Math.min(Math.max(e.clientY, halfH + 8), window.innerHeight - halfH - 8);
  });

  rows.filter(row => row.dataset.img).forEach(row => {
    row.addEventListener('mouseenter', () => {
      img.src = row.dataset.img;
      x = targetX; y = targetY;
      preview.classList.add('show');
      if (!running) { running = true; loop(); }
    });
    row.addEventListener('mouseleave', () => {
      preview.classList.remove('show');
      running = false;
    });
  });
}
