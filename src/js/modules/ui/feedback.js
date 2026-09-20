// ==================== TOAST ====================
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            toastMessage.textContent = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        
// ==================== MODAL ====================
        function openModal() {
            document.getElementById('modalOverlay').classList.add('active');
            document.getElementById('modalContent').classList.add('active');
        }

        function closeModal() {
            document.getElementById('modalOverlay').classList.remove('active');
            document.getElementById('modalContent').classList.remove('active');
        }
