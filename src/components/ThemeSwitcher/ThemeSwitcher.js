import styles from './ThemeSwitcher.module.css';

export class ThemeSwitcher {
  constructor(container) {
    this.container = container;
    this.themes = [
      { id: 'hifi', label: 'Hi-Fi Audio' },
      { id: 'bento', label: 'Bento Grid' },
      { id: 'brutal', label: 'Neo-Brutalism' },
      { id: 'cyber', label: 'Cyber-Dark' }
    ];
    this.currentTheme = localStorage.getItem('crm_theme') || 'hifi';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.render();
    this.attachEvents();
  }

  applyTheme(themeId) {
    document.body.setAttribute('data-theme', themeId);
    localStorage.setItem('crm_theme', themeId);
    this.currentTheme = themeId;
  }

  render() {
    const buttonsHtml = this.themes.map(theme => `
      <button 
        class="${styles.switcher__button} ${theme.id === this.currentTheme ? styles['switcher__button--active'] : ''}" 
        data-theme-target="${theme.id}"
      >
        ${theme.label}
      </button>
    `).join('');

    this.container.innerHTML = `
      <header class="${styles.switcher}">
        <div class="${styles.switcher__brand}">
          <h1 class="${styles.switcher__title}">CRM WEB</h1>
        </div>
        <div class="${styles.switcher__controls}">
          ${buttonsHtml}
        </div>
      </header>
    `;
  }

  attachEvents() {
    const buttons = this.container.querySelectorAll('[data-theme-target]');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const themeId = e.target.getAttribute('data-theme-target');
        this.applyTheme(themeId);
        
        // Actualizar UI activa
        buttons.forEach(btn => btn.classList.remove(styles['switcher__button--active']));
        e.target.classList.add(styles['switcher__button--active']);
      });
    });
  }
}
