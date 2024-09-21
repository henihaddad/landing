document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal elements with Animate.css classes on scroll
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.animate__animated:not(.animate__animated--revealed)');
        const triggerBottom = window.innerHeight * 0.9; // Increased trigger area for smoother reveal

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('animate__animated--revealed');
                element.style.animationDelay = '0.1s'; // Small delay for smoother appearance
                element.classList.add(element.dataset.animation || 'animate__fadeIn');
            }
        });
    };

    // Optimize parallax effect for smoother scrolling
    const hero = document.querySelector('.hero');
    let lastScrollPosition = window.pageYOffset;
    let ticking = false;

    const updateParallax = () => {
        const currentScrollPosition = window.pageYOffset;
        const delta = lastScrollPosition - currentScrollPosition;
        
        hero.style.backgroundPositionY = `${parseFloat(getComputedStyle(hero).backgroundPositionY) + delta * 0.1}px`;
        
        lastScrollPosition = currentScrollPosition;
        ticking = false;
    };

    // Handle scroll events with throttling
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check for elements in view
    revealOnScroll();

    // Animate logo using CSS transitions (defined in styles.css)
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseover', () => {
        logo.classList.add('logo-hover');
    });
    logo.addEventListener('mouseout', () => {
        logo.classList.remove('logo-hover');
    });

    // Add a subtle animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    let pulseTimeout;

    const pulseCTA = () => {
        ctaButton.classList.add('animate__pulse');
        pulseTimeout = setTimeout(() => {
            ctaButton.classList.remove('animate__pulse');
            setTimeout(pulseCTA, 5000); // Wait 5 seconds before next pulse
        }, 1000); // Pulse duration
    };

    pulseCTA(); // Start the pulsing animation

    // Clean up the timeout when the page is unloaded
    window.addEventListener('beforeunload', () => {
        clearTimeout(pulseTimeout);
    });
});