/**
 * Product cards modal interaction
 */
(function () {
    'use strict';

    var MODAL_ID = 'product-modal';
    var MOCK_PRODUCT_PRICES = {
        'leash-black': { currency: 'US$', amount: '24.99', source: 'mock' },
        'leash-white': { currency: 'US$', amount: '22.99', source: 'mock' },
        'double-leash': { currency: 'US$', amount: '27.99', source: 'mock' },
        'simple-leash': { currency: 'US$', amount: '18.99', source: 'mock' },
        'grooming-comb': { currency: 'US$', amount: '16.99', source: 'mock' },
        'pet-cup': { currency: 'US$', amount: '19.99', source: 'mock' },
        'tick-tweezers': { currency: 'US$', amount: '9.99', source: 'mock' },
        'interactive-toys': { currency: 'US$', amount: '29.90', source: 'mock' },
        'premium-beds': { currency: 'US$', amount: '34.50', source: 'mock' },
        'training-accessories': { currency: 'US$', amount: '21.75', source: 'mock' },
        'premium-feeders': { currency: 'US$', amount: '26.40', source: 'mock' },
        'pet-clothing': { currency: 'US$', amount: '17.60', source: 'mock' },
        'hygiene-care': { currency: 'US$', amount: '14.90', source: 'mock' },
        'feeders-drinkers': { currency: 'US$', amount: '23.80', source: 'mock' },
        'daily-hygiene': { currency: 'US$', amount: '12.50', source: 'mock' },
        'style-accessories': { currency: 'US$', amount: '19.40', source: 'mock' },
        'travel-gear': { currency: 'US$', amount: '42.90', source: 'mock' },
        'health-wellness': { currency: 'US$', amount: '18.30', source: 'mock' },
        'safety-protection': { currency: 'US$', amount: '25.20', source: 'mock' },
        'entertainment': { currency: 'US$', amount: '20.10', source: 'mock' },
        'grooming-care': { currency: 'US$', amount: '15.80', source: 'mock' }
    };

    function getTextContent(element) {
        return element ? element.textContent.trim() : '';
    }

    function getMockPrice(productId) {
        return productId && MOCK_PRODUCT_PRICES[productId] ? MOCK_PRODUCT_PRICES[productId] : null;
    }

    function getProductPrice(card) {
        return getMockPrice(card.dataset.productId);
    }

    function ensureCardPrice(card) {
        var title = card.querySelector('.category-card__title');
        var subtitle = card.querySelector('.category-card__subtitle');
        var existingPrice = card.querySelector('[data-product-price]');
        var priceData = getProductPrice(card);
        var meta;
        var price;
        var prefix;
        var value;

        if (!title || !subtitle || !priceData) return;

        meta = card.querySelector('.category-card__meta');
        if (!meta) {
            meta = document.createElement('div');
            meta.className = 'category-card__meta';
            title.insertAdjacentElement('afterend', meta);
        }

        price = existingPrice;
        if (!price) {
            price = document.createElement('p');
            price.className = 'category-card__price';
            price.setAttribute('data-product-price', '');
            price.innerHTML = '' +
                '<span class="category-card__price-prefix" data-product-price-currency></span>' +
                '<span class="category-card__price-value" data-product-price-amount></span>';
            meta.appendChild(price);
        }

        prefix = price.querySelector('[data-product-price-currency]');
        value = price.querySelector('[data-product-price-amount]');

        if (prefix) prefix.textContent = priceData.currency;
        if (value) value.textContent = priceData.amount;

        price.dataset.priceSource = priceData.source || 'mock';
        price.dataset.productId = card.dataset.productId || '';
    }

    function getProductData(card) {
        var image = card.querySelector('.category-card__media img');
        var chip = card.querySelector('.category-card__chip');
        var title = card.querySelector('.category-card__title');
        var subtitle = card.querySelector('.category-card__subtitle');
        var features = card.querySelectorAll('.category-card__features li');
        var cta = card.querySelector('.category-card__cta');

        return {
            imageSrc: image ? image.getAttribute('src') : '',
            imageAlt: image ? image.getAttribute('alt') : '',
            chip: getTextContent(chip),
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
        var title = modal.querySelector('.product-modal__title');
        var subtitle = modal.querySelector('.product-modal__subtitle');
        var features = modal.querySelector('.product-modal__features');
        var cta = modal.querySelector('.product-modal__cta');

        image.src = data.imageSrc;
        image.alt = data.imageAlt || data.title;

        chip.textContent = data.chip;
        chip.hidden = !data.chip;

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
            ensureCardPrice(card);
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Open product details');
        });

        buildModal();
        bindModalEvents();
    };
})();
