/**
 * Product cards modal interaction
 */
(function () {
    'use strict';

    var MODAL_ID = 'product-modal';

    function getTextContent(element) {
        return element ? element.textContent.trim() : '';
    }

    function getProductData(card) {
        var image = card.querySelector('.category-card__media img');
        var chip = card.querySelector('.category-card__chip');
        var badge = card.querySelector('.category-card__badge span');
        var price = card.querySelector('.category-card__price');
        var title = card.querySelector('.category-card__title');
        var subtitle = card.querySelector('.category-card__subtitle');
        var features = card.querySelectorAll('.category-card__features li');
        var cta = card.querySelector('.category-card__cta');

        return {
            imageSrc: image ? image.getAttribute('src') : '',
            imageAlt: image ? image.getAttribute('alt') : '',
            chip: getTextContent(chip),
            badge: getTextContent(badge),
            price: getTextContent(price),
            title: getTextContent(title),
            subtitle: getTextContent(subtitle),
            features: Array.prototype.map.call(features, function (item) {
                return item.textContent.trim();
            }),
            ctaHref: cta ? cta.getAttribute('href') : '',
            ctaText: getTextContent(cta)
        };
    }

    function buildModal() {
        var existingModal = document.getElementById(MODAL_ID);
        if (existingModal) return existingModal;

        var modal = document.createElement('div');
        modal.id = MODAL_ID;
        modal.className = 'product-modal';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = '' +
            '<div class="product-modal__backdrop" data-product-modal-close></div>' +
            '<div class="product-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">' +
                '<button type="button" class="product-modal__close" data-product-modal-close aria-label="Close product details">&times;</button>' +
                '<div class="product-modal__layout">' +
                    '<div class="product-modal__visual">' +
                        '<span class="product-modal__chip"></span>' +
                        '<img class="product-modal__image" src="" alt="">' +
                    '</div>' +
                    '<div class="product-modal__content">' +
                        '<span class="product-modal__badge"></span>' +
                        '<p class="product-modal__price"></p>' +
                        '<h3 class="product-modal__title" id="product-modal-title"></h3>' +
                        '<p class="product-modal__subtitle"></p>' +
                        '<ul class="product-modal__features"></ul>' +
                        '<a class="btn btn--cta product-modal__cta" href="" target="_blank" rel="noopener noreferrer"></a>' +
                    '</div>' +
                '</div>' +
            '</div>';

        document.body.appendChild(modal);
        return modal;
    }

    function fillModal(modal, data) {
        var image = modal.querySelector('.product-modal__image');
        var chip = modal.querySelector('.product-modal__chip');
        var badge = modal.querySelector('.product-modal__badge');
        var price = modal.querySelector('.product-modal__price');
        var title = modal.querySelector('.product-modal__title');
        var subtitle = modal.querySelector('.product-modal__subtitle');
        var features = modal.querySelector('.product-modal__features');
        var cta = modal.querySelector('.product-modal__cta');

        image.src = data.imageSrc;
        image.alt = data.imageAlt || data.title;

        chip.textContent = data.chip;
        chip.hidden = !data.chip;

        badge.textContent = data.badge;
        badge.hidden = !data.badge;

        price.textContent = data.price;
        price.hidden = !data.price;

        title.textContent = data.title;
        subtitle.textContent = data.subtitle;
        subtitle.hidden = !data.subtitle;

        features.innerHTML = '';
        data.features.forEach(function (item) {
            var listItem = document.createElement('li');
            listItem.textContent = item;
            features.appendChild(listItem);
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

    function openModal(card) {
        var modal = buildModal();
        fillModal(modal, getProductData(card));
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

    function bindModalEvents() {
        if (document.body.dataset.productModalBound === 'true') return;
        document.body.dataset.productModalBound = 'true';

        document.addEventListener('click', function (event) {
            var closeTrigger = event.target.closest('[data-product-modal-close]');
            if (closeTrigger) {
                closeModal();
                return;
            }

            if (event.target.closest('.category-card__cta')) return;

            var card = event.target.closest('.products__grid .category-card');
            if (!card) return;

            event.preventDefault();
            openModal(card);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeModal();
                return;
            }

            if (event.key !== 'Enter' && event.key !== ' ') return;
            if (event.target.closest('.category-card__cta')) return;

            var card = event.target.closest('.products__grid .category-card');
            if (!card) return;

            event.preventDefault();
            openModal(card);
        });
    }

    window.initProductCards = function () {
        var cards = document.querySelectorAll('.products__grid .category-card');
        if (!cards.length) return;

        cards.forEach(function (card) {
            if (card.dataset.productCardReady === 'true') return;

            card.dataset.productCardReady = 'true';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Open product details');
        });

        buildModal();
        bindModalEvents();
    };
})();
