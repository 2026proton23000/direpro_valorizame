const voz = {
    init: function() {
        // Si on est sur la page liste des actualités
        if (document.getElementById('voz-grid')) {
            this.loadAll();
        }
        // Si on est sur l'accueil (section des actualités récentes)
        if (document.getElementById('voz-home-list')) {
            this.loadHome();
        }
    },

    loadAll: function() {
        const lang = i18n.currentLang;
        fetch('data/voz/index.json')
            .then(response => response.json())
            .then(ids => {
                const promises = ids.map(id => 
                    fetch(`data/voz/${id}.json`)
                        .then(res => res.json())
                        .then(data => ({
                            id: id,
                            titre: data[lang].titre,
                            date: data[lang].date,
                            thumbnail: data[lang].thumbnail,   // Nouveau : miniature
                            images: data[lang].images,         // Tableau d'images pour la galerie
                            resume: data[lang].resume || this.extractResume(data[lang].contenu),
                            contenu: data[lang].contenu        // Pour la page détail
                        }))
                );
                Promise.all(promises).then(articles => {
                    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
                    this.render(articles, '#voz-grid');
                });
            })
            .catch(error => console.error('Erreur chargement voz:', error));
    },

    loadHome: function() {
        const lang = i18n.currentLang;
        fetch('data/voz/index.json')
            .then(response => response.json())
            .then(ids => {
                // Prendre les 2 premiers pour l'accueil
                const recentIds = ids.slice(0, 2);
                const promises = recentIds.map(id => 
                    fetch(`data/voz/${id}.json`)
                        .then(res => res.json())
                        .then(data => ({
                            id: id,
                            titre: data[lang].titre,
                            date: data[lang].date,
                            thumbnail: data[lang].thumbnail,
                            resume: data[lang].resume || this.extractResume(data[lang].contenu)
                        }))
                );
                Promise.all(promises).then(articles => {
                    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
                    this.render(articles, '#voz-home-list');
                });
            })
            .catch(error => console.error('Erreur chargement voz accueil:', error));
    },

    extractResume: function(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent.substring(0, 120) + '...';
    },

    render: function(articles, containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        let html = '';
        articles.forEach(a => {
            html += `
                <article class="article-card reveal" data-id="${a.id}">
                    <div class="article-image" style="background-image: url('${a.thumbnail}')">
                        <span class="badge">📢</span>
                    </div>
                    <div class="article-content">
                        <h4>${a.titre}</h4>
                        <div class="article-date">📅 ${new Date(a.date).toLocaleDateString(i18n.currentLang)}</div>
                        <p class="article-excerpt">${a.resume}</p>
                    </div>
                </article>
            `;
        });
        container.innerHTML = html;

        // Redirection vers la page de détail
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                window.location.href = `voz-article.html?id=${id}&lang=${i18n.currentLang}`;
            });
        });

        if (typeof app !== 'undefined' && app.refreshReveals) app.refreshReveals();
    }
};