document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Smooth Scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.querySelector('.form-success');
    const formFields = contactForm.querySelectorAll('.form-group');

    // Floating Labels
    formFields.forEach(field => {
        const input = field.querySelector('input, textarea');
        const label = field.querySelector('label');

        if (input.value.trim() !== '') label.classList.add('active');

        input.addEventListener('input', () => {
            label.classList.toggle('active', input.value.trim() !== '');
        });

        input.addEventListener('focus', () => label.classList.add('focus'));
        input.addEventListener('blur', () => label.classList.remove('focus'));
    });

    // Form Validation & Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        formFields.forEach(field => {
            const input = field.querySelector('input, textarea');
            const label = field.querySelector('label');
            
            if (input.value.trim() === '') {
                isValid = false;
                field.classList.add('error');
                label.style.color = '#ff6f61';
            } else if (input.type === 'email' && !emailRegex.test(input.value)) {
                isValid = false;
                field.classList.add('error');
                label.style.color = '#ff6f61';
            } else {
                field.classList.remove('error');
                label.style.color = '#666';
            }
        });

        if (isValid) {
            contactForm.style.opacity = '0.5';
            contactForm.style.pointerEvents = 'none';
            formSuccess.style.display = 'flex';
            
            setTimeout(() => {
                contactForm.reset();
                formFields.forEach(field => {
                    field.querySelector('label').classList.remove('active');
                });
                contactForm.style.opacity = '1';
                contactForm.style.pointerEvents = 'all';
                formSuccess.style.opacity = '0';
                setTimeout(() => formSuccess.style.display = 'none', 300);
            }, 3000);
        }
    });

    // Method Card Interactions
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.transform = `
                perspective(1000px)
                rotateX(${(e.clientY - rect.top - rect.height/2) / 15}deg)
                rotateY(${-(e.clientX - rect.left - rect.width/2) / 15}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // Hamburger Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });

    // Close Menu Functions
    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) closeMenu();
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('scroll', closeMenu);
});