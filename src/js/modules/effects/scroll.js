// ==================== SCROLL ANIMATIONS ====================
        function initScrollAnimations() {
            gsap.registerPlugin(ScrollTrigger);

            // Reveal animations
            gsap.utils.toArray('.reveal').forEach(elem => {
                gsap.fromTo(elem, 
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: elem,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });
        }
