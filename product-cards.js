/**
 * Product cards modal interaction — Bento Grid version
 */
(function () {
    'use strict';

    var MODAL_ID = 'product-modal';

    /* ------------------------------------------------
       Extract all display data from a bento cell
    ------------------------------------------------ */
    function getProductData(cell) {
        var bgImg   = cell.querySelector('.bento-cell__bg-image img');
        var mediaImg = cell.querySelector('.bento-cell__media img');
        var image   = bgImg || mediaImg;
        var chip    = cell.querySelector('.bento-chip');
        var title   = cell.querySelector('.bento-cell__title');
        var desc    = cell.querySelector('.bento-cell__desc');
        var features = cell.querySelectorAll('.bento-features li');
        var cta     = cell.querySelector('.bento-btn[href]');
        var priceAmt = cell.querySelector('.bento-price__amount');
        var priceCur = cell.querySelector('.bento-price__currency');

        return {
            imageSrc: image ? image.getAttribute('src') : '',
            imageAlt: image ? image.getAttribute('alt') : '',
            chip:     chip ? chip.textContent.trim() : '',
            title:    title ? title.textContent.trim() : '',
            subtitle: desc  ? desc.textContent.trim()  : '',
            features: Array.prototype.map.call(features, function (li) {
                return li.textContent.trim();
            }),
            ctaHref:  cta ? cta.getAttribute('href') : '',
            ctaText:  cta ? cta.textContent.trim()   : '',
            price:    priceAmt ? (priceCur ? priceCur.textContent.trim() + ' ' : '') + priceAmt.textContent.trim() : ''
        };
    }

    /* ------------------------------------------------
       Build modal DOM once
    ------------------------------------------------ */
    function buildModal() {
        var existing = document.getElementById(MODAL_ID);
        if (existing) return existing;

        var modal = document.createElement('div');
        modal.id = MODAL_ID;
        modal.className = 'product-modal';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML =
            '<div class="product-modal__backdrop" data-product-modal-close></div>' +
            '<div class="product-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">' +
                '<button type="button" class="product-modal__close" data-product-modal-close aria-label="Cerrar detalle">&times;</button>' +
                '<div class="product-modal__layout">' +
                    '<div class="product-modal__visual">' +
                        '<span class="product-modal__chip"></span>' +
                        '<img class="product-modal__image" src="" alt="">' +
                    '</div>' +
                    '<div class="product-modal__content">' +
                        '<h3 class="product-modal__title" id="product-modal-title"></h3>' +
                        '<p class="product-modal__price" hidden></p>' +
                        '<p class="product-modal__subtitle"></p>' +
                        '<ul class="product-modal__features"></ul>' +
                        '<a class="btn btn--cta product-modal__cta" href="" target="_blank" rel="noopener noreferrer"></a>' +
                    '</div>' +
                '</div>' +
            '</div>';

        document.body.appendChild(modal);
        return modal;
    }

    /* ------------------------------------------------
       Populate modal with product data
    ------------------------------------------------ */
    function fillModal(modal, data) {
        var image    = modal.querySelector('.product-modal__image');
        var chip     = modal.querySelector('.product-modal__chip');
        var title    = modal.querySelector('.product-modal__title');
        var price    = modal.querySelector('.product-modal__price');
        var subtitle = modal.querySelector('.product-modal__subtitle');
        var features = modal.querySelector('.product-modal__features');
        var cta      = modal.querySelector('.product-modal__cta');

        image.src = data.imageSrc;
        image.alt = data.imageAlt || data.title;

        chip.textContent = data.chip;
        chip.hidden = !data.chip;

        title.textContent = data.title;

        if (data.price) {
            price.textContent = data.price;
            price.hidden = false;
        } else {
            price.hidden = true;
        }

        subtitle.textContent = data.subtitle;
        subtitle.hidden = !data.subtitle;

        features.innerHTML = '';
        data.features.forEach(function (item) {
            var li = document.createElement('li');
            li.textContent = item;
            features.appendChild(li);
        });
        features.hidden = !data.features.length;

        if (data.ctaHref && data.ctaText) {
            cta.href = data.ctaHref;
            cta.textContent = data.ctaText;
            cta.hidden = false;
        } else {
            cta.hidden = true;
        }
    }

    /* ------------------------------------------------
       Open / close
    ------------------------------------------------ */
    function openModal(cell) {
        var modal = buildModal();
        fillModal(modal, getProductData(cell));
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('product-modal-open');
    }

    function closeModal() {
        var modal = document.getElementById(MODAL_ID);
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('product-modal-open');
    }

    /* ------------------------------------------------
       Event delegation
    ------------------------------------------------ */
    function bindEvents() {
        if (document.body.dataset.productModalBound === 'true') return;
        document.body.dataset.productModalBound = 'true';

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-product-modal-close]')) { closeModal(); return; }

            /* Clicking the buy button should navigate, not open modal */
            if (e.target.closest('.bento-btn[href]')) return;

            var cell = e.target.closest('.bento-grid .bento-cell[data-product-id]');
            if (!cell) return;

            e.preventDefault();
            openModal(cell);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { closeModal(); return; }
            if (e.key !== 'Enter' && e.key !== ' ') return;
            if (e.target.closest('.bento-btn[href]')) return;

            var cell = e.target.closest('.bento-grid .bento-cell[data-product-id]');
            if (!cell) return;

            e.preventDefault();
            openModal(cell);
        });
    }

    /* ------------------------------------------------
       Init — make cells keyboard-accessible
    ------------------------------------------------ */
    window.initProductCards = function () {
        var cells = document.querySelectorAll('.bento-grid .bento-cell[data-product-id]');
        cells.forEach(function (cell) {
            if (cell.dataset.productCardReady === 'true') return;
            cell.dataset.productCardReady = 'true';
            cell.setAttribute('role', 'button');
            cell.setAttribute('tabindex', '0');
            cell.setAttribute('aria-label', 'Ver detalles del producto');
        });

        buildModal();
        bindEvents();
    };
})();
