document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Language Switcher Logic
    const htmlElement = document.documentElement;
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');

    function setLanguage(lang) {
        if (lang === 'es') {
            htmlElement.setAttribute('lang', 'es');
            btnEs.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            htmlElement.setAttribute('lang', 'en');
            btnEn.classList.add('active');
            btnEs.classList.remove('active');
        }
        localStorage.setItem('ginger_lang', lang);
    }

    // Check saved language
    const savedLang = localStorage.getItem('ginger_lang') || 'en';
    setLanguage(savedLang);

    // Event listeners for language buttons
    btnEn.addEventListener('click', () => setLanguage('en'));
    btnEs.addEventListener('click', () => setLanguage('es'));

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileMenuBtn.classList.toggle('open');
        });

        // Close mobile menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileMenuBtn.classList.remove('open');
            });
        });
    }

    // 4. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    // 5. B2B Lead Form Handler
    const leadForm = document.getElementById('lead-form');
    const toastMessage = document.getElementById('toast-message');
    const submitBtn = document.getElementById('btn-submit');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Store original button texts based on active language
            const isEn = htmlElement.getAttribute('lang') === 'en';
            const originalText = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = isEn ? 'Sending Request...' : 'Enviando Solicitud...';

            // Simulate server request
            setTimeout(() => {
                // Reset form
                leadForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Show success toast
                toastMessage.classList.add('show');

                // Hide success toast after 4 seconds
                setTimeout(() => {
                    toastMessage.classList.remove('show');
                }, 4000);

            }, 1500);
        });
    }
});
