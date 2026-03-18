/**
 * ARGO'S PACK - Image Scroll Reveal Module
 * Maneja el efecto de scroll reveal para imágenes
 */

(function() {
    'use strict';

    function initImageScrollReveal() {
        // Select all images that should have scroll reveal effect
        // Exclude logos in header/footer and hero image (already visible)
        const imagesToAnimate = document.querySelectorAll(
            '.product__img, .more-product__img, .product__main-img, .product__thumbnail img'
        );

        if (!imagesToAnimate.length) return;

        // Add initial class to all images
        imagesToAnimate.forEach(img => {
            img.classList.add('scroll-reveal-img');
        });

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add revealed class when image enters viewport
                        entry.target.classList.add('revealed');
                    } else {
                        // Optional: Remove revealed class when scrolling up (uncomment if needed)
                        // entry.target.classList.remove('revealed');
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -100px 0px'
            });

            imagesToAnimate.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            imagesToAnimate.forEach(img => {
                img.classList.add('revealed');
            });
        }
    }

    // Exportar función para uso global
    window.initImageScrollReveal = initImageScrollReveal;

})();

