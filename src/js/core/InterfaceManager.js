export class InterfaceManager {
  constructor() {
    this.initHUD();
    this.setupThemeSwitcher();
  }

  initHUD() {
    this.hudElements = {
      level: document.getElementById('hud-level'),
      xp: document.getElementById('hud-xp'),
      credits: document.getElementById('hud-credits'),
      missions: document.getElementById('active-missions')
    };

    this.updateHUD(gameEngine.getState().player);
  }

  updateHUD(playerState) {
    this.hudElements.level.textContent = playerState.level;
    this.hudElements.xp.textContent = `${playerState.xp}/${gameEngine.getXPForLevel(playerState.level + 1)}`;
    this.hudElements.credits.textContent = playerState.credits;
    
    // Update active missions
    const activeMissions = gameEngine.getState().missions
      .filter(m => m.unlocked && !playerState.completedMissions.includes(m.id));
    
    this.hudElements.missions.innerHTML = activeMissions
      .map(m => `<div class="mission-item">${m.title}: ${this.getMissionProgress(m)}</div>`)
      .join('');
  }

  getMissionProgress(mission) {
    const playerStats = gameEngine.getState().player.stats;
    return Object.entries(mission.objectives)
      .map(([key, value]) => {
        const current = Math.min(playerStats[key] || 0, value);
        return `${current}/${value}`;
      })
      .join(' ');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  setupThemeSwitcher() {
    // Implementacja zmiany motywów
  }
}