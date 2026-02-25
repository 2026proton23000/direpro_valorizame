// articles.js
const articles = {
    currentFilter: 'all',
    articlesData: [],
    allIds: [],

    init: function() {
        fetch('data/articles/index.json')
            .then(response => response.json())
            .then(ids => {
                this.allIds = ids;
                if (window.location.pathname.includes('solutions.html')) {
                    this.loadAllArticles();
                    this.setupFilters();
                } else if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
                    this.loadRecentArticles();
                }
            })
            .catch(error => console.error('Erreur chargement index:', error));
    },

    loadAllArticles: function() {
        const lang = i18n.currentLang;
        const promises = this.allIds.map(id =>
            fetch(`data/articles/${id}.json`)
                .then(res => res.json())
                .then(data => ({
                    id: id,
                    titre: data[lang].titre,
                    date: data[lang].date,
                    categorie: data[lang].categorie,
                    image: data[lang].image,
                    resume: data[lang].resume
                }))
        );
        Promise.all(promises).then(articles => {
            articles.sort((a, b) => new Date(b.date) - new Date(a.date));
            this.articlesData = articles;
            this.renderArticles(articles);
        });
    },

    loadRecentArticles: function() {
        const lang = i18n.currentLang;
        const recentIds = this.allIds.slice(0, 3);
        const promises = recentIds.map(id =>
            fetch(`data/articles/${id}.json`)
                .then(res => res.json())
                .then(data => ({
                    id: id,
                    titre: data[lang].titre,
                    date: data[lang].date,
                    categorie: data[lang].categorie,
                    image: data[lang].image,
                    resume: data[lang].resume
                }))
        );
        Promise.all(promises).then(articles => {
            console.log('Articles récents chargés:', articles);
            this.renderArticles(articles, '#articles-list');
        });
    },

    renderArticles: function(articles, containerId = '#articles-grid') {
        console.log('renderArticles appelé avec containerId =', containerId);
        const container = document.querySelector(containerId);
        console.log('container trouvé ?', container);
        if (!container) {
            console.error('Conteneur introuvable');
            return;
        }

        if (articles.length === 0) {
            container.innerHTML = '<div class="no-articles">Aucun article.</div>';
            return;
        }

        let html = '';
        articles.forEach(article => {
            const badgeClass = article.categorie === 'organique' ? '' : 'inorganique';
            html += `
                <article class="article-card reveal" data-id="${article.id}" data-category="${article.categorie}">
                    <div class="article-image" style="background-image: url('${article.image || '/images/placeholder.jpg'}')">
                        <span class="badge ${badgeClass}">${article.categorie}</span>
                    </div>
                    <div class="article-content">
                        <h4>${article.titre}</h4>
                        <div class="article-date">📅 ${new Date(article.date).toLocaleDateString(i18n.currentLang)}</div>
                        <p class="article-excerpt">${article.resume}</p>
                    </div>
                </article>
            `;
        });
        console.log('HTML généré :', html);
        container.innerHTML = html;
        console.log('Contenu du container après insertion :', container.innerHTML);

        // >>> AJOUT ICI : forcer la mise à jour des animations
        if (typeof app !== 'undefined' && app.refreshReveals) {
            app.refreshReveals();
        }

        // Ajouter événement clic
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                window.location.href = `/article.html?id=${id}&lang=${i18n.currentLang}`;
            });
        });
    },
    setupFilters: function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                this.currentFilter = filter;
                const filtered = filter === 'all'
                    ? this.articlesData
                    : this.articlesData.filter(a => a.categorie === filter);
                this.renderArticles(filtered);
            });
        });
    }
};