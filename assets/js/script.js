/* TRAMA — interações da landing page independente.
   Somente navegação, acessibilidade e alternância informativa de público-alvo. */
(() => {
  'use strict';

  const menuButton = document.getElementById('menu-toggle');
  const backdrop = document.getElementById('menu-backdrop');
  const sidebar = document.getElementById('sidebar');
  const navLinks = [...document.querySelectorAll('[data-nav]')];

  const setMenuOpen = (open) => {
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    backdrop.hidden = !open;
    if (open) sidebar.querySelector('.nav-item')?.focus();
  };

  menuButton.addEventListener('click', () => {
    setMenuOpen(!document.body.classList.contains('menu-open'));
  });
  backdrop.addEventListener('click', () => setMenuOpen(false));
  navLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && document.body.classList.contains('menu-open')) setMenuOpen(false);
  });

  const setCurrentNav = id => {
    navLinks.forEach(link => {
      const isActive = link.dataset.nav === id;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const landmarks = [document.getElementById('inicio'), ...document.querySelectorAll('.content-section')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      visible.sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      setCurrentNav(visible[0].target.id);
    }, {rootMargin:'-95px 0px -55% 0px', threshold:[0,.08,.2,.4,.6]});
    landmarks.forEach(el => observer.observe(el));
  }

  const tabs = [...document.querySelectorAll('.audience-tab')];
  const panel = document.getElementById('audience-panel');
  const content = {
    artista: {
      label: 'PARA QUEM CRIA',
      title: 'Seu trabalho merece chegar mais longe.',
      description: 'Portfólio, feed, projetos e contatos em um só espaço.',
      pill: 'Beneficiário principal',
      image: 'assets/img/perfil-artista.svg',
      alt: 'Ilustração de artista com ferramentas criativas'
    },
    instituicao: {
      label: 'PARA QUEM ABRE PORTAS',
      title: 'Descubra novos talentos e projetos.',
      description: 'Publique oportunidades, conheça portfólios e converse com criadores.',
      pill: 'Parceiro do ecossistema',
      image: 'assets/img/perfil-instituicao.svg',
      alt: 'Ilustração de centro cultural com obras e exposição'
    },
    apoiador: {
      label: 'PARA QUEM ACREDITA',
      title: 'Uma boa ideia cresce em rede.',
      description: 'Acompanhe artistas e demonstre interesse por projetos criativos.',
      pill: 'Apoio demonstrativo',
      image: 'assets/img/perfil-apoiador.svg',
      alt: 'Ilustração de mãos apoiando um coração e formas criativas'
    }
  };

  const activateTab = (button, moveFocus = false) => {
    const role = button.dataset.role;
    const data = content[role];
    if (!data) return;
    tabs.forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panel.dataset.role = role;
    panel.setAttribute('aria-labelledby', button.id);
    document.getElementById('audience-label').textContent = data.label;
    document.getElementById('audience-title').textContent = data.title;
    document.getElementById('audience-description').textContent = data.description;
    document.getElementById('audience-pill').textContent = data.pill;
    const image = document.getElementById('audience-image');
    image.src = data.image;
    image.alt = data.alt;
    if (moveFocus) button.focus();
  };
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (['ArrowRight','ArrowDown'].includes(event.key)) next=(index+1)%tabs.length;
      else if (['ArrowLeft','ArrowUp'].includes(event.key)) next=(index-1+tabs.length)%tabs.length;
      else if (event.key==='Home') next=0;
      else next=tabs.length-1;
      activateTab(tabs[next], true);
    });
  });
})();
