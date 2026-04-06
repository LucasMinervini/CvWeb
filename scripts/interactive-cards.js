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
       Stats counters — animate when stats cell enters view
       ============================================= */
    var statsCell = document.querySelector('.bento-cell--stats');
    if (statsCell) {
        var countersStarted = false;

        function animateCounter(el) {
            var target = parseFloat(el.dataset.target) || 0;
            var decimal = el.dataset.decimal || '';
            var duration = 1400;
            var start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                // ease-out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(eased * target);
                el.textContent = current + decimal;
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target + decimal;
                }
            }
            requestAnimationFrame(step);
        }

        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    statsCell.querySelectorAll('.bento-stat__num').forEach(animateCounter);
                    statsObserver.unobserve(statsCell);
                }
            });
        }, { threshold: 0.4 });

        statsObserver.observe(statsCell);
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
