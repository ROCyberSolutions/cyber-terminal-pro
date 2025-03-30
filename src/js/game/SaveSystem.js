export class SaveSystem {
  static SAVE_KEY = 'cyberTerminalProSave';

  static saveGame() {
    const saveData = {
      timestamp: new Date().toISOString(),
      version: '2.0.1',
      gameState: gameEngine.getState()
    };
    
    try {
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
      return true;
    } catch (e) {
      console.error('Save failed:', e);
      return false;
    }
  }

  static loadGame() {
    const saveData = localStorage.getItem(this.SAVE_KEY);
    if (!saveData) return false;

    try {
      const parsed = JSON.parse(saveData);
      if (parsed.version !== '2.0.1') {
        console.warn('Save version mismatch');
        return false;
      }

      gameEngine.state = parsed.gameState;
      return true;
    } catch (e) {
      console.error('Load failed:', e);
      return false;
    }
  }

  static deleteSave() {
    localStorage.removeItem(this.SAVE_KEY);
  }

  static exportSave() {
    return localStorage.getItem(this.SAVE_KEY);
  }

  static importSave(data) {
    try {
      const parsed = JSON.parse(data);
      if (parsed.version === '2.0.1') {
        localStorage.setItem(this.SAVE_KEY, data);
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  }
}