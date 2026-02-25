// i18n.js
const i18n = {
    currentLang: 'es',
    translations: {},

    init: function() {
        console.log('i18n.init() called');
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && ['es', 'fr', 'en'].includes(langParam)) {
            this.currentLang = langParam;
        } else {
            this.currentLang = 'es';
        }
        console.log('currentLang =', this.currentLang);

        this.updateActiveLangInSwitcher();
        this.updateLangSwitcherLinks();

        return fetch(`data/translations/${this.currentLang}.json`)
            .then(response => {
                console.log('Fetch response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Translations loaded:', data);
                this.translations = data;
                this.applyTranslations();
                this.updateAllLinks();
            })
            .catch(error => console.error('Erreur i18n:', error));
    },

    updateActiveLangInSwitcher: function() {
        document.querySelectorAll('.lang-switcher a').forEach(link => {
            const linkLang = link.getAttribute('data-lang');
            if (linkLang === this.currentLang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    updateLangSwitcherLinks: function() {
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        params.delete('lang');
        const baseQuery = params.toString();

        document.querySelectorAll('.lang-switcher a').forEach(link => {
            const lang = link.getAttribute('data-lang');
            if (lang) {
                let newHref = currentUrl.pathname;
                if (baseQuery) {
                    newHref += '?' + baseQuery + '&lang=' + lang;
                } else {
                    newHref += '?lang=' + lang;
                }
                link.href = newHref;
            }
        });
    },

    applyTranslations: function() {
        console.log('Applying translations for', this.currentLang);
        const elements = document.querySelectorAll('[data-i18n]');
        console.log('Found', elements.length, 'elements with data-i18n');

        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            console.log('Processing element:', el.tagName, 'key:', key, 'current text:', el.textContent.trim());
            if (this.translations[key]) {
                el.innerHTML = this.translations[key];
                console.log('  => replaced with:', this.translations[key]);
            } else {
                console.warn('  => missing translation key:', key);
            }
        });

        // Traiter les placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (this.translations[key]) {
                el.placeholder = this.translations[key];
            }
        });
    },

    updateAllLinks: function() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#') || link.closest('.lang-switcher')) return;

            try {
                const url = new URL(href, window.location.origin);
                url.searchParams.set('lang', this.currentLang);
                link.href = url.pathname + url.search + url.hash;
            } catch (e) {
                console.warn('Impossible de parser le lien:', href);
            }
        });
    },

    t: function(key) {
        return this.translations[key] || key;
    }
};