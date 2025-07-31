// Admin Cheat Sheet Logic

class AdminCheatSheet {
    constructor() {
        // Use shared configurations
        this.availableConfigs = window.GameConfigs || {};
        
        // Load questions from config
        this.loadConfig();
        
        this.initializeAdmin();
    }
    
    loadConfig() {
        // Get the selected config from main window or use default
        const selectedConfig = this.getSelectedConfig();
        this.questions = selectedConfig.questions;
        this.configTitle = selectedConfig.title;
    }
    
    getSelectedConfig() {
        // Try to get config selection from main window
        try {
            const mainWindow = window.opener;
            if (mainWindow && mainWindow.game && mainWindow.game.config) {
                console.log('Loading config from main window:', mainWindow.game.config.title);
                return mainWindow.game.config;
            }
        } catch (e) {
            console.log('Main window not accessible, using default config');
        }
        
        // Fallback to default config
        return this.availableConfigs['default'];
    }
    
    initializeAdmin() {
        this.bindEvents();
        this.updateDropdownSelection();
        this.showAllRounds();
        
        // Update page title
        document.title = `Admin Cheat Sheet - ${this.configTitle}`;
    }
    
    bindEvents() {
        document.getElementById('admin-config-select').addEventListener('change', (e) => {
            this.switchConfig(e.target.value);
        });
    }
    
    showAllRounds() {
        console.log('showAllRounds called');
        console.log('this.questions:', this.questions);
        console.log('this.configTitle:', this.configTitle);
        
        const allRoundsContainer = document.getElementById('all-rounds-container');
        if (!allRoundsContainer) {
            console.error('all-rounds-container not found!');
            return;
        }
        
        allRoundsContainer.innerHTML = '';
        
        if (!this.questions || this.questions.length === 0) {
            console.error('No questions found!');
            allRoundsContainer.innerHTML = '<p>No questions loaded!</p>';
            return;
        }
        
        this.questions.forEach((question, roundIndex) => {
            const roundSection = document.createElement('div');
            roundSection.className = 'round-section';
            
            roundSection.innerHTML = `
                <div class="round-header">
                    <h3>Round ${roundIndex + 1}: ${question.question}</h3>
                </div>
                <div class="answers-grid">
                    ${question.answers.map((answer, index) => `
                        <div class="answer-card revealed">
                            <div class="answer-number">${index + 1}</div>
                            <div class="answer-text">${answer.text}</div>
                            <div class="answer-points">${answer.points}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            allRoundsContainer.appendChild(roundSection);
        });
    }
    
    switchConfig(configName) {
        console.log('Switching to config:', configName);
        
        // Load the new config
        if (this.availableConfigs[configName]) {
            const selectedConfig = this.availableConfigs[configName];
            this.questions = selectedConfig.questions;
            this.configTitle = selectedConfig.title;
            
            // Update the display
            this.showAllRounds();
            document.title = `Admin Cheat Sheet - ${this.configTitle}`;
            
            console.log('Config switched to:', this.configTitle);
        } else {
            console.error('Config not found:', configName);
        }
    }
    
    updateDropdownSelection() {
        // Try to detect which config is being used in the main window
        let selectedConfigKey = 'default';
        
        try {
            const mainWindow = window.opener;
            if (mainWindow && mainWindow.game && mainWindow.game.config) {
                // Find which config matches the main window's config
                for (const [key, config] of Object.entries(this.availableConfigs)) {
                    if (config.title === mainWindow.game.config.title) {
                        selectedConfigKey = key;
                        break;
                    }
                }
            }
        } catch (e) {
            console.log('Cannot detect main window config, using default');
        }
        
        // Set the dropdown value
        const dropdown = document.getElementById('admin-config-select');
        if (dropdown) {
            dropdown.value = selectedConfigKey;
        }
        
        console.log('Dropdown set to:', selectedConfigKey);
    }
}

// Initialize the admin when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing AdminCheatSheet...');
    try {
        new AdminCheatSheet();
        console.log('AdminCheatSheet initialized successfully');
    } catch (error) {
        console.error('Error initializing AdminCheatSheet:', error);
    }
});