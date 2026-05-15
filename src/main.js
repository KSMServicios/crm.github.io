import './styles/main.css';
import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher.js';
import { Player } from './components/Player/Player.js';
import { Sidebar } from './components/Sidebar/Sidebar.js';
import { Footer } from './components/Footer/Footer.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mount Theme Switcher
  const headerRoot = document.getElementById('header-root');
  new ThemeSwitcher(headerRoot);

  // 2. Mount Player & Sidebar with mutual navigation callbacks
  const playerRoot = document.getElementById('player-root');
  const sidebarRoot = document.getElementById('sidebar-root');
  
  let sidebarInstance = null;

  const player = new Player(playerRoot, {
    onPrev: () => sidebarInstance && sidebarInstance.selectPrev(),
    onNext: () => sidebarInstance && sidebarInstance.selectNext()
  });

  sidebarInstance = new Sidebar(sidebarRoot, (selectedStation) => {
    player.setStation(selectedStation);
  });

  // 3. Mount Footer (PWA & Copyright)
  const footerRoot = document.getElementById('footer-root');
  new Footer(footerRoot);
});
