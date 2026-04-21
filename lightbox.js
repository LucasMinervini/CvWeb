/**
 * ARGO'S PACK - Lightbox Module
 * Maneja la funcionalidad del lightbox para imágenes
 */

(function() {
    'use strict';

    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        const lightboxImg = lightbox.querySelector('.lightbox__img');
        const lightboxClose = lightbox.querySelector('.lightbox__close');

        if (!lightboxImg || !lightboxClose) return;

        // Keep thumbnails as selectors and allow zoom only on main showcase images.
        const productImages = document.querySelectorAll('.product__main-img, .more-products__grid img');

        productImages.forEach(img => {
            img.style.cursor = 'zoom-in'; // Add a visual cue
            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                lightboxImg.src = img.src;
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // Close when clicking outside the image
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Exportar función para uso global
    window.initLightbox = initLightbox;

})();

