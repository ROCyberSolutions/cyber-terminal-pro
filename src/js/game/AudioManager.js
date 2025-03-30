export class AudioManager {
  static sounds = {
    levelUp: 'sfx-levelup',
    achievement: 'sfx-achievement',
    error: 'sfx-error',
    typing: 'sfx-typing'
  };

  static play(soundId, volume = 0.7) {
    const sound = document.getElementById(soundId);
    if (!sound) return;

    sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch(e => console.warn('Audio play failed:', e));
  }

  static playLevelUp() {
    this.play(this.sounds.levelUp);
  }

  static playAchievement() {
    this.play(this.sounds.achievement);
  }

  static playError() {
    this.play(this.sounds.error);
  }

  static playTyping() {
    if (Math.random() > 0.3) return; // Reduce frequency
    this.play(this.sounds.typing, 0.3);
  }
}