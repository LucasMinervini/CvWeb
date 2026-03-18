/**
 * ARGO'S PACK - Internationalization Module
 * Handles language switching and text translation
 */

(function() {
    'use strict';

    let currentLanguage = 'ES';
    let translations = {};

    /**
     * Load translations from JSON file
     */
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`i18n/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${lang}`);
            }
            translations[lang] = await response.json();
            return translations[lang];
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to Spanish if English fails
            if (lang === 'EN') {
                return await loadTranslations('ES');
            }
            return null;
        }
    }

    /**
     * Get translation by key path (e.g., 'nav.home' or 'hero.title')
     */
    function getTranslation(key, lang = currentLanguage) {
        if (!translations[lang]) {
            return key;
        }

        const keys = key.split('.');
        let value = translations[lang];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    }

    /**
     * Update element text content
     */
    function updateElement(element, translationKey) {
        if (!element) return;
        
        const translation = getTranslation(translationKey);
        if (translation && translation !== translationKey) {
            element.textContent = translation;
        }
    }

    /**
     * Update element attribute
     */
    function updateAttribute(element, attribute, translationKey) {
        if (!element) return;
        
        const translation = getTranslation(translationKey);
        if (translation && translation !== translationKey) {
            element.setAttribute(attribute, translation);
        }
    }

    /**
     * Update placeholder attribute
     */
    function updatePlaceholder(element, translationKey) {
        updateAttribute(element, 'placeholder', translationKey);
    }

    /**
     * Update HTML content (for elements with HTML)
     */
    function updateHTML(element, translationKey) {
        if (!element) return;
        
        const translation = getTranslation(translationKey);
        if (translation && translation !== translationKey) {
            element.innerHTML = translation;
        }
    }

    /**
     * Update meta tags
     */
    function updateMetaTags() {
        const title = getTranslation('meta.title');
        const description = getTranslation('meta.description');
        const ogTitle = getTranslation('meta.ogTitle');
        const ogDescription = getTranslation('meta.ogDescription');

        // Update document title
        document.title = title;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }

        // Update Open Graph tags
        const ogTitleTag = document.querySelector('meta[property="og:title"]');
        if (ogTitleTag) {
            ogTitleTag.setAttribute('content', ogTitle);
        }

        const ogDescTag = document.querySelector('meta[property="og:description"]');
        if (ogDescTag) {
            ogDescTag.setAttribute('content', ogDescription);
        }

        // Update Twitter tags
        const twitterTitleTag = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitleTag) {
            twitterTitleTag.setAttribute('content', ogTitle);
        }

        const twitterDescTag = document.querySelector('meta[property="twitter:description"]');
        if (twitterDescTag) {
            twitterDescTag.setAttribute('content', ogDescription);
        }

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', currentLanguage.toLowerCase());
    }

    /**
     * Translate all elements with data-i18n attribute
     */
    function translatePage() {
        // Update meta tags
        updateMetaTags();

        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const type = element.getAttribute('data-i18n-type') || 'text';

            switch (type) {
                case 'html':
                    updateHTML(element, key);
                    break;
                case 'placeholder':
                    updatePlaceholder(element, key);
                    break;
                case 'alt':
                    updateAttribute(element, 'alt', key);
                    break;
                case 'aria-label':
                    updateAttribute(element, 'aria-label', key);
                    break;
                case 'title':
                    updateAttribute(element, 'title', key);
                    break;
                default:
                    updateElement(element, key);
            }
        });

        // Translate select options
        translateSelectOptions();

        // Update form subject in script.js
        if (window.updateContactFormSubject) {
            window.updateContactFormSubject(getTranslation('contact.form.subject'));
        }
    }

    /**
     * Translate select option elements
     */
    function translateSelectOptions() {
        const options = document.querySelectorAll('option[data-i18n-option]');
        options.forEach(option => {
            const key = option.getAttribute('data-i18n-option');
            const translation = getTranslation(key);
            if (translation && translation !== key) {
                option.textContent = translation;
            }
        });
    }

    /**
     * Change language
     */
    async function changeLanguage(lang) {
        if (lang === currentLanguage) return;

        // Load translations if not already loaded
        if (!translations[lang]) {
            await loadTranslations(lang);
        }

        currentLanguage = lang;
        localStorage.setItem('argospack-language', lang);
        translatePage();

        // Update language selector UI
        updateLanguageSelector();
    }

    /**
     * Update language selector UI
     */
    function updateLanguageSelector() {
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = currentLanguage;
            // Update aria-label
            const ariaLabel = getTranslation('language.selectLabel');
            if (ariaLabel) {
                selector.setAttribute('aria-label', ariaLabel);
            }
        }

        const buttons = document.querySelectorAll('[data-lang]');
        buttons.forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Initialize i18n system
     */
    async function init() {
        // Get saved language or default to Spanish
        const savedLang = localStorage.getItem('argospack-language') || 'ES';
        
        // Load initial translations
        await loadTranslations(savedLang);
        currentLanguage = savedLang;
        
        // Translate page
        translatePage();

        // Setup language selector
        setupLanguageSelector();
    }

    /**
     * Setup language selector event listeners
     */
    function setupLanguageSelector() {
        // Select dropdown
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.addEventListener('change', (e) => {
                changeLanguage(e.target.value);
            });
        }

        // Button selectors
        const buttons = document.querySelectorAll('[data-lang]');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });
    }

    // Public API
    window.i18n = {
        changeLanguage,
        getTranslation,
        currentLanguage: () => currentLanguage
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

