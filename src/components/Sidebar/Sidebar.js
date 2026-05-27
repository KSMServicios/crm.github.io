import styles from './Sidebar.module.css';

export class Sidebar {
  constructor(container, onStationSelect) {
    this.container = container;
    this.onStationSelect = onStationSelect;
    this.stations = [];
    this.filteredStations = [];
    this.currentIndex = 0;
    this.currentQuery = "";
    this.currentCountry = "";
    this.init();
  }

  async init() {
    try {
      const response = await fetch('./stations.json');
      const defaultStations = await response.json();
      const customStations = JSON.parse(localStorage.getItem('crm_custom_stations')) || [];
      
      this.stations = [...defaultStations, ...customStations];
      this.filteredStations = [...this.stations];
      this.render();
      this.attachEvents();
    } catch (error) {
      console.error("Error loading stations:", error);
    }
  }

  selectNext() {
    if (!this.filteredStations.length) return;
    const nextIndex = (this.currentIndex + 1) % this.filteredStations.length;
    this.selectStationByIndex(nextIndex);
  }

  selectPrev() {
    if (!this.filteredStations.length) return;
    const prevIndex = (this.currentIndex - 1 + this.filteredStations.length) % this.filteredStations.length;
    this.selectStationByIndex(prevIndex);
  }

  selectStationByIndex(index) {
    if (index < 0 || index >= this.filteredStations.length) return;
    this.currentIndex = index;
    const station = this.filteredStations[index];

    // Mark active in DOM
    this.container.querySelectorAll(`.${styles['station-card']}`).forEach(c => 
      c.classList.remove(styles['station-card--active'])
    );
    
    const card = this.container.querySelector(`[data-station-id="${station.id}"]`);
    if (card) {
      card.classList.add(styles['station-card--active']);
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    this.onStationSelect(station);
  }

  renderList(isSearchingGlobal = false) {
    const listContainer = this.container.querySelector(`.${styles.sidebar__list}`);
    const countEl = this.container.querySelector(`.${styles.sidebar__count}`);
    if (!listContainer) return;

    if (countEl) {
      countEl.textContent = this.filteredStations.length;
    }

    if (isSearchingGlobal) {
      listContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:var(--spacing-md) 0;">🌐 Buscando en el directorio mundial...</p>`;
      return;
    }

    let html = "";

    if (!this.filteredStations.length) {
      html = `<p style="text-align:center; color:var(--text-muted); padding:var(--spacing-md) 0;">No se encontraron emisoras locales</p>`;
    } else {
      html = this.filteredStations.map(station => `
        <div class="${styles['station-card']}" data-station-id="${station.id}">
          <div class="${styles['station-card__img-wrapper']}">
            <img class="${styles['station-card__img']}" src="${station.image}" alt="${station.name}" onerror="this.src='img/df.png'">
          </div>
          <div class="${styles['station-card__info']}">
            <h3 class="${styles['station-card__name']}">${station.name}</h3>
            <span class="${styles['station-card__meta']}">
              Streaming Live ${station.isCustom ? '<span class="' + styles.badge + ' ' + styles['badge--custom'] + '">Guardada</span>' : ''}
              ${station.isGlobal ? '<span class="' + styles.badge + ' ' + styles['badge--global'] + '">Mundial</span>' : ''}
            </span>
          </div>
        </div>
      `).join('');
    }

    // Si hay una consulta escrita, ofrecer buscar en el mundo / país seleccionado
    if (this.currentQuery.length >= 3 && !this.filteredStations.some(s => s.isGlobal)) {
      const countryLabel = this.currentCountry ? `en ${this.currentCountry}` : "en todo el mundo";
      html += `
        <button class="${styles['sidebar__global-btn']}" id="globalSearchBtn">
          🌐 Buscar "${this.currentQuery}" ${countryLabel}
        </button>
      `;
    }

    listContainer.innerHTML = html;

    const globalBtn = listContainer.querySelector('#globalSearchBtn');
    if (globalBtn) {
      globalBtn.addEventListener('click', () => this.searchGlobalStations(this.currentQuery, this.currentCountry));
    }
  }

  async searchGlobalStations(query, country = "") {
    this.renderList(true);
    try {
      let apiUrl = `https://de1.api.radio-browser.info/json/stations/search?name=${encodeURIComponent(query)}&limit=15&hidebroken=true`;
      if (country) {
        apiUrl += `&country=${encodeURIComponent(country)}`;
      }
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!data.length) {
        const listContainer = this.container.querySelector(`.${styles.sidebar__list}`);
        const countryText = country ? ` en ${country}` : "";
        listContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:var(--spacing-md) 0;">No se encontraron radios para "${query}"${countryText}</p>`;
        return;
      }

      // Convertir resultados a formato interno
      const globalStations = data.map(item => ({
        id: item.stationuuid, // Usamos el UUID como ID
        name: item.name.trim(),
        url: item.url_resolved,
        image: item.favicon || "img/df.png",
        isGlobal: true,
        isCustom: false
      }));

      this.filteredStations = globalStations;
      this.currentIndex = 0;
      this.renderList();
    } catch (err) {
      console.error("Error fetching global stations:", err);
      const listContainer = this.container.querySelector(`.${styles.sidebar__list}`);
      listContainer.innerHTML = `<p style="text-align:center; color:#ff3333; padding:var(--spacing-md) 0;">Error al conectar con el directorio mundial</p>`;
    }
  }

