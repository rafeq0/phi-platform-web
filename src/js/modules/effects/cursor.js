// ==================== CURSOR FOLLOWER ====================
        function initCursorFollower() {
            const follower = document.getElementById('cursorFollower');
            let mouseX = 0, mouseY = 0;
            let followerX = 0, followerY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animate() {
                followerX += (mouseX - followerX) * 0.1;
                followerY += (mouseY - followerY) * 0.1;

                follower.style.left = followerX - 10 + 'px';
                follower.style.top = followerY - 10 + 'px';

                requestAnimationFrame(animate);
            }

            animate();

            // Hover effect on interactive elements
            document.querySelectorAll('button, a, .glass-card').forEach(el => {
                el.addEventListener('mouseenter', () => follower.classList.add('hover'));
                el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
            });
        }
