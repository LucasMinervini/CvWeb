/* ============================================
   Módulo: Tips de Estimulación Mental
   Mobile tap-to-flip for .tip-card elements
   ============================================ */
(function () {
    'use strict';

    function isTouchDevice() {
        return window.matchMedia('(hover: none)').matches;
    }

    function initFlipCards() {
        const cards = document.querySelectorAll('.tip-card');
        if (!cards.length) return;

        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                if (!isTouchDevice()) return;
                card.classList.toggle('is-flipped');
            });

            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.classList.toggle('is-flipped');
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFlipCards);
    } else {
        initFlipCards();
    }
}());
