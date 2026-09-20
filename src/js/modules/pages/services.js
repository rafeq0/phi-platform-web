// ==================== SERVICE TABS ====================
        function switchServiceTab(tab, btn) {
            // Update buttons
            document.querySelectorAll('#page-services .tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show content
            document.querySelectorAll('.service-tab-content').forEach(c => c.classList.add('hidden'));
            document.getElementById('tab-' + tab).classList.remove('hidden');

            // Animate items
            gsap.fromTo('#tab-' + tab + ' .reveal', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
            );
        }
