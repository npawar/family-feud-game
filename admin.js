// Admin Cheat Sheet Logic

class AdminCheatSheet {
    constructor() {
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
        return this.getDefaultConfig();
    }
    
    getDefaultConfig() {
        return {
            title: "Baby Shower Family Feud",
            teamNames: { default1: "Team Forest", default2: "Team Meadow" },
            questions: [
            {
                question: "Name something you'd find in a baby's diaper bag",
                answers: [
                    { text: "Diapers", points: 25 },
                    { text: "Wipes", points: 20 },
                    { text: "Baby Powder", points: 15 },
                    { text: "Pacifier", points: 12 },
                    { text: "Extra Clothes", points: 10 },
                    { text: "Bottles", points: 8 },
                    { text: "Toys", points: 6 },
                    { text: "Blanket", points: 4 }
                ]
            },
            {
                question: "Name a popular baby food flavor",
                answers: [
                    { text: "Apple", points: 22 },
                    { text: "Banana", points: 18 },
                    { text: "Sweet Potato", points: 16 },
                    { text: "Carrot", points: 14 },
                    { text: "Peach", points: 12 },
                    { text: "Pear", points: 10 },
                    { text: "Green Beans", points: 8 },
                    { text: "Squash", points: 6 }
                ]
            },
            {
                question: "Name something that helps babies sleep",
                answers: [
                    { text: "Lullabies", points: 24 },
                    { text: "Pacifier", points: 20 },
                    { text: "Rocking", points: 16 },
                    { text: "White Noise", points: 14 },
                    { text: "Swaddling", points: 12 },
                    { text: "Nursing", points: 10 },
                    { text: "Stuffed Animal", points: 8 },
                    { text: "Night Light", points: 6 }
                ]
            },
            {
                question: "Name a common baby milestone",
                answers: [
                    { text: "First Smile", points: 26 },
                    { text: "Rolling Over", points: 20 },
                    { text: "Sitting Up", points: 16 },
                    { text: "Crawling", points: 14 },
                    { text: "First Words", points: 12 },
                    { text: "Walking", points: 10 },
                    { text: "Teething", points: 8 },
                    { text: "Clapping", points: 6 }
                ]
            },
            {
                question: "Name something parents worry about with newborns",
                answers: [
                    { text: "Sleeping", points: 28 },
                    { text: "Feeding", points: 22 },
                    { text: "Crying", points: 18 },
                    { text: "Temperature", points: 14 },
                    { text: "Diaper Rash", points: 12 },
                    { text: "Weight Gain", points: 10 },
                    { text: "Development", points: 8 },
                    { text: "Safety", points: 6 }
                ]
            }
        ];
        }
    }
    
    initializeAdmin() {
        this.bindEvents();
        this.showAllRounds();
        
        // Update page title
        document.title = `Admin Cheat Sheet - ${this.configTitle}`;
    }
    
    bindEvents() {
        document.getElementById('close-admin').addEventListener('click', () => {
            window.close();
        });
    }
    
    showAllRounds() {
        const allRoundsContainer = document.getElementById('all-rounds-container');
        allRoundsContainer.innerHTML = '';
        
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
}

// Initialize the admin when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AdminCheatSheet();
}); 