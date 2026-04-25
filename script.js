// ========================================
// Portfolio Website JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functions
    initTypingAnimation();
    initMobileMenu();
    initSmoothScroll();
    initSkillBars();
    initPortfolioFilter();
    initScrollToTop();
    initNavbarHighlight();
    initFormValidation();
    initRevealAnimations();
});

// ========================================
// Typing Animation
// ========================================
function initTypingAnimation() {
    const textElement = document.getElementById('typing-text');
    const phrases = ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Problem Solver'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('nav a');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');

        // Toggle icon
        const icon = menuToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function () {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Skill Bars Animation
// ========================================
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.setProperty('--progress', progress + '%');
                    bar.style.width = progress + '%';
                    bar.classList.add('animated');
                });
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// ========================================
// Portfolio Filter
// ========================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.add('bg-white', 'text-gray-700');
                b.classList.remove('bg-cyan-500', 'text-white');
            });

            // Add active class to clicked button
            this.classList.add('active');
            this.classList.remove('bg-white', 'text-gray-700');
            this.classList.add('bg-cyan-500', 'text-white');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                    // Add animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ========================================
// Scroll to Top Button
// ========================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
            scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollBtn.classList.remove('visible');
            scrollBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Navbar Highlight on Scroll
// ========================================
function initNavbarHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// Form Validation
// ========================================
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const statusBox = document.getElementById('formMessage');
    const inputs = form.querySelectorAll('input, textarea');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showFormMessage(type, message) {
        if (!statusBox) return;

        statusBox.textContent = message;
        statusBox.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');

        if (type === 'success') {
            statusBox.classList.add('bg-green-100', 'text-green-700');
        } else {
            statusBox.classList.add('bg-red-100', 'text-red-700');
        }
    }

    function validateField(input) {
        const value = input.value.trim();
        let isValid = value.length > 0;

        if (isValid && input.type === 'email') {
            isValid = emailRegex.test(value);
        }

        input.style.borderColor = isValid ? 'transparent' : '#ef4444';
        return isValid;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showFormMessage('error', 'Please fill all fields correctly before sending.');
            return;
        }

        const formData = new FormData(form);
        const toEmail = form.getAttribute('data-contact-email') || 'alpanalilhare114@gmail.com';
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const subject = String(formData.get('subject') || '').trim() || 'Portfolio Inquiry';
        const message = String(formData.get('message') || '').trim();
        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            '',
            'Message:',
            message
        ].join('\n');

        showFormMessage('success', 'Thanks! Opening your email app now.');
        window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        form.reset();
    });

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            validateField(this);
            if (statusBox) {
                statusBox.classList.add('hidden');
            }
        });
    });
}

// ========================================
// Reveal Animations on Scroll
// ========================================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.timeline-item, .project-card, .service-card, .testimonial-card');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// ========================================
// Additional Features
// ========================================

// Add parallax effect to hero
window.addEventListener('scroll', function () {
    const hero = document.querySelector('#home');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add counter animation for stats (if needed in future)
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message
console.log('%c Portfolio Website ', 'background: #06b6d4; color: white; padding: 10px; font-size: 20px;');
console.log('%c Created with ❤️ ', 'color: #06b6d4; font-size: 14px;');
