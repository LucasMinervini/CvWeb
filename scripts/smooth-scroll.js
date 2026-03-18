/**
 * ARGO'S PACK - Smooth Scroll Module
 * Maneja el scroll suave para enlaces de ancla
 */

(function() {
    'use strict';

    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Ignorar enlaces vacíos o solo "#"
                if (href === '#' || href === '') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Exportar función para uso global
    window.initSmoothScroll = initSmoothScroll;

})();