  addCustomStation(station) {
    // Verificar si ya existe en la lista local por URL o ID
    const exists = this.stations.find(s => s.url === station.url || s.id === station.id);
    if (!exists) {
      const newStation = {
        id: Date.now(),
        name: station.name,
        url: station.url,
        image: station.image,
        isCustom: true
      };
      this.stations.push(newStation);

      // Guardar en localStorage
      const customStations = this.stations.filter(s => s.isCustom);
      localStorage.setItem('crm_custom_stations', JSON.stringify(customStations));
      
      return newStation;
    }
    return exists;
  }

  render() {
    this.container.innerHTML = `
      <aside class="${styles.sidebar}">
        <div class="${styles.sidebar__header}">
          <h2 class="${styles.sidebar__title}">Emisoras</h2>
          <span class="${styles.sidebar__count}">${this.stations.length}</span>
        </div>
        <div class="${styles['sidebar__search-group']}">
          <input type="search" class="${styles.sidebar__search}" placeholder="Buscar radio..." aria-label="Buscar emisora">
          <select class="${styles['sidebar__country-select']}" aria-label="Seleccionar país">
            <option value="">🌍 Mundo</option>
            <option value="Argentina">🇦🇷 Argentina</option>
            <option value="Uruguay">🇺🇾 Uruguay</option>
            <option value="Chile">🇨🇱 Chile</option>
            <option value="Colombia">🇨🇴 Colombia</option>
            <option value="Mexico">🇲🇽 México</option>
            <option value="Spain">🇪🇸 España</option>
            <option value="United States">🇺🇸 EE.UU.</option>
            <option value="Brazil">🇧🇷 Brasil</option>
            <option value="Peru">🇵🇪 Perú</option>
            <option value="Venezuela">🇻🇪 Venezuela</option>
            <option value="Paraguay">🇵🇾 Paraguay</option>
            <option value="Bolivia">🇧🇴 Bolivia</option>
          </select>
        </div>
        <div class="${styles.sidebar__list}"></div>
      </aside>
    `;
    this.renderList();
  }

  attachEvents() {
    const searchInput = this.container.querySelector(`.${styles.sidebar__search}`);
    const countrySelect = this.container.querySelector(`.${styles['sidebar__country-select']}`);
    
    searchInput.addEventListener('input', (e) => {
      this.currentQuery = e.target.value.toLowerCase().trim();
      if (!this.currentQuery) {
        this.filteredStations = [...this.stations];
      } else {
        this.filteredStations = this.stations.filter(station => 
          station.name.toLowerCase().includes(this.currentQuery)
        );
      }
      this.currentIndex = 0;
      this.renderList();
    });

    countrySelect.addEventListener('change', (e) => {
      this.currentCountry = e.target.value;
      this.renderList();
    });

    this.container.addEventListener('click', (e) => {
      const card = e.target.closest(`.${styles['station-card']}`);
      if (card) {
        const id = card.dataset.stationId;
        // Buscar en filteredStations (puede ser local o global)
        let station = this.filteredStations.find(s => s.id.toString() === id.toString());
        
        if (station && station.isGlobal) {
          // Si es mundial, la agregamos a las custom locales
          station = this.addCustomStation(station);
          // Restauramos la vista a las estaciones locales actualizadas
          this.filteredStations = [...this.stations];
          const newIndex = this.filteredStations.findIndex(s => s.id === station.id);
          searchInput.value = "";
          this.currentQuery = "";
          this.selectStationByIndex(newIndex);
        } else if (station) {
          const index = this.filteredStations.findIndex(s => s.id.toString() === id.toString());
          this.selectStationByIndex(index);
        }
      }
    });
  }
}
