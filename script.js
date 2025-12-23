// Pixel Art Portfolio Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect for Hero Section
    const textElement = document.getElementById('typing-text');
    const words = ["WEB DEVELOPER", "PYTHON DEVELOPER"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // Mouse Tracking Glow Effect for Minimal Cards
    const handleOnMouseMove = (e) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    }

    const cards = document.querySelectorAll(".minimal-card");
    cards.forEach(card => {
        card.onmousemove = e => handleOnMouseMove(e);
    });

    // Floating Particles Logic
    const particleContainer = document.getElementById('hero-particles');
    if (particleContainer) {
        const particleCount = 20; // Number of particles

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('pixel-particle');

            // Random properties
            const size = Math.random() * 4 + 2; // 2px to 6px
            const left = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 10 + 5; // 5s to 15s
            const delay = Math.random() * 5; // 0s to 5s

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.opacity = Math.random() * 0.5 + 0.1;

            particleContainer.appendChild(particle);
        }
    }
    // Initialize AOS
    AOS.init({
        once: true, // Whether animation should happen only once - while scrolling down
        offset: 50, // Offset (in px) from the original trigger point
        duration: 800, // Duration of animation
        easing: 'ease-out-cubic', // Easing function
    });

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
        document.body.classList.toggle('overflow-hidden'); // Prevent background scrolling
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Active Navigation Highlight & Navbar Background
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-cyber-link');
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        let current = '';

        // Navbar background blur/transparency adjustment
        if (window.scrollY > 50) {
            nav.classList.add('bg-dark/95', 'shadow-lg');
            nav.classList.remove('bg-dark/80');
        } else {
            nav.classList.remove('bg-dark/95', 'shadow-lg');
            nav.classList.add('bg-dark/80');
        }

        // Active Link Highlighting
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-accent-main', 'after:w-full');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-accent-main');
            }
        });
    });
});
