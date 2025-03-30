import { Terminal } from './js/core/Terminal.js';
import { gameEngine } from './js/core/GameEngine.js';
import { InterfaceManager } from './js/modules/gui/InterfaceManager.js';
import { SaveSystem } from './js/modules/game/SaveSystem.js';
import { AudioManager } from './js/modules/game/AudioManager.js';

// Initialize core systems
const interfaceManager = new InterfaceManager();
const terminal = new Terminal();

// Load game state
if (SaveSystem.loadGame()) {
  terminal.print('[SYSTEM] Game progress loaded successfully', 'system');
} else {
  terminal.print('[SYSTEM] New game session started', 'system');
}

// Welcome message
terminal.print(`
  ██████╗██╗   ██╗██████╗ ███████╗██████╗ 
 ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
 ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝
 ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗
 ╚██████╗   ██║   ██████╔╝███████╗██║  ██║
  ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝
  
  TYPE 'help' TO BEGIN YOUR CYBER JOURNEY
`, 'welcome');

// Setup auto-save
window.addEventListener('beforeunload', () => {
  SaveSystem.saveGame();
  terminal.print('[SYSTEM] Game progress saved', 'system');
});

// Focus input on start
document.getElementById('terminal-input').focus();