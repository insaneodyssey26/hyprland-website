document.addEventListener('DOMContentLoaded', () => {
    // Initial fade in for hero elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // Scroll reveal observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in-up elements except the hero (which we triggered manually above)
    const fadeElements = document.querySelectorAll('.fade-in-up:not(.hero .fade-in-up)');
    fadeElements.forEach(el => observer.observe(el));
});
