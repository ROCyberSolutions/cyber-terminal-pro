export const resumeCommand = {
  description: 'Display professional resume and experience',
  execute: (args) => {
    const section = args[0] || 'about';
    let output = '';

    switch (section) {
      case 'about':
        output = this.getAboutSection();
        break;
      case 'experience':
        output = this.getExperienceSection();
        break;
      case 'skills':
        output = this.getSkillsSection();
        break;
      case 'details':
        output = this.getDetailsSection(args[1]);
        break;
      default:
        return 'Invalid section. Available: about, experience, skills, details [company]';
    }

    // Award XP for viewing resume
    gameEngine.executeCommand('resume');
    return output;
  },

  getAboutSection() {
    return `
      <div class="resume-section">
        <h2>ROMAN ORŁOWSKI</h2>
        <p class="contact">+48 695 295 641 | ro-noc2020@protonmail.com</p>
        
        <h3>About Me</h3>
        <p>${[
          'Self-motivated problem solver with IT Technical background',
          'Specializing in Cloud Security (Azure/MS365/Defender)',
          'Experienced in Infrastructure Migration and SOC/NOC Operations'
        ].join('<br>• ')}</p>
      </div>
    `;
  },

  getExperienceSection() {
    return `
      <div class="resume-section">
        <h3>Professional Experience</h3>
        <ul class="timeline">
          <li>
            <strong>LTIMindTree (06/2023-02/2024)</strong>
            <p>Senior Engineer for Cloud and Infra - Azure/MS365/Defender</p>
          </li>
          <li>
            <strong>Intellias (01/2022-04/2023)</strong>
            <p>Support Engineer - Cloud Migration (Fintech)</p>
          </li>
          <!-- Add other experiences -->
        </ul>
        <p>Type 'resume details [company]' for specifics</p>
      </div>
    `;
  },

  getSkillsSection() {
    return `
      <div class="resume-section">
        <h3>Technical Skills</h3>
        <div class="skills-grid">
          ${this.renderSkillCategory('Cloud', ['Azure', 'MS365', 'Defender for Endpoint'])}
          ${this.renderSkillCategory('Security', ['SIEM', 'EDR', 'Threat Protection'])}
          ${this.renderSkillCategory('Networking', ['MPLS', 'SDH', 'Cisco'])}
        </div>
      </div>
    `;
  },

  renderSkillCategory(name, items) {
    return `
      <div class="skill-category">
        <h4>${name}</h4>
        <ul>
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  },

  getDetailsSection(company) {
    const details = {
      ltimindtree: {
        title: "LTIMindTree | Azure Security Engineer",
        achievements: [
          "Led Microsoft Defender implementations",
          "Conducted security posture assessments",
          "Developed Threat Protection services"
        ]
      },
      intellias: {
        title: "Intellias | Cloud Migration Engineer",
        achievements: [
          "Managed Azure resources across EU regions",
          "Optimized directory strategies",
          "Developed migration documentation"
        ]
      }
    };

    const data = details[company.toLowerCase()];
    if (!data) return 'Company not found. Try: ltimindtree, intellias';

    return `
      <div class="resume-section">
        <h3>${data.title}</h3>
        <ul class="achievements">
          ${data.achievements.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    `;
  }
};