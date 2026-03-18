/**
 * ARGO'S PACK - Scroll Animations Module
 * Maneja las animaciones al hacer scroll (Fade In)
 */

(function() {
    'use strict';

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.product__card, .benefit__card, .testimonial__card');

        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                animationObserver.observe(element);
            });
        }
    }

    // Exportar función para uso global
    window.initScrollAnimations = initScrollAnimations;

})();

