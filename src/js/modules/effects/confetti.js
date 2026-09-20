// ==================== CONFETTI ====================
        function createConfetti() {
            const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b'];

            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 5000);
            }
        }

        
// Add fall animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
