// article.js
const articlePage = {
    init: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            document.getElementById('article-container').innerHTML = '<p>Article non trouvé.</p>';
            return;
        }
        const lang = i18n.currentLang;
        fetch(`data/articles/${id}.json`)
            .then(response => response.json())
            .then(data => {
                if (!data[lang]) throw new Error('Langue non disponible');
                this.renderArticle(data[lang]);
            })
            .catch(error => {
                console.error('Erreur:', error);
                document.getElementById('article-container').innerHTML = '<p>Erreur de chargement.</p>';
            });
    },

    renderArticle: function(article) {
        const container = document.getElementById('article-container');
        container.innerHTML = `
            <div class="article-header">
                <h1>${article.titre}</h1>
                <div class="article-meta">
                    <span>📅 ${new Date(article.date).toLocaleDateString(i18n.currentLang)}</span>
                    <span class="badge ${article.categorie === 'organique' ? '' : 'inorganique'}">${article.categorie}</span>
                </div>
            </div>
            <img src="${article.image}" alt="${article.titre}" class="article-image">
            <div class="article-content">${article.contenu}</div>
            <a href="/solutions.html?lang=${i18n.currentLang}" class="back-link" data-i18n="article.retour">← Retour aux solutions</a>
        `;
    }
};