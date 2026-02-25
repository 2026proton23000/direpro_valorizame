const contact = {
    init: function() {
        this.initMap();
        this.initForm();
    },

    initMap: function() {
        if (!document.getElementById('contact-map')) return;
        // Coordonnées du siège DIREPRO Tacna (approximatives)
        const lat = -18.0146;
        const lng = -70.2523;
        const map = L.map('contact-map').setView([lat, lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        L.marker([lat, lng]).addTo(map)
            .bindPopup('DIREPRO Tacna<br>Av. Manuel A. Odría N° 1245')
            .openPopup();
    },

    initForm: function() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                lang: i18n.currentLang
            };

            const msgDiv = document.getElementById('form-message');
            msgDiv.className = 'form-message';
            msgDiv.style.display = 'none';

            // Utiliser l'instance TelegramContact
            const success = await window.telegramContact.sendContactMessage(
                data.name,
                data.email,
                data.subject,
                data.message,
                data.lang
            );

            if (success) {
                msgDiv.className = 'form-message success';
                msgDiv.innerHTML = i18n.t('contact.success') || 'Message envoyé avec succès !';
                form.reset();
            } else {
                msgDiv.className = 'form-message error';
                msgDiv.innerHTML = i18n.t('contact.error') || 'Erreur lors de l\'envoi.';
            }
            msgDiv.style.display = 'block';
        });
    }
};