const carte = {
    map: null,
    markersLayer: null,

    init: function() {
        if (!document.getElementById('map')) {
            console.warn("Pas de carte sur cette page");
            return;
        }

        // Initialisation de la carte
        this.map = L.map('map').setView([-18.02, -70.25], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Créer un groupe de marqueurs pour pouvoir les effacer plus tard
        this.markersLayer = L.layerGroup().addTo(this.map);

        // Charger les données
        this.loadData();
    },

    loadData: function() {
        fetch('data/entreprises.json')
            .then(response => {
                if (!response.ok) throw new Error('Erreur réseau');
                return response.json();
            })
            .then(data => {
                console.log('Données chargées:', data);
                this.displayMarkers(data);
            })
            .catch(error => {
                console.error('Erreur chargement entreprises:', error);
                // Optionnel : afficher un message sur la carte
                L.popup()
                    .setLatLng([-18.02, -70.25])
                    .setContent("Impossible de charger les données des entreprises.")
                    .openOn(this.map);
            });
    },

    displayMarkers: function(entreprises) {
        // Vider les anciens marqueurs
        this.markersLayer.clearLayers();

        if (!entreprises || entreprises.length === 0) {
            console.log('Aucune entreprise à afficher');
            return;
        }

        const lang = i18n.currentLang; // langue courante

        entreprises.forEach(entreprise => {
            // Sécurité : utiliser la langue demandée, sinon fallback espagnol, sinon première dispo
            let trads = entreprise[lang] || entreprise['es'] || Object.values(entreprise).find(v => v.nom) || {};
            
            const nom = trads.nom || 'Nom inconnu';
            const description = trads.description || '';
            const type = trads.type || '';

            // Création du marqueur
            const marker = L.marker([entreprise.lat, entreprise.lng]);
            
            // Popup
            marker.bindPopup(`
                <b>${nom}</b><br>
                ${description}<br>
                <small>${type}</small>
            `);

            this.markersLayer.addLayer(marker);
        });

        // Optionnel : ajuster le zoom pour voir tous les marqueurs
        if (this.markersLayer.getLayers().length > 0) {
            const group = L.featureGroup(this.markersLayer.getLayers());
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }
};