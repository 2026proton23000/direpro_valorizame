const entreprise = {
    init: function() {
        this.initForm();
    },

    initForm: function() {
        const form = document.getElementById('entreprise-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || 'Non renseigné',
                waste_type: formData.get('waste_type'),
                message: formData.get('message') || 'Pas de message',
                lang: i18n.currentLang
            };

            const msgDiv = document.getElementById('entreprise-form-message');
            msgDiv.className = 'form-message';
            msgDiv.style.display = 'none';

            // Construire un message formaté pour Telegram
            const telegramText = `
📩 <b>NOUVELLE DEMANDE DE VISITE</b>

📅 <b>Date:</b> ${new Date().toLocaleString('fr-FR')}
🌐 <b>Langue:</b> ${data.lang}
👤 <b>Nom/Entreprise:</b> ${data.name}
📧 <b>Email:</b> ${data.email}
📞 <b>Téléphone:</b> ${data.phone}
🗑️ <b>Type de déchets:</b> ${data.waste_type}
💬 <b>Message:</b> ${data.message}

---
Répondre à: ${data.email}
            `.trim();

            // Utiliser l'instance TelegramContact
            const success = await window.telegramContact.sendCustomMessage(telegramText);

            if (success) {
                msgDiv.className = 'form-message success';
                msgDiv.innerHTML = i18n.t('entreprise.success') || 'Demande envoyée avec succès ! Nous vous contacterons rapidement.';
                form.reset();
            } else {
                msgDiv.className = 'form-message error';
                msgDiv.innerHTML = i18n.t('entreprise.error') || 'Erreur lors de l\'envoi. Veuillez réessayer.';
            }
            msgDiv.style.display = 'block';
        });
    }
};