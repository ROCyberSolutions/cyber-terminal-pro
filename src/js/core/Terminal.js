export class Terminal {
  constructor() {
    this.commands = {};
    this.history = [];
    this.historyIndex = 0;
    this.initDOM();
    this.setupEventListeners();
    this.registerCoreCommands();
  }

  initDOM() {
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
  }

  setupEventListeners() {
    this.input.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'Enter': this.executeCommand(); break;
        case 'ArrowUp': this.navigateHistory(-1); break;
        case 'ArrowDown': this.navigateHistory(1); break;
        case 'Tab': this.handleTabCompletion(e); break;
      }
    });

    this.input.addEventListener('input', () => {
      AudioManager.playTyping();
    });
  }

  executeCommand() {
    const cmdString = this.input.value.trim();
    if (!cmdString) return;

    this.history.push(cmdString);
    this.historyIndex = this.history.length;

    this.print(`<span class="prompt">${this.getPrompt()}</span> ${cmdString}`, 'command');

    const [command, ...args] = cmdString.split(/\s+/);
    this.processCommand(command, args);

    this.input.value = '';
  }

  processCommand(command, args) {
    if (this.commands[command]) {
      try {
        const result = this.commands[command].execute(args);
        this.print(result);
      } catch (error) {
        this.print(`[ERROR] ${error.message}`, 'error');
        AudioManager.playError();
      }
    } else {
      this.print(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
      AudioManager.playError();
    }
  }

  print(content, type = 'output') {
    const line = document.createElement('div');
    line.className = `line ${type}`;
    line.innerHTML = content;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  registerCommand(name, command) {
    this.commands[name] = command;
  }

  registerCoreCommands() {
    this.registerCommand('help', {
      description: 'Show available commands',
      execute: () => {
        let output = '<strong>AVAILABLE COMMANDS:</strong><br><br>';
        Object.entries(this.commands).forEach(([name, cmd]) => {
          output += `<span class="command-name">${name}</span> - ${cmd.description}<br>`;
        });
        return output;
      }
    });

    this.registerCommand('clear', {
      description: 'Clear terminal screen',
      execute: () => {
        this.output.innerHTML = '';
        return '';
      }
    });
  }

  getPrompt() {
    return `user@cyberterm:~$`;
  }

  navigateHistory(direction) {
    // ... (implementacja historii komend)
  }

  handleTabCompletion(e) {
    e.preventDefault();
    // ... (implementacja autouzupełniania)
  }
}