const vozArticle = {
    init: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            document.getElementById('article-container').innerHTML = '<p>Article non trouvé.</p>';
            return;
        }
        const lang = i18n.currentLang;
        fetch(`data/voz/${id}.json`)
            .then(response => response.json())
            .then(data => {
                if (!data[lang]) {
                    throw new Error('Langue non disponible');
                }
                this.renderArticle(data[lang], id);
            })
            .catch(error => {
                console.error('Erreur chargement article:', error);
                document.getElementById('article-container').innerHTML = '<p>Erreur de chargement.</p>';
            });
    },

    renderArticle: function(article, id) {
        const container = document.getElementById('article-container');
        
        // Construction de la galerie
        let galleryHtml = '';
        if (article.images && article.images.length > 0) {
            galleryHtml = '<div class="gallery">';
            article.images.forEach((img, index) => {
                galleryHtml += `
                    <div class="gallery-item" data-src="${img}">
                        <img src="${img}" alt="Photo ${index+1}" loading="lazy">
                    </div>
                `;
            });
            galleryHtml += '</div>';
        }

        container.innerHTML = `
            <div class="article-header">
                <h1>${article.titre}</h1>
                <div class="article-meta">
                    <span>📅 ${new Date(article.date).toLocaleDateString(i18n.currentLang)}</span>
                </div>
            </div>
            <div class="article-content">${article.contenu}</div>
            ${galleryHtml}
            <a href="voz-tacna.html?lang=${i18n.currentLang}" class="back-link" data-i18n="article.retour">← Retour aux actualités</a>
        `;

        // Initialiser la galerie (zoom au clic)
        this.setupGallery();
    },

    setupGallery: function() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.close');
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.dataset.src;
            });
        });

        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // On attend que i18n soit chargé (dans app.js)
});