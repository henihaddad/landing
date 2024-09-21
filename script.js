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

    // Animate features and about section on scroll
    const animateOnScroll = (elements) => {
        const triggerBottom = window.innerHeight / 5 * 4;
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    const features = document.querySelectorAll('.feature');
    const aboutSection = document.querySelector('#about');
    
    window.addEventListener('scroll', () => {
        animateOnScroll(features);
        animateOnScroll([aboutSection]);
    });

    // Form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! The Promptix team will get back to you soon.');
        form.reset();
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
});