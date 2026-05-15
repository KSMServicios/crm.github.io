import styles from './Player.module.css';

export class Player {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.audio = null;
    this.currentStation = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.currentVolume = 0.8;
    this.init();
  }

  init() {
    this.render();
    this.audio = this.container.querySelector('audio');
    this.audio.volume = this.currentVolume;
    this.attachEvents();
    this.setupMediaSession();
  }

  setStation(station) {
    this.currentStation = station;
    this.audio.src = station.url;
    this.updateUI();
    this.play();
  }

  play() {
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.container.querySelector(`.${styles.player}`).classList.add(styles['player--playing']);
      this.updatePlayButton();
      this.updateMediaSession();
    }).catch(err => console.error("Error playing audio:", err));
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.container.querySelector(`.${styles.player}`).classList.remove(styles['player--playing']);
    this.updatePlayButton();
  }

  togglePlay() {
    if (this.isPlaying) this.pause();
    else this.play();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    const muteBtn = this.container.querySelector(`.${styles['player__volume-btn']}`);
    muteBtn.innerHTML = this.isMuted ? '&#128263;' : '&#128266;'; // Mute / Volume High icons
  }

  setVolume(value) {
    this.currentVolume = parseFloat(value);
    this.audio.volume = this.currentVolume;
    if (this.isMuted && this.currentVolume > 0) {
      this.toggleMute();
    }
  }

  updateUI() {
    const title = this.container.querySelector(`.${styles.player__title}`);
    const logo = this.container.querySelector(`.${styles.player__logo}`);
    
    title.textContent = this.currentStation.name;
    title.title = this.currentStation.name;
    logo.src = this.currentStation.image;
    logo.alt = this.currentStation.name;
    this.updateMediaSession();
  }

  updatePlayButton() {
    const btn = this.container.querySelector(`.${styles['player__button--play']}`);
    btn.innerHTML = this.isPlaying ? '&#10074;&#10074;' : '&#9654;'; // Icons for Pause and Play
  }

  setupMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (this.options.onPrev) this.options.onPrev();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (this.options.onNext) this.options.onNext();
      });
    }
  }

  updateMediaSession() {
    if ('mediaSession' in navigator && this.currentStation) {
      // Absolutize image url for MediaSession API
      const absLogoUrl = new URL(this.currentStation.image, window.location.href).href;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.currentStation.name,
        artist: 'CRM WEB Radio',
        album: 'Live Stream',
        artwork: [
          { src: absLogoUrl, sizes: '192x192', type: 'image/png' },
          { src: absLogoUrl, sizes: '512x512', type: 'image/png' }
        ]
      });
    }
  }

  render() {
    this.container.innerHTML = `
      <section class="${styles.player}">
        <div class="${styles.player__cover}">
          <div class="${styles['player__logo-wrapper']}">
            <img class="${styles.player__logo}" src="img/df.png" alt="Select station">
          </div>
        </div>
        
        <div class="${styles.player__meta}">
          <div class="${styles.player__info}">
            <span class="${styles.player__label}">Estás escuchando:</span>
            <h2 class="${styles.player__title}">SELECCIONA ESTACION</h2>
          </div>
          
          <div class="${styles.player__visualizer}">
            ${Array(12).fill('<div class="' + styles.visualizer__bar + '"></div>').join('')}
          </div>

          <div class="${styles.player__controls}">
            <button class="${styles.player__button} ${styles['player__button--prev']}" title="Anterior">&#10226;</button>
            <button class="${styles.player__button} ${styles['player__button--play']}" title="Reproducir/Pausar">&#9654;</button>
            <button class="${styles.player__button} ${styles['player__button--next']}" title="Siguiente">&#10227;</button>
          </div>

          <div class="${styles['player__volume-wrapper']}">
            <button class="${styles['player__volume-btn']}" title="Silenciar/Activar">&#128266;</button>
            <input type="range" class="${styles['player__volume-slider']}" min="0" max="1" step="0.01" value="${this.currentVolume}" aria-label="Volumen">
          </div>
        </div>

        <audio class="${styles.player__audio}"></audio>
      </section>
    `;
  }

  attachEvents() {
    const playBtn = this.container.querySelector(`.${styles['player__button--play']}`);
    const prevBtn = this.container.querySelector(`.${styles['player__button--prev']}`);
    const nextBtn = this.container.querySelector(`.${styles['player__button--next']}`);
    const muteBtn = this.container.querySelector(`.${styles['player__volume-btn']}`);
    const volumeSlider = this.container.querySelector(`.${styles['player__volume-slider']}`);
    const playerEl = this.container.querySelector(`.${styles.player}`);
    const titleEl = this.container.querySelector(`.${styles.player__title}`);

    playBtn.addEventListener('click', () => this.togglePlay());
    muteBtn.addEventListener('click', () => this.toggleMute());
    volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.options.onPrev) this.options.onPrev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.options.onNext) this.options.onNext();
      });
    }

    // --- BUFFERING & ERROR HANDLING ---
    const startBuffering = () => {
      playerEl.classList.add(styles['player--buffering']);
      playerEl.classList.remove(styles['player--error']);
    };

    const stopBuffering = () => {
      playerEl.classList.remove(styles['player--buffering']);
    };

    this.audio.addEventListener('waiting', startBuffering);
    this.audio.addEventListener('stalled', startBuffering);
    this.audio.addEventListener('loadstart', startBuffering);
    
    this.audio.addEventListener('canplay', stopBuffering);
    
    this.audio.addEventListener('playing', () => {
      stopBuffering();
      playerEl.classList.remove(styles['player--error']);
      this.isPlaying = true;
      playerEl.classList.add(styles['player--playing']);
      this.updatePlayButton();
      if (this.currentStation) {
        titleEl.textContent = this.currentStation.name;
      }
    });

    this.audio.addEventListener('error', (e) => {
      stopBuffering();
      this.isPlaying = false;
      playerEl.classList.remove(styles['player--playing']);
      playerEl.classList.add(styles['player--error']);
      titleEl.textContent = "ERROR DE CONEXIÓN";
      this.updatePlayButton();
      console.error("Audio stream error:", e);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      playerEl.classList.remove(styles['player--playing']);
      this.updatePlayButton();
    });
  }
}
