/**
 * ARGO'S PACK - Main Script
 * Inicializa todos los módulos de la aplicación
 */

(function() {
    'use strict';

    // ============================================
    // Inicialización cuando el DOM esté listo
    // ============================================
    function init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Inicializar todas las funcionalidades
        if (window.initLazyLoading) window.initLazyLoading();
        if (window.initMobileMenu) window.initMobileMenu();
        if (window.initSmoothScroll) window.initSmoothScroll();
        if (window.initHeaderScroll) window.initHeaderScroll();
        if (window.initScrollAnimations) window.initScrollAnimations();
        if (window.initImageScrollReveal) window.initImageScrollReveal();
        if (window.initProductGallery) window.initProductGallery();
        if (window.initProductCards) window.initProductCards();
        if (window.initContactForm) window.initContactForm();
        if (window.initLightbox) window.initLightbox();
    }

    // Iniciar la aplicación
    init();

})();

