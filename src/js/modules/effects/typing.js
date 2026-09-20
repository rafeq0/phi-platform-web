// ==================== TYPING EFFECT ====================
        function initTypingEffect() {
            const text = document.getElementById('typingText');
            const words = ['المستقبل', 'الابتكار', 'التميز', 'النجاح'];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentWord = words[wordIndex];

                if (isDeleting) {
                    text.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    text.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, 2000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, isDeleting ? 50 : 100);
                }
            }

            type();
        }
