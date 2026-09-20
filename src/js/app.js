// ==================== APPLICATION INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initParticles();
    initCursorFollower();
    initTypingEffect();
    initNavbarScroll();
    initScrollAnimations();
    initTiltCards();
    initSpotlight();

    // Animate counters after loading
    setTimeout(animateCounters, 2500);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
