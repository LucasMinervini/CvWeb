/**
 * ARGO'S PACK - Product Gallery Module
 * Maneja el cambio de imágenes en la galería de productos
 */

(function() {
    'use strict';

    function initProductGallery() {
        const thumbnails = document.querySelectorAll('.product__thumbnail');
        const mainImage = document.getElementById('main-product-image');

        if (!thumbnails.length || !mainImage) return;

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const newImageSrc = thumbnail.getAttribute('data-image');
                if (newImageSrc && mainImage) {
                    // Update main image
                    mainImage.src = newImageSrc;
                    
                    // Update active state
                    thumbnails.forEach(thumb => thumb.classList.remove('active'));
                    thumbnail.classList.add('active');
                }
            });
        });
    }

    // Exportar función para uso global
    window.initProductGallery = initProductGallery;

})();

