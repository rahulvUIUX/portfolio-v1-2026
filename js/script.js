const projectCards = [...document.querySelectorAll('.proj')];
const viewAllButton = document.querySelector('#viewAllProjects');
const initialProjectCount = 4;
let visibleProjectCount = initialProjectCount;

function setupScrollReveals() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('in');
        entry.target.querySelectorAll('.n').forEach(number => {
          const target = Number(number.dataset.t);
          let current = 0;
          const timer = setInterval(() => {
            current += 1;
            number.textContent = current;
            if (current >= target) clearInterval(timer);
          }, 900 / target);
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.rv').forEach(element => observer.observe(element));
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero .rv').forEach(element => element.classList.add('in'));
    });
  });
}

function updateProjects() {
  const activeTab = document.querySelector('.tab.on');
  const filter = activeTab ? activeTab.dataset.f : 'all';
  const filteredProjects = projectCards.filter(project => (
    filter === 'all' || project.dataset.c.split(' ').includes(filter)
  ));
  const visibleProjects = new Set(filteredProjects.slice(0, visibleProjectCount));
  projectCards.forEach(project => {
    project.hidden = !visibleProjects.has(project);
  });
}

function setupProjectFilters() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(item => item.classList.remove('on'));
      tab.classList.add('on');
      visibleProjectCount = initialProjectCount;
      updateProjects();
    });
  });

  viewAllButton.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab.on');
    const filter = activeTab ? activeTab.dataset.f : 'all';
    visibleProjectCount = projectCards.filter(project => (
      filter === 'all' || project.dataset.c.split(' ').includes(filter)
    )).length;
    updateProjects();
  });

  updateProjects();
}

function setupActiveNavigation() {
  const sections = [...document.querySelectorAll('#top, #work, #process, #about')];
  const links = [...document.querySelectorAll('.links a')];

  addEventListener('scroll', () => {
    let activeIndex = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top < 140) activeIndex = index;
    });
    links.forEach((link, index) => link.classList.toggle('on', index === activeIndex));
  }, { passive: true });
}

function setupThemeToggle() {
  const themeToggle = document.querySelector('#themeToggle');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');

  function syncThemeToggle() {
    const isDark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === 'dark'
      : systemTheme.matches;
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    themeToggle.title = `Switch to ${isDark ? 'light' : 'dark'} theme`;
  }

  syncThemeToggle();
  themeToggle.addEventListener('click', () => {
    const nextTheme = (
      document.documentElement.dataset.theme === 'dark'
      || (!document.documentElement.dataset.theme && systemTheme.matches)
    ) ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    syncThemeToggle();
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (error) {
      console.warn('Unable to save the theme preference.', error);
    }
  });

  systemTheme.addEventListener('change', () => {
    if (!document.documentElement.dataset.theme) syncThemeToggle();
  });
}

function setupMobileNavigation() {
  const menuToggle = document.querySelector('#menuToggle');
  const primaryLinks = document.querySelector('#primaryLinks');

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    primaryLinks.classList.remove('is-open');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    primaryLinks.classList.toggle('is-open', !isOpen);
  });

  primaryLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || menuToggle.getAttribute('aria-expanded') !== 'true') return;
    closeMenu();
    menuToggle.focus();
  });
}

setupScrollReveals();
setupProjectFilters();
setupActiveNavigation();
setupThemeToggle();
setupMobileNavigation();
