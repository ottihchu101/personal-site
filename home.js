const first = 'CHUKWUDI', last = 'OTTIH';
const typed = document.getElementById('typed'), lastEl = document.getElementById('last');
lastEl.innerHTML = [...last].map((c, i) => `<span aria-hidden="true" style="transition-delay:${i * 70}ms">${c}</span>`).join('');
const reveal = () => {
typed.classList.add('done');
lastEl.classList.add('show');
setTimeout(() => ['tagline', 'rule', 'ap'].forEach(id => document.getElementById(id).classList.add('show')), 350);
};
if (matchMedia('(prefers-reduced-motion: reduce)').matches) { typed.textContent = first; reveal(); }
else {
let i = 0;
const type = () => { if (i < first.length) { typed.textContent += first[i++]; setTimeout(type, 110 + Math.random() * 60); } else setTimeout(reveal, 250); };
setTimeout(type, 500);
}
