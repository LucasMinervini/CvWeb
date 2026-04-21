(function () {
    'use strict';

    /* =============================================
       Bento Grid — staggered fade-in on scroll
       ============================================= */
    var bentoCells = document.querySelectorAll('.bento-cell');
    if (bentoCells.length) {
        var cellObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('bento-visible');
                    cellObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        bentoCells.forEach(function (cell) {
            cellObserver.observe(cell);
        });
    }

    /* =============================================
       Promise Carousel — auto-rotate slides
       ============================================= */
    var promiseCarousel = document.querySelector('.promise-carousel');
    if (promiseCarousel) {
        var slides = promiseCarousel.querySelectorAll('.promise-slide');
        var dots   = promiseCarousel.querySelectorAll('.promise-dot');
        var current = 0;
        var interval = null;

        function showSlide(index) {
            slides[current].classList.remove('promise-slide--active');
            dots[current].classList.remove('promise-dot--active');
            current = index % slides.length;
            slides[current].classList.add('promise-slide--active');
            dots[current].classList.add('promise-dot--active');
        }

        function startCarousel() {
            interval = setInterval(function () {
                showSlide(current + 1);
            }, 3500);
        }

        // Pause on hover
        promiseCarousel.addEventListener('mouseenter', function () {
            clearInterval(interval);
        });
        promiseCarousel.addEventListener('mouseleave', function () {
            startCarousel();
        });

        // Start only when in view
        var carouselObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    startCarousel();
                    carouselObserver.unobserve(promiseCarousel);
                }
            });
        }, { threshold: 0.4 });

        carouselObserver.observe(promiseCarousel);
    }

    /* =============================================
       Photo Mosaic — staggered reveal on scroll (kept for compatibility)
       ============================================= */
    var mosaic = document.querySelector('.photo-mosaic');
    if (mosaic) {
        var mosaicObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    mosaicObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        mosaicObserver.observe(mosaic);
    }
})();
