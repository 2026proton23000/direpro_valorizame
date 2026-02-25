// app.js
const app = {
    init: function() {
        this.setupRevealOnScroll();
        if (typeof articles !== 'undefined' && articles.init) articles.init();
        if (typeof carte !== 'undefined' && carte.init) carte.init();
        if (typeof articlePage !== 'undefined' && articlePage.init) articlePage.init();
    },

    setupRevealOnScroll: function() {
        // Fonction de vérification
        const checkReveal = () => {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    el.classList.add('active');
                }
            });
        };
        // Stocker la fonction pour pouvoir l'appeler plus tard
        this.checkReveal = checkReveal;
        window.addEventListener('scroll', checkReveal);
        checkReveal(); // au chargement
    },

    // Nouvelle méthode pour réévaluer après injection
    refreshReveals: function() {
        if (this.checkReveal) {
            this.checkReveal();
        }
    }
};

// Démarrer i18n puis l'app
i18n.init().then(() => {
    app.init();
});