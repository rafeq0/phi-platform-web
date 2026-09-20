// ==================== NAVIGATION ====================
        let currentPage = 'home';

        function navigateTo(page) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(p => {
                p.classList.remove('active');
            });

            // Show target page
            const targetPage = document.getElementById('page-' + page);
            if (targetPage) {
                targetPage.classList.add('active');
                currentPage = page;

                // Update nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.page === page) {
                        link.classList.add('active');
                    }
                });

                // Scroll to top
                window.scrollTo(0, 0);

                // Re-initialize animations for new page
                setTimeout(() => {
                    initScrollAnimations();
                    animateCounters();
                }, 100);
            }
        }

        
// ==================== MOBILE MENU ====================
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('open');
        }
