// ==================== DASHBOARD TABS ====================
        function switchDashboardTab(tab) {
            // Update sidebar
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.tab === tab) {
                    item.classList.add('active');
                }
            });

            // Show content
            document.querySelectorAll('.dashboard-tab').forEach(c => c.classList.add('hidden'));
            document.getElementById('dash-' + tab).classList.remove('hidden');
        }
