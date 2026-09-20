// ==================== FORM SUBMISSIONS ====================
        function submitProjectRequest(event) {
            event.preventDefault();
            showToast('تم استلام طلبك بنجاح! سنتواصل معك خلال 24 ساعة.');
            event.target.reset();
        }

        function submitTicket(event) {
            event.preventDefault();
            showToast('تم إرسال التذكرة بنجاح! رقم التذكرة: #TKT-2026-004');
            event.target.reset();
        }
