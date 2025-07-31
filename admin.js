// Admin Cheat Sheet Logic

class AdminCheatSheet {
    constructor() {
        this.currentRound = 0;
        this.showAllMode = false;
        
        // Load questions from config
        this.loadConfig();
        
        this.initializeAdmin();
    }
    
    loadConfig() {
        // Get the selected config from main window or use default
        const selectedConfig = this.getSelectedConfig();
        this.questions = selectedConfig.questions;
    }
    
    getSelectedConfig() {
        // Try to get config selection from main window
        try {
            const mainWindow = window.opener;
            if (mainWindow && mainWindow.game && mainWindow.game.config) {
                return mainWindow.game.config;
            }
        } catch (e) {
            // Main window not accessible, use default
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
        this.loadRound();
    }
    
    bindEvents() {
        document.getElementById('prev-round').addEventListener('click', () => {
            this.previousRound();
        });
        
        document.getElementById('next-round').addEventListener('click', () => {
            this.nextRound();
        });
        
        document.getElementById('show-all').addEventListener('click', () => {
            this.toggleShowAll();
        });
        
        document.getElementById('close-admin').addEventListener('click', () => {
            window.close();
        });
    }
    
    previousRound() {
        if (this.currentRound > 0) {
            this.currentRound--;
            this.loadRound();
        }
    }
    
    nextRound() {
        if (this.currentRound < this.questions.length - 1) {
            this.currentRound++;
            this.loadRound();
        }
    }
    
    loadRound() {
        const question = this.questions[this.currentRound];
        document.getElementById('current-question').textContent = question.question;
        document.getElementById('current-round-display').textContent = `Round ${this.currentRound + 1} of ${this.questions.length}`;
        
        this.displayAnswers(question.answers);
        
        // Update navigation button states
        document.getElementById('prev-round').disabled = this.currentRound === 0;
        document.getElementById('next-round').disabled = this.currentRound === this.questions.length - 1;
    }
    
    displayAnswers(answers) {
        const answersGrid = document.getElementById('answers-grid');
        answersGrid.innerHTML = '';
        
        answers.forEach((answer, index) => {
            const answerCard = document.createElement('div');
            answerCard.className = 'answer-card revealed';
            answerCard.dataset.index = index;
            answerCard.dataset.points = answer.points;
            
            answerCard.innerHTML = `
                <div class="answer-number">${index + 1}</div>
                <div class="answer-text">${answer.text}</div>
                <div class="answer-points">${answer.points}</div>
            `;
            
            answersGrid.appendChild(answerCard);
        });
    }
    
    toggleShowAll() {
        this.showAllMode = !this.showAllMode;
        
        if (this.showAllMode) {
            this.showAllRounds();
            document.getElementById('show-all').textContent = 'Show Single Round';
        } else {
            this.showSingleRound();
            document.getElementById('show-all').textContent = 'Show All Rounds';
        }
    }
    
    showAllRounds() {
        const showAllContainer = document.getElementById('show-all-container');
        const answersGrid = document.getElementById('answers-grid');
        
        answersGrid.style.display = 'none';
        showAllContainer.style.display = 'block';
        showAllContainer.innerHTML = '';
        
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
            
            showAllContainer.appendChild(roundSection);
        });
    }
    
    showSingleRound() {
        const showAllContainer = document.getElementById('show-all-container');
        const answersGrid = document.getElementById('answers-grid');
        
        showAllContainer.style.display = 'none';
        answersGrid.style.display = 'grid';
        this.loadRound();
    }
}

// Initialize the admin when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AdminCheatSheet();
}); 