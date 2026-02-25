// ================================
// TELEGRAM BOT CONTACT POUR DIREPRO
// ================================

class TelegramContact {
    constructor() {
        // ⚠️ Remplace ces valeurs par celles de ton bot Telegram
        this.botToken = '8684941593:AAGG77801s3v3ptpa-_6rLV6p5fBpU4MTv8';
        this.chatId = '6051665667';
        this.apiUrl = `https://api.telegram.org/bot${this.botToken}`;
    }

    /**
     * Envoi d'un message de contact
     */
    async sendContactMessage(name, email, subject, message, lang) {
        const date = new Date().toLocaleString('fr-FR');
        
        const text = `
📩 <b>NOUVEAU MESSAGE DE CONTACT</b>

📅 <b>Date:</b> ${date}
🌐 <b>Langue:</b> ${lang}
👤 <b>Nom:</b> ${name}
📧 <b>Email:</b> ${email}
📝 <b>Sujet:</b> ${subject}

💬 <b>Message:</b>
${message}

---
Répondre à: ${email}
        `.trim();

        try {
            const response = await fetch(`${this.apiUrl}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: text,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                console.log('✅ Message Telegram envoyé');
                return true;
            } else {
                console.error('❌ Erreur Telegram:', await response.text());
                return false;
            }
        } catch (error) {
            console.error('💥 Erreur réseau:', error);
            return false;
        }
    }

    async sendCustomMessage(text) {
        try {
            const response = await fetch(`${this.apiUrl}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: text,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                console.log('✅ Message Telegram envoyé');
                return true;
            } else {
                console.error('❌ Erreur Telegram:', await response.text());
                return false;
            }
        } catch (error) {
            console.error('💥 Erreur réseau:', error);
            return false;
        }
    }
}

// Instance globale
window.telegramContact = new TelegramContact();

console.log('🤖 Telegram Contact chargé pour DIREPRO');