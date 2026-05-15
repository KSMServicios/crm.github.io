# 📻 CRM WEB Radio PWA — Multi-Skin & Global Directory

Una aplicación web progresiva (PWA) de radio en vivo de última generación (State of the Art), construida con una arquitectura modular Vanilla JavaScript (ES6+), empaquetada con Vite y maquetada bajo estrictos estándares BEM y Clean HTML.

---

## ✨ Características Principales (State of the Art)

*   **🎨 Motor Multi-Skin Dinámico:** Cambio de identidad visual en tiempo real sin recargar la página ni alterar el HTML. Cuatro temas de diseño premium configurados mediante variables nativas CSS en `variables.css`:
    *   `Hi-Fi Audio`: Skeuomorfismo profesional estilo deck estéreo con texturas metálicas.
    *   `Bento Grid`: Modernismo minimalista basado en tarjetas modulares.
    *   `Neo-Brutalism`: Diseño audaz, bordes sólidos y contrastes duros.
    *   `Cyber-Dark`: Estética terminal hacker con brillos de neón.
*   **🌍 Motor de Búsqueda Mundial (Radio Browser API):** Sintoniza más de 40,000 emisoras de todo el planeta. Incluye filtrado instantáneo por país (`Argentina`, `México`, `España`, `Mundo`, etc.) y persistencia automática de radios favoritas en `localStorage`.
*   **🎧 Integración MediaSession API:** Control nativo desde el sistema operativo (Windows 11, iOS, Android). Muestra carátula, título de la emisora y soporta botones físicos multimedia de teclado y auriculares.
*   **📶 Resiliencia PWA Avanzada:** Service Worker (`sw.js`) con estrategias inteligentes de `Network-First` para el listado de emisoras y `Stale-While-Revalidate` para recursos estáticos, garantizando carga instantánea y funcionamiento offline.
*   **🔊 Controles Hi-Fi Completos:** Potenciómetro horizontal de volumen suave, mute rápido y visualizador VFD animado de 12 barras con estados inteligentes de `Buffering` y `Error de Conexión`.

---

## 🏗️ Arquitectura y Metodología

El proyecto cumple estrictamente con las reglas globales de desarrollo:

1.  **Cero Tailwind / Utility Classes:** Todo el estilizado se realiza mediante CSS modular y semántico.
2.  **Metodología BEM (Block Element Modifier):** Nomenclatura rigurosa (`.player`, `.player__controls`, `.player__button--play`).
3.  **Clean HTML:** El archivo `index.html` actúa únicamente como esqueleto semántico (`#header-root`, `#player-root`, `#sidebar-root`). Todo el DOM interactivo es montado y gestionado de forma autónoma por los componentes JavaScript.

```text
CRM.GITHUB.IO-main/
├── .github/workflows/
│   └── deploy.yml            # Automatización CI/CD para GitHub Pages
├── public/
│   ├── manifest.json         # Manifiesto PWA
│   └── img/                  # Logotipos y carátulas
├── src/
│   ├── components/
│   │   ├── Footer/           # PWA Prompt & Copyright
│   │   ├── Player/           # Deck estéreo, VFD, Volumen y MediaSession
│   │   ├── Sidebar/          # Búsqueda mundial, Filtro de país y Listado
│   │   └── ThemeSwitcher/    # Motor Multi-Skin y localStorage
│   ├── data/
│   │   └── stations.json     # Base de datos de emisoras locales
│   ├── styles/
│   │   ├── main.css          # Reset, Layout y Grid Responsivo
│   │   └── variables.css     # Core Design System (Paletas Multi-Skin)
│   └── main.js               # Orquestador y comunicación de componentes
├── index.html                # Clean HTML Root
├── sw.js                     # Service Worker PWA Avanzado
├── vite.config.js            # Configuración de empaquetado Vite
└── package.json              # Dependencias y scripts
```

---

## 🚀 Despliegue Automatizado en GitHub Pages (CI/CD)

El proyecto está configurado con **GitHub Actions** para que el despliegue a producción sea 100% automático y no requiera compilar nada manualmente en tu terminal.

### Instrucciones de Activación (1 Solo Clic en GitHub):

1.  Sube tu proyecto a GitHub (`git push`).
2.  En la página de tu repositorio en **GitHub.com**, ve a la pestaña **Settings** (Configuración).
3.  En el menú lateral izquierdo, haz clic en **Pages** (Páginas).
4.  Bajo la sección **Build and deployment**, busca la opción **Source** (Fuente).
5.  Haz clic en el menú desplegable y cambia de *Deploy from a branch* a **GitHub Actions**.

¡Listo! A partir de ese momento, cada vez que hagas `git push` a la rama `main`, los servidores de GitHub compilarán el proyecto usando Vite y publicarán la versión super-optimizada en menos de un minuto.

---

## 💻 Desarrollo Local

Para probar o modificar la aplicación en tu máquina local:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en vivo (Vite)
npm run dev

# Compilar versión de producción localmente (Opcional)
npm run build
```
