document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById('sticky-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const bttButton = document.getElementById('backToTop');
  
  // 1. Sticky Nav & Back to Top visibility
  const stickyPoint = nav.offsetTop - 20;

  window.addEventListener('scroll', () => {
    // Nav Sticky
    if (window.scrollY >= stickyPoint) {
      nav.classList.add('stuck');
    } else {
      nav.classList.remove('stuck');
    }

    // Back to Top button show/hide
    if (window.scrollY > 800) {
      bttButton.classList.add('show');
    } else {
      bttButton.classList.remove('show');
    }
  });

  // 2. Back to Top Click
  bttButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. Improved Section Highlighting
  const sections = document.querySelectorAll('header, section[id]');
  
  const observerOptions = {
    threshold: 0.2, // Section must be 20% visible
    rootMargin: "-10% 0px -40% 0px" 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          // Match link href to section ID
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});