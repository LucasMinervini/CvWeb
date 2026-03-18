/**
 * ARGO'S PACK - Contact Form Module
 * Handles contact form submission via WhatsApp API.
 */

(function() {
    'use strict';

    const whatsappNumber = '5491154875596';

    function getTranslation(key, fallback) {
        if (!window.i18n) {
            return fallback;
        }

        return window.i18n.getTranslation(key) || fallback;
    }

    function initContactForm() {
        const contactForm = document.querySelector('.contact__form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nameValue = (contactForm.querySelector('#name').value || '').trim();
            const emailValue = (contactForm.querySelector('#email').value || '').trim();
            const messageValue = (contactForm.querySelector('#message').value || '').trim();

            if (!nameValue || !emailValue || !messageValue) {
                alert(getTranslation('contact.form.validation', 'Please complete all fields before sending your message.'));
                return;
            }

            const subject = getTranslation('contact.form.subject', 'Inquiry from ARGO\'S PACK Website');
            const nameLabel = getTranslation('contact.form.name', 'Full Name');
            const emailLabel = getTranslation('contact.form.email', 'Email Address');
            const messageLabel = getTranslation('contact.form.message', 'Your Message');
            const whatsappMessage = [
                subject,
                '',
                `${nameLabel}: ${nameValue}`,
                `${emailLabel}: ${emailValue}`,
                `${messageLabel}: ${messageValue}`
            ].join('\n');

            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            alert(
                getTranslation(
                    'contact.form.success',
                    'WhatsApp will open so you can send the message. Thank you for reaching out! Aguante Boca!'
                )
            );

            contactForm.reset();
        });
    }

    window.updateContactFormSubject = function(subject) {
        return subject;
    };

    window.initContactForm = initContactForm;
})();
