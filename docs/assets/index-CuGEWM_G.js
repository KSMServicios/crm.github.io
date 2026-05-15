(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const y="_switcher_1tfm0_1",m="_switcher__brand_1tfm0_14",g="_switcher__title_1tfm0_20",b="_switcher__controls_1tfm0_29",v="_switcher__button_1tfm0_38",_={switcher:y,switcher__brand:m,switcher__title:g,switcher__controls:b,switcher__button:v,"switcher__button--active":"_switcher__button--active_1tfm0_53"};class f{constructor(t){this.container=t,this.themes=[{id:"hifi",label:"Hi-Fi Audio"},{id:"bento",label:"Bento Grid"},{id:"brutal",label:"Neo-Brutalism"},{id:"cyber",label:"Cyber-Dark"}],this.currentTheme=localStorage.getItem("crm_theme")||"hifi",this.init()}init(){this.applyTheme(this.currentTheme),this.render(),this.attachEvents()}applyTheme(t){document.body.setAttribute("data-theme",t),localStorage.setItem("crm_theme",t),this.currentTheme=t}render(){const t=this.themes.map(e=>`
      <button 
        class="${_.switcher__button} ${e.id===this.currentTheme?_["switcher__button--active"]:""}" 
        data-theme-target="${e.id}"
      >
        ${e.label}
      </button>
    `).join("");this.container.innerHTML=`
      <header class="${_.switcher}">
        <div class="${_.switcher__brand}">
          <h1 class="${_.switcher__title}">CRM WEB</h1>
        </div>
        <div class="${_.switcher__controls}">
          ${t}
        </div>
      </header>
    `}attachEvents(){const t=this.container.querySelectorAll("[data-theme-target]");t.forEach(e=>{e.addEventListener("click",r=>{const s=r.target.getAttribute("data-theme-target");this.applyTheme(s),t.forEach(o=>o.classList.remove(_["switcher__button--active"])),r.target.classList.add(_["switcher__button--active"])})})}}const S="_player_1rahy_1",$="_player__cover_1rahy_27",w="_player__meta_1rahy_34",L="_player__logo_1rahy_49",q="_player__info_1rahy_75",E="_player__label_1rahy_86",x="_player__title_1rahy_93",P="_player__visualizer_1rahy_106",B="_visualizer__bar_1rahy_123",I="_player__controls_1rahy_155",M="_player__button_1rahy_170",C="_player__audio_1rahy_219",i={player:S,player__cover:$,player__meta:w,"player__logo-wrapper":"_player__logo-wrapper_1rahy_49",player__logo:L,"player--playing":"_player--playing_1rahy_71",player__info:q,player__label:E,player__title:x,player__visualizer:P,visualizer__bar:B,player__controls:I,player__button:M,"player__button--play":"_player__button--play_1rahy_203",player__audio:C,"player--buffering":"_player--buffering_1rahy_224","player--error":"_player--error_1rahy_235","player__volume-wrapper":"_player__volume-wrapper_1rahy_248","player__volume-btn":"_player__volume-btn_1rahy_257","player__volume-slider":"_player__volume-slider_1rahy_273"};class T{constructor(t,e={}){this.container=t,this.options=e,this.audio=null,this.currentStation=null,this.isPlaying=!1,this.isMuted=!1,this.currentVolume=.8,this.init()}init(){this.render(),this.audio=this.container.querySelector("audio"),this.audio.volume=this.currentVolume,this.attachEvents(),this.setupMediaSession()}setStation(t){this.currentStation=t,this.audio.src=t.url,this.updateUI(),this.play()}play(){this.audio.play().then(()=>{this.isPlaying=!0,this.container.querySelector(`.${i.player}`).classList.add(i["player--playing"]),this.updatePlayButton(),this.updateMediaSession()}).catch(t=>console.error("Error playing audio:",t))}pause(){this.audio.pause(),this.isPlaying=!1,this.container.querySelector(`.${i.player}`).classList.remove(i["player--playing"]),this.updatePlayButton()}togglePlay(){this.isPlaying?this.pause():this.play()}toggleMute(){this.isMuted=!this.isMuted,this.audio.muted=this.isMuted;const t=this.container.querySelector(`.${i["player__volume-btn"]}`);t.innerHTML=this.isMuted?"&#128263;":"&#128266;"}setVolume(t){this.currentVolume=parseFloat(t),this.audio.volume=this.currentVolume,this.isMuted&&this.currentVolume>0&&this.toggleMute()}updateUI(){const t=this.container.querySelector(`.${i.player__title}`),e=this.container.querySelector(`.${i.player__logo}`);t.textContent=this.currentStation.name,t.title=this.currentStation.name,e.src=this.currentStation.image,e.alt=this.currentStation.name,this.updateMediaSession()}updatePlayButton(){const t=this.container.querySelector(`.${i["player__button--play"]}`);t.innerHTML=this.isPlaying?"&#10074;&#10074;":"&#9654;"}setupMediaSession(){"mediaSession"in navigator&&(navigator.mediaSession.setActionHandler("play",()=>this.play()),navigator.mediaSession.setActionHandler("pause",()=>this.pause()),navigator.mediaSession.setActionHandler("previoustrack",()=>{this.options.onPrev&&this.options.onPrev()}),navigator.mediaSession.setActionHandler("nexttrack",()=>{this.options.onNext&&this.options.onNext()}))}updateMediaSession(){if("mediaSession"in navigator&&this.currentStation){const t=new URL(this.currentStation.image,window.location.href).href;navigator.mediaSession.metadata=new MediaMetadata({title:this.currentStation.name,artist:"CRM WEB Radio",album:"Live Stream",artwork:[{src:t,sizes:"192x192",type:"image/png"},{src:t,sizes:"512x512",type:"image/png"}]})}}render(){this.container.innerHTML=`
      <section class="${i.player}">
        <div class="${i.player__cover}">
          <div class="${i["player__logo-wrapper"]}">
            <img class="${i.player__logo}" src="img/df.png" alt="Select station">
          </div>
        </div>
        
        <div class="${i.player__meta}">
          <div class="${i.player__info}">
            <span class="${i.player__label}">Estás escuchando:</span>
            <h2 class="${i.player__title}">SELECCIONA ESTACION</h2>
          </div>
          
          <div class="${i.player__visualizer}">
            ${Array(12).fill('<div class="'+i.visualizer__bar+'"></div>').join("")}
          </div>

          <div class="${i.player__controls}">
            <button class="${i.player__button} ${i["player__button--prev"]}" title="Anterior">&#10226;</button>
            <button class="${i.player__button} ${i["player__button--play"]}" title="Reproducir/Pausar">&#9654;</button>
            <button class="${i.player__button} ${i["player__button--next"]}" title="Siguiente">&#10227;</button>
          </div>

          <div class="${i["player__volume-wrapper"]}">
            <button class="${i["player__volume-btn"]}" title="Silenciar/Activar">&#128266;</button>
            <input type="range" class="${i["player__volume-slider"]}" min="0" max="1" step="0.01" value="${this.currentVolume}" aria-label="Volumen">
          </div>
        </div>

        <audio class="${i.player__audio}"></audio>
      </section>
    `}attachEvents(){const t=this.container.querySelector(`.${i["player__button--play"]}`),e=this.container.querySelector(`.${i["player__button--prev"]}`),r=this.container.querySelector(`.${i["player__button--next"]}`),s=this.container.querySelector(`.${i["player__volume-btn"]}`),o=this.container.querySelector(`.${i["player__volume-slider"]}`),a=this.container.querySelector(`.${i.player}`),l=this.container.querySelector(`.${i.player__title}`);t.addEventListener("click",()=>this.togglePlay()),s.addEventListener("click",()=>this.toggleMute()),o.addEventListener("input",p=>this.setVolume(p.target.value)),e&&e.addEventListener("click",()=>{this.options.onPrev&&this.options.onPrev()}),r&&r.addEventListener("click",()=>{this.options.onNext&&this.options.onNext()});const c=()=>{a.classList.add(i["player--buffering"]),a.classList.remove(i["player--error"])},h=()=>{a.classList.remove(i["player--buffering"])};this.audio.addEventListener("waiting",c),this.audio.addEventListener("stalled",c),this.audio.addEventListener("loadstart",c),this.audio.addEventListener("canplay",h),this.audio.addEventListener("playing",()=>{h(),a.classList.remove(i["player--error"]),this.isPlaying=!0,a.classList.add(i["player--playing"]),this.updatePlayButton(),this.currentStation&&(l.textContent=this.currentStation.name)}),this.audio.addEventListener("error",p=>{h(),this.isPlaying=!1,a.classList.remove(i["player--playing"]),a.classList.add(i["player--error"]),l.textContent="ERROR DE CONEXIÓN",this.updatePlayButton(),console.error("Audio stream error:",p)}),this.audio.addEventListener("ended",()=>{this.isPlaying=!1,a.classList.remove(i["player--playing"]),this.updatePlayButton()})}}const A="_sidebar_nq9qn_1",N="_sidebar__header_nq9qn_15",H="_sidebar__title_nq9qn_21",R="_sidebar__search_nq9qn_28",k="_sidebar__list_nq9qn_45",z="_badge_nq9qn_143",n={sidebar:A,sidebar__header:N,sidebar__title:H,sidebar__search:R,sidebar__list:k,"station-card":"_station-card_nq9qn_63","station-card--active":"_station-card--active_nq9qn_81","station-card__img-wrapper":"_station-card__img-wrapper_nq9qn_87","station-card__img":"_station-card__img_nq9qn_87","station-card__info":"_station-card__info_nq9qn_102","station-card__name":"_station-card__name_nq9qn_107","station-card__meta":"_station-card__meta_nq9qn_116","sidebar__global-btn":"_sidebar__global-btn_nq9qn_122",badge:z,"badge--custom":"_badge--custom_nq9qn_153","badge--global":"_badge--global_nq9qn_158","sidebar__search-group":"_sidebar__search-group_nq9qn_164","sidebar__country-select":"_sidebar__country-select_nq9qn_174"};class O{constructor(t,e){this.container=t,this.onStationSelect=e,this.stations=[],this.filteredStations=[],this.currentIndex=0,this.currentQuery="",this.currentCountry="",this.init()}async init(){try{const e=await(await fetch("./stations.json")).json(),r=JSON.parse(localStorage.getItem("crm_custom_stations"))||[];this.stations=[...e,...r],this.filteredStations=[...this.stations],this.render(),this.attachEvents()}catch(t){console.error("Error loading stations:",t)}}selectNext(){if(!this.filteredStations.length)return;const t=(this.currentIndex+1)%this.filteredStations.length;this.selectStationByIndex(t)}selectPrev(){if(!this.filteredStations.length)return;const t=(this.currentIndex-1+this.filteredStations.length)%this.filteredStations.length;this.selectStationByIndex(t)}selectStationByIndex(t){if(t<0||t>=this.filteredStations.length)return;this.currentIndex=t;const e=this.filteredStations[t];this.container.querySelectorAll(`.${n["station-card"]}`).forEach(s=>s.classList.remove(n["station-card--active"]));const r=this.container.querySelector(`[data-station-id="${e.id}"]`);r&&(r.classList.add(n["station-card--active"]),r.scrollIntoView({behavior:"smooth",block:"nearest"})),this.onStationSelect(e)}renderList(t=!1){const e=this.container.querySelector(`.${n.sidebar__list}`),r=this.container.querySelector(`.${n.sidebar__count}`);if(!e)return;if(r&&(r.textContent=this.filteredStations.length),t){e.innerHTML='<p style="text-align:center; color:var(--text-muted); padding:var(--spacing-md) 0;">🌐 Buscando en el directorio mundial...</p>';return}let s="";if(this.filteredStations.length?s=this.filteredStations.map(a=>`
        <div class="${n["station-card"]}" data-station-id="${a.id}">
          <div class="${n["station-card__img-wrapper"]}">
            <img class="${n["station-card__img"]}" src="${a.image}" alt="${a.name}" onerror="this.src='img/df.png'">
          </div>
          <div class="${n["station-card__info"]}">
            <h3 class="${n["station-card__name"]}">${a.name}</h3>
            <span class="${n["station-card__meta"]}">
              Streaming Live ${a.isCustom?'<span class="'+n.badge+" "+n["badge--custom"]+'">Guardada</span>':""}
              ${a.isGlobal?'<span class="'+n.badge+" "+n["badge--global"]+'">Mundial</span>':""}
            </span>
          </div>
        </div>
      `).join(""):s='<p style="text-align:center; color:var(--text-muted); padding:var(--spacing-md) 0;">No se encontraron emisoras locales</p>',this.currentQuery.length>=3&&!this.filteredStations.some(a=>a.isGlobal)){const a=this.currentCountry?`en ${this.currentCountry}`:"en todo el mundo";s+=`
        <button class="${n["sidebar__global-btn"]}" id="globalSearchBtn">
          🌐 Buscar "${this.currentQuery}" ${a}
        </button>
      `}e.innerHTML=s;const o=e.querySelector("#globalSearchBtn");o&&o.addEventListener("click",()=>this.searchGlobalStations(this.currentQuery,this.currentCountry))}async searchGlobalStations(t,e=""){this.renderList(!0);try{let r=`https://de1.api.radio-browser.info/json/stations/search?name=${encodeURIComponent(t)}&limit=15&hidebroken=true`;e&&(r+=`&country=${encodeURIComponent(e)}`);const o=await(await fetch(r)).json();if(!o.length){const l=this.container.querySelector(`.${n.sidebar__list}`),c=e?` en ${e}`:"";l.innerHTML=`<p style="text-align:center; color:var(--text-muted); padding:var(--spacing-md) 0;">No se encontraron radios para "${t}"${c}</p>`;return}const a=o.map(l=>({id:l.stationuuid,name:l.name.trim(),url:l.url_resolved,image:l.favicon||"img/df.png",isGlobal:!0,isCustom:!1}));this.filteredStations=a,this.currentIndex=0,this.renderList()}catch(r){console.error("Error fetching global stations:",r);const s=this.container.querySelector(`.${n.sidebar__list}`);s.innerHTML='<p style="text-align:center; color:#ff3333; padding:var(--spacing-md) 0;">Error al conectar con el directorio mundial</p>'}}addCustomStation(t){const e=this.stations.find(r=>r.url===t.url||r.id===t.id);if(!e){const r={id:Date.now(),name:t.name,url:t.url,image:t.image,isCustom:!0};this.stations.push(r);const s=this.stations.filter(o=>o.isCustom);return localStorage.setItem("crm_custom_stations",JSON.stringify(s)),r}return e}render(){this.container.innerHTML=`
      <aside class="${n.sidebar}">
        <div class="${n.sidebar__header}">
          <h2 class="${n.sidebar__title}">Emisoras</h2>
          <span class="${n.sidebar__count}">${this.stations.length}</span>
        </div>
        <div class="${n["sidebar__search-group"]}">
          <input type="search" class="${n.sidebar__search}" placeholder="Buscar radio..." aria-label="Buscar emisora">
          <select class="${n["sidebar__country-select"]}" aria-label="Seleccionar país">
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
        <div class="${n.sidebar__list}"></div>
      </aside>
    `,this.renderList()}attachEvents(){const t=this.container.querySelector(`.${n.sidebar__search}`),e=this.container.querySelector(`.${n["sidebar__country-select"]}`);t.addEventListener("input",r=>{this.currentQuery=r.target.value.toLowerCase().trim(),this.currentQuery?this.filteredStations=this.stations.filter(s=>s.name.toLowerCase().includes(this.currentQuery)):this.filteredStations=[...this.stations],this.currentIndex=0,this.renderList()}),e.addEventListener("change",r=>{this.currentCountry=r.target.value,this.renderList()}),this.container.addEventListener("click",r=>{const s=r.target.closest(`.${n["station-card"]}`);if(s){const o=s.dataset.stationId;let a=this.filteredStations.find(l=>l.id.toString()===o.toString());if(a&&a.isGlobal){a=this.addCustomStation(a),this.filteredStations=[...this.stations];const l=this.filteredStations.findIndex(c=>c.id===a.id);t.value="",this.currentQuery="",this.selectStationByIndex(l)}else if(a){const l=this.filteredStations.findIndex(c=>c.id.toString()===o.toString());this.selectStationByIndex(l)}}})}}const U="_footer_x780c_1",V="_footer__brand_x780c_13",j="_footer__logo_x780c_19",G="_footer__copyright_x780c_26",u={footer:U,footer__brand:V,footer__logo:j,footer__copyright:G,"footer__pwa-btn":"_footer__pwa-btn_x780c_31"};class Q{constructor(t){this.container=t,this.deferredPrompt=null,this.init()}init(){this.render(),this.attachPwaEvents()}render(){this.container.innerHTML=`
      <footer class="${u.footer}">
        <div class="${u.footer__brand}">
          <img class="${u.footer__logo}" src="img/ksm.png" alt="KSM Servicios">
          <p class="${u.footer__copyright}">&copy; 2026 KSM Servicios. Todos los derechos reservados.</p>
        </div>
        <button class="${u["footer__pwa-btn"]}" id="installPwaBtn">Instalar App</button>
      </footer>
    `}attachPwaEvents(){const t=this.container.querySelector("#installPwaBtn");window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),this.deferredPrompt=e,t.style.display="block"}),t.addEventListener("click",async()=>{if(this.deferredPrompt){this.deferredPrompt.prompt();const{outcome:e}=await this.deferredPrompt.userChoice;console.log(`User response to install prompt: ${e}`),this.deferredPrompt=null,t.style.display="none"}}),"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(e=>console.log("SW registered!",e)).catch(e=>console.error("SW registration failed:",e))}}document.addEventListener("DOMContentLoaded",()=>{const d=document.getElementById("header-root");new f(d);const t=document.getElementById("player-root"),e=document.getElementById("sidebar-root");let r=null;const s=new T(t,{onPrev:()=>r&&r.selectPrev(),onNext:()=>r&&r.selectNext()});r=new O(e,a=>{s.setStation(a)});const o=document.getElementById("footer-root");new Q(o)});
