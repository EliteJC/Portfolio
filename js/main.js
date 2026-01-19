document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById('sticky-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const bttButton = document.getElementById('backToTop');
  const stickyPoint = nav.offsetTop - 20;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= stickyPoint) {
      nav.classList.add('stuck');
    } else {
      nav.classList.remove('stuck');
    }

    if (window.scrollY > 600) {
      bttButton.classList.add('show');
    } else {
      bttButton.classList.remove('show');
    }
  });

  bttButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "-20% 0px -50% 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          
          // Logic: Both programming and ui-art sections highlight the "Projects" link
          if ((id === 'programming' || id === 'ui-art') && link.getAttribute('href') === '#programming') {
            link.classList.add('active');
          }
          if (id === 'about' && link.getAttribute('href') === '#about') {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
});