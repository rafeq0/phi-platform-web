// ==================== PRODUCTS FILTER ====================
        function filterProducts(category, btn) {
            // Update active button
            document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            document.querySelectorAll('.product-item').forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
                } else {
                    item.style.display = 'none';
                }
            });
        }

        function searchProducts(query) {
            const items = document.querySelectorAll('.product-item');
            items.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const desc = item.querySelector('p').textContent.toLowerCase();
                if (title.includes(query.toLowerCase()) || desc.includes(query.toLowerCase())) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
