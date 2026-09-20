// ==================== COUNTER ANIMATION ====================
        function animateCounters() {
            document.querySelectorAll('.animated-counter').forEach(counter => {
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(start + (target - start) * easeProgress);
                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }

                requestAnimationFrame(update);
            });
        }
