document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('sticky-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const bttButton = document.getElementById('backToTop');
    const skillsSection = document.querySelector('.about-skills');

    // --- 1. NAVIGATION & STICKY LOGIC ---
    const stickyPoint = nav ? nav.offsetTop + 350 : 0;

    window.addEventListener('scroll', () => {
        if (nav && window.scrollY >= stickyPoint) {
            nav.classList.add('stuck');
        } else if (nav) {
            nav.classList.remove('stuck');
        }

        if (bttButton) {
            if (window.scrollY > 600) {
                bttButton.classList.add('show');
            } else {
                bttButton.classList.remove('show');
            }
        }

        // Reset highlights when at the very top
        if (window.scrollY < 300) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    });

    // --- 2. SMOOTH SCROLL + MANUAL HIGHLIGHT (Fixes the Click Issue) ---
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Manual Highlight Fix: Force the clicked link to be active
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    if (bttButton) {
        bttButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navLinks.forEach(link => link.classList.remove('active'));
        });
    }

    // --- 3. SECTION HIGHLIGHTING (Intersection Observer) ---
    const navObserverOptions = {
        threshold: 0.1, // Lower threshold to catch sections easier
        rootMargin: "-10% 0px -20% 0px" // Larger window for better detection
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Only update via scroll if the user isn't at the top
            if (entry.isIntersecting && window.scrollY > 300) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.classList.remove('active');

                    if ((id === 'programming' || id === 'ui-art') && href === '#programming') {
                        link.classList.add('active');
                    }
                    if (id === 'about' && href === '#about') {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    document.querySelectorAll('section[id]').forEach(section => navObserver.observe(section));

    // --- 4. SKILL RINGS ANIMATION ---
    const animateRings = () => {
        document.querySelectorAll('.skill-ring-container').forEach(container => {
            const percent = container.getAttribute('data-percent');
            const circle = container.querySelector('.ring-fill');
            if (circle) {
                const circumference = 2 * Math.PI * 45;
                const offset = circumference - (percent / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }
        });
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateRings();
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    if (skillsSection) skillObserver.observe(skillsSection);
});