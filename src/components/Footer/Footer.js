import styles from './Footer.module.css';

export class Footer {
  constructor(container) {
    this.container = container;
    this.deferredPrompt = null;
    this.init();
  }

  init() {
    this.render();
    this.attachPwaEvents();
  }

  render() {
    this.container.innerHTML = `
      <footer class="${styles.footer}">
        <div class="${styles.footer__brand}">
          <img class="${styles.footer__logo}" src="img/ksm.png" alt="KSM Servicios">
          <p class="${styles.footer__copyright}">&copy; 2026 KSM Servicios. Todos los derechos reservados.</p>
        </div>
        <button class="${styles['footer__pwa-btn']}" id="installPwaBtn">Instalar App</button>
      </footer>
    `;
  }

  attachPwaEvents() {
    const installBtn = this.container.querySelector('#installPwaBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      installBtn.style.display = 'block';
    });

    installBtn.addEventListener('click', async () => {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        this.deferredPrompt = null;
        installBtn.style.display = 'none';
      }
    });

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered!', reg))
        .catch(err => console.error('SW registration failed:', err));
    }
  }
}
