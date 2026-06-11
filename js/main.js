// ===== Navbar: transparente no topo, sólida ao rolar =====
const navbar = document.getElementById('navbar');
function onScroll() {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Fecha o menu mobile ao clicar num link =====
document.querySelectorAll('#nav .nav-link').forEach(function (a) {
  a.addEventListener('click', function () {
    const col = document.getElementById('nav');
    if (col.classList.contains('show')) {
      const bs = bootstrap.Collapse.getInstance(col) || new bootstrap.Collapse(col, { toggle: false });
      bs.hide();
    }
  });
});

// ===== Animações de scroll (IntersectionObserver) =====
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up').forEach(function (el, i) {
  el.style.transitionDelay = (i % 4 * 0.08) + 's';
  io.observe(el);
});

// ===== Abas de serviços =====
const tabs = document.querySelectorAll('.serv-tab');
const panels = document.querySelectorAll('.serv-panel');
tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    const idx = +tab.dataset.serv;
    tabs.forEach(function (t) { t.classList.remove('active'); });
    panels.forEach(function (p) { p.classList.remove('active'); });
    tab.classList.add('active');
    if (panels[idx]) panels[idx].classList.add('active');
  });
});

// ===== Carrossel de produtos (Swiper) =====
new Swiper('.produtos-swiper', {
  loop: true,
  spaceBetween: 22,
  autoplay: { delay: 3000, disableOnInteraction: false },
  pagination: { el: '.produtos-swiper .swiper-pagination', clickable: true },
  navigation: { nextEl: '.produtos-swiper .swiper-button-next', prevEl: '.produtos-swiper .swiper-button-prev' },
  breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }
});

// ===== Formulário de orçamento -> WhatsApp =====
const WHATS = '5534999108340'; // WhatsApp (34) 99910-8340
const form = document.getElementById('orcForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const v = function (id) { return (document.getElementById(id).value || '').trim(); };
    const nome = v('o-nome'), tel = v('o-tel'), servico = v('o-servico');
    if (!nome || !tel || !servico) { alert('Preencha nome, telefone e o que você precisa.'); return; }
    const linhas = [
      '*Orçamento pelo site — Posto de Molas São Cristóvão*',
      '',
      'Nome: ' + nome,
      'Telefone: ' + tel,
      'Cidade: ' + (v('o-cidade') || '-'),
      'Veículo: ' + (v('o-veiculo') || '-'),
      'Serviço: ' + servico,
      'Detalhes: ' + (v('o-msg') || '-')
    ];
    const url = 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent(linhas.join('\n'));
    window.open(url, '_blank');
  });
}

// ===== Ano automático no rodapé (se houver) =====
(function () {
  const y = new Date().getFullYear();
  document.querySelectorAll('.js-ano').forEach(function (el) { el.textContent = y; });
})();
