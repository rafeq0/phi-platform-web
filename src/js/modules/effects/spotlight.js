// ==================== SPOTLIGHT EFFECT ====================
        function initSpotlight() {
            document.querySelectorAll('.spotlight').forEach(el => {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    el.style.setProperty('--x', x + 'px');
                    el.style.setProperty('--y', y + 'px');
                    el.querySelector('::before')?.style?.setProperty('left', x + 'px');
                    el.querySelector('::before')?.style?.setProperty('top', y + 'px');
                });
            });
        }
