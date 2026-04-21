/**
 * ARGO'S PACK - Product Gallery Module
 * Handles featured product image and copy updates.
 */

(function() {
    'use strict';

    function parseBenefits(rawBenefits) {
        if (!rawBenefits) return [];

        try {
            const parsedBenefits = JSON.parse(rawBenefits);
            return Array.isArray(parsedBenefits) ? parsedBenefits : [];
        } catch (error) {
            return [];
        }
    }

    function updateGalleryContent(thumbnail, elements) {
        const { mainImage, titleElement, descriptionElement, benefitsElement, linkElement } = elements;
        const nextImage = thumbnail.getAttribute('data-image');
        const nextAlt = thumbnail.getAttribute('data-alt');
        const nextTitle = thumbnail.getAttribute('data-title');
        const nextDescription = thumbnail.getAttribute('data-description');
        const nextBenefits = parseBenefits(thumbnail.getAttribute('data-benefits'));
        const nextLink = thumbnail.getAttribute('data-link');

        if (nextImage) {
            mainImage.src = nextImage;
        }

        if (nextAlt) {
            mainImage.alt = nextAlt;
        }

        if (nextTitle && titleElement) {
            titleElement.textContent = nextTitle;
        }

        if (nextDescription && descriptionElement) {
            descriptionElement.textContent = nextDescription;
        }

        if (benefitsElement && nextBenefits.length) {
            benefitsElement.innerHTML = nextBenefits
                .map((benefit) => `<li>${benefit}</li>`)
                .join('');
        }

        if (nextLink && linkElement) {
            linkElement.href = nextLink;
        }
    }

    function initProductGallery() {
        const thumbnails = document.querySelectorAll('.product__thumbnail');
        const mainImage = document.getElementById('main-product-image');
        const titleElement = document.getElementById('gallery-product-title');
        const descriptionElement = document.getElementById('gallery-product-description');
        const benefitsElement = document.getElementById('gallery-product-benefits');
        const linkElement = document.getElementById('gallery-product-link');

        if (!thumbnails.length || !mainImage) return;

        const galleryElements = {
            mainImage,
            titleElement,
            descriptionElement,
            benefitsElement,
            linkElement
        };

        const activeThumbnail = document.querySelector('.product__thumbnail.active') || thumbnails[0];
        if (activeThumbnail) {
            updateGalleryContent(activeThumbnail, galleryElements);
        }

        thumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener('click', () => {
                updateGalleryContent(thumbnail, galleryElements);
                thumbnails.forEach((thumb) => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });
    }

    window.initProductGallery = initProductGallery;
})();
