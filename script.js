document.addEventListener('DOMContentLoaded', function() {
    // --- SÉLECTION DES ÉLÉMENTS DU DOM ---
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenuContainer = document.querySelector('.nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const sections = document.querySelectorAll('section[id]');
    
    // --- PRÉCHARGEUR (PRELOADER) ---
    body.classList.add('loading');
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        body.classList.remove('loading');
        
        // S'assure que les animations visibles au chargement se déclenchent
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('is-visible');
            }
        });
    });

    // --- ANIMATION DE TEXTE (TYPED.JS) ---
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['Digitales.', 'Web.', 'Mobiles.'],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2500,
            loop: true
        });
    }

    // --- NAVBAR INTELLIGENTE ---
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Fait apparaître/disparaître la navbar au scroll
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        if (lastScrollY < currentScrollY && currentScrollY > 100) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = currentScrollY;
    });

    // --- MENU HAMBURGER (MOBILE) ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenuContainer.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('no-scroll')) {
                hamburger.classList.remove('active');
                navMenuContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // --- MISE EN SURBRILLANCE DU LIEN ACTIF ---
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });
    sections.forEach(section => sectionObserver.observe(section));

    // --- ANIMATIONS AU DÉFILEMENT (INTERSECTION OBSERVER) ---
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optionnel: ne l'anime qu'une fois
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => scrollObserver.observe(el));
    
    // --- ANIMATION DES BARRES DE COMPÉTENCES ---
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-bar');
                    skillBars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        bar.style.width = level;
                    });
                    observer.unobserve(entry.target); // L'animation ne se joue qu'une fois
                }
            });
        }, { threshold: 0.3 });
        skillsObserver.observe(skillsSection);
    }
});
