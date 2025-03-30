export class GameEngine {
  constructor() {
    this.state = {
      player: {
        level: 1,
        xp: 0,
        credits: 0,
        skills: [],
        completedMissions: [],
        unlockedAchievements: [],
        stats: {
          commandsExecuted: 0,
          encryptionCount: 0
        }
      },
      missions: this.loadMissions(),
      achievements: this.loadAchievements()
    };
  }

  loadMissions() {
    return [
      {
        id: 'first_steps',
        title: 'First Steps',
        description: 'Execute your first 5 commands',
        reward: 100,
        objectives: { commandsExecuted: 5 },
        unlocked: true
      },
      {
        id: 'cyber_initiate',
        title: 'Cyber Initiate',
        description: 'Use encryption 3 times',
        reward: 250,
        objectives: { encryptionCount: 3 },
        unlockLevel: 2
      }
    ];
  }

  loadAchievements() {
    return [
      {
        id: 'terminal_novice',
        title: 'Terminal Novice',
        description: 'Reach level 3',
        reward: 500,
        condition: (state) => state.player.level >= 3
      }
    ];
  }

  executeCommand(command) {
    this.state.player.stats.commandsExecuted++;
    
    // Update missions
    this.checkMissions();
    
    // Award base XP
    this.addXP(10);
    
    // Special XP for certain commands
    if (['encrypt', 'decrypt'].includes(command)) {
      this.state.player.stats.encryptionCount++;
      this.addXP(25);
    }
  }

  addXP(amount) {
    this.state.player.xp += amount;
    const levelUp = this.checkLevelUp();
    if (levelUp) {
      this.checkAchievements();
      return levelUp;
    }
    return false;
  }

  checkLevelUp() {
    const xpNeeded = this.getXPForLevel(this.state.player.level + 1);
    if (this.state.player.xp >= xpNeeded) {
      this.state.player.level++;
      AudioManager.playLevelUp();
      return {
        level: this.state.player.level,
        xp: this.state.player.xp
      };
    }
    return false;
  }

  getXPForLevel(level) {
    return level * level * 1000;
  }

  checkMissions() {
    this.state.missions.forEach(mission => {
      if (!mission.unlocked && mission.unlockLevel <= this.state.player.level) {
        mission.unlocked = true;
        this.print(`New mission available: "${mission.title}"`, 'mission');
      }

      if (mission.unlocked && !this.state.player.completedMissions.includes(mission.id)) {
        let completed = true;
        for (const [key, value] of Object.entries(mission.objectives)) {
          if (this.state.player.stats[key] < value) {
            completed = false;
            break;
          }
        }

        if (completed) {
          this.completeMission(mission.id);
        }
      }
    });
  }

  completeMission(missionId) {
    const mission = this.state.missions.find(m => m.id === missionId);
    this.state.player.completedMissions.push(missionId);
    this.state.player.credits += mission.reward;
    this.addXP(mission.reward);
    
    AudioManager.playAchievement();
    return `Mission Complete: ${mission.title} (+${mission.reward} XP)`;
  }

  checkAchievements() {
    this.state.achievements.forEach(achievement => {
      if (!this.state.player.unlockedAchievements.includes(achievement.id) && 
          achievement.condition(this.state)) {
        this.unlockAchievement(achievement.id);
      }
    });
  }

  unlockAchievement(achievementId) {
    const achievement = this.state.achievements.find(a => a.id === achievementId);
    this.state.player.unlockedAchievements.push(achievementId);
    this.state.player.credits += achievement.reward;
    
    AudioManager.playAchievement();
    return `Achievement Unlocked: ${achievement.title} (+${achievement.reward} Credits)`;
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}

export const gameEngine = new GameEngine();