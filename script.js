document.addEventListener('DOMContentLoaded', function() {
    // --- SÉLECTIONS DOM ---
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenuContainer = document.querySelector('.nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const sections = document.querySelectorAll('section[id]');

    // --- GESTION DU PRÉCHARGEUR (PRELOADER) ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('fade-out');
            body.classList.remove('loading');
        });
    }

    // --- ANIMATIONS VISIBLES AU CHARGEMENT ---
    function triggerInitialAnimations() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('is-visible');
            }
        });
    }
    triggerInitialAnimations();

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
    if (hamburger && navMenuContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenuContainer.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

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
                observer.unobserve(entry.target);
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
                        setTimeout(() => {
                            const level = bar.getAttribute('data-level');
                            bar.style.width = level;
                        }, 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        skillsObserver.observe(skillsSection);
    }

    // --- LOGIQUE D'ANIMATION POUR LA TIMELINE V3 ---
    const timelinePath = document.querySelector('#timeline-path');
    const timelineSection = document.querySelector('.timeline-v3');

    if (timelinePath && timelineSection) {
        const pathLength = timelinePath.getTotalLength();

        timelinePath.style.strokeDasharray = pathLength;
        timelinePath.style.strokeDashoffset = pathLength;

        const animateTimeline = () => {
            const rect = timelineSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const startPoint = rect.top - windowHeight * 0.8;
            const endPoint = rect.bottom - windowHeight * 0.2;
            const scrollableHeight = endPoint - startPoint;
            
            let progress = -startPoint / scrollableHeight;
            progress = Math.max(0, Math.min(1, progress));

            const drawLength = pathLength * progress;
            timelinePath.style.strokeDashoffset = pathLength - drawLength;
        };

        window.addEventListener('scroll', animateTimeline);
        animateTimeline();
    }
});
