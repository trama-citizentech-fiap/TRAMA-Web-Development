/* TRAMA — slideshow independente, feito com JavaScript puro e DOM. */
(() => {
  'use strict';
  const region = document.getElementById('trama-slideshow');
  if (!region) return;

  const slides = [
    {
      src: 'assets/img/cultura-periferica.svg',
      alt: 'Ilustração de palco cultural de bairro com música, arte urbana e moradores',
      kicker: '01 / CULTURA LOCAL',
      title: 'A criatividade já ocupa o território.',
      description: 'A cena cultural de bairro inspira a proposta de levar novas oportunidades a artistas independentes.',
      tone: 'coral'
    },
    {
      src: 'assets/img/conexao-artistica.svg',
      alt: 'Ilustração de artista, cartazes criativos e conexões entre pessoas',
      kicker: '02 / CONEXÕES',
      title: 'Oportunidades começam com encontros.',
      description: 'O TRAMA aproxima criadores, espaços culturais e instituições que podem colaborar em novos projetos.',
      tone: 'blue'
    },
    {
      src: 'assets/img/perfil-artista.svg',
      alt: 'Ilustração de artista com ferramentas criativas',
      kicker: '03 / VISIBILIDADE',
      title: 'Cada artista merece ser descoberto.',
      description: 'Portfólios e publicações dão destaque a diferentes trajetórias, ideias e expressões artísticas.',
      tone: 'gold'
    }
  ];
  const image = document.getElementById('slide-image');
  const media = document.getElementById('slide-media');
  const kicker = document.getElementById('slide-kicker');
  const title = document.getElementById('slide-title');
  const description = document.getElementById('slide-description');
  const count = document.getElementById('slide-count');
  const dots = [...region.querySelectorAll('[data-slide]')];
  let current = 0;
  const toggleButton = document.getElementById('slide-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = reducedMotion.matches;
  let hovered = false;
  let focusWithin = false;
  const liveText = region.querySelector('.showcase-text');

  function showSlide(index, automatic = false) {
    liveText.setAttribute('aria-live', automatic ? 'off' : 'polite');
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    image.src = slide.src;
    image.alt = slide.alt;
    kicker.textContent = slide.kicker;
    title.textContent = slide.title;
    description.textContent = slide.description;
    count.textContent = `${String(current + 1).padStart(2, '0')} — ${String(slides.length).padStart(2, '0')}`;
    media.dataset.tone = slide.tone;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-pressed', String(i === current));
    });
  }

  document.getElementById('slide-prev').addEventListener('click', () => showSlide(current - 1));
  document.getElementById('slide-next').addEventListener('click', () => showSlide(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.slide))));
  function renderPauseState() {
    toggleButton.textContent = userPaused ? 'Retomar troca automática ▶' : 'Pausar troca automática Ⅱ';
    toggleButton.setAttribute('aria-pressed', String(userPaused));
  }
  toggleButton.addEventListener('click', () => {
    userPaused = !userPaused;
    renderPauseState();
  });
  region.addEventListener('mouseenter', () => { hovered = true; });
  region.addEventListener('mouseleave', () => { hovered = false; });
  region.addEventListener('focusin', () => { focusWithin = true; });
  region.addEventListener('focusout', event => {
    if (!region.contains(event.relatedTarget)) focusWithin = false;
  });
  window.setInterval(() => {
    if (!userPaused && !hovered && !focusWithin && !document.hidden && !reducedMotion.matches) {
      showSlide(current + 1, true);
    }
  }, 6500);
  renderPauseState();
  region.addEventListener('keydown', event => {
    if (event.target.matches('input, select, textarea')) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(current + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(current - 1);
    }
  });
})();
