/**
 * ARGO'S PACK - Header Scroll Module
 * Maneja el efecto de scroll en el header
 */

(function() {
    'use strict';

    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 50; // Píxeles de scroll antes de activar el efecto

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Verificar el estado inicial al cargar la página
        if (window.pageYOffset > scrollThreshold) {
            header.classList.add('scrolled');
        }
    }

    // Exportar función para uso global
    window.initHeaderScroll = initHeaderScroll;

})();

