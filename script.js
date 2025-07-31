// Baby Shower Family Feud Game Logic

class BabyShowerFamilyFeud {
    constructor() {
        this.currentRound = 0;
        this.team1Score = 0;
        this.team2Score = 0;
        this.currentQuestionIndex = 0;
        this.revealedAnswers = 0;
        this.currentTeam = 1; // 1 for team 1, 2 for team 2
        
        // Available configurations
        this.availableConfigs = {
            'default': {
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
                ]
            },
            'wedding': {
                title: "Wedding Shower Family Feud",
                teamNames: { default1: "Team Bride", default2: "Team Groom" },
                questions: [
                    {
                        question: "Name something you need for a wedding",
                        answers: [
                            { text: "Wedding Dress", points: 28 },
                            { text: "Rings", points: 24 },
                            { text: "Flowers", points: 20 },
                            { text: "Cake", points: 16 },
                            { text: "Music", points: 12 },
                            { text: "Photographer", points: 10 },
                            { text: "Venue", points: 8 },
                            { text: "Invitations", points: 6 }
                        ]
                    },
                    {
                        question: "Name something couples argue about when planning a wedding",
                        answers: [
                            { text: "Budget", points: 30 },
                            { text: "Guest List", points: 25 },
                            { text: "Venue", points: 20 },
                            { text: "Food", points: 15 },
                            { text: "Music", points: 12 },
                            { text: "Decorations", points: 10 },
                            { text: "Flowers", points: 8 },
                            { text: "Seating Chart", points: 5 }
                        ]
                    },
                    {
                        question: "Name a popular wedding tradition",
                        answers: [
                            { text: "Something Old, New, Borrowed, Blue", points: 26 },
                            { text: "First Dance", points: 22 },
                            { text: "Bouquet Toss", points: 18 },
                            { text: "Cutting the Cake", points: 16 },
                            { text: "Wedding Vows", points: 14 },
                            { text: "Ring Exchange", points: 12 },
                            { text: "Father Walking Bride Down Aisle", points: 10 },
                            { text: "Garter Toss", points: 8 }
                        ]
                    },
                    {
                        question: "Name something you might find at a wedding reception",
                        answers: [
                            { text: "Dancing", points: 24 },
                            { text: "Open Bar", points: 20 },
                            { text: "Wedding Cake", points: 18 },
                            { text: "DJ", points: 16 },
                            { text: "Centerpieces", points: 14 },
                            { text: "Photo Booth", points: 12 },
                            { text: "Wedding Favors", points: 10 },
                            { text: "Guest Book", points: 8 }
                        ]
                    },
                    {
                        question: "Name something a bride worries about on her wedding day",
                        answers: [
                            { text: "Weather", points: 28 },
                            { text: "Looking Beautiful", points: 24 },
                            { text: "Everything Going Smoothly", points: 20 },
                            { text: "Being Late", points: 16 },
                            { text: "Dress Fitting", points: 12 },
                            { text: "Family Drama", points: 10 },
                            { text: "Vendor Issues", points: 8 },
                            { text: "Forgetting Vows", points: 6 }
                        ]
                    }
                ]
            }
        };
        
        // Load default configuration
        this.loadConfig('default');
        
        // Undo system
        this.actionHistory = [];
        this.maxHistorySize = 10;
        
        this.initializeGame();
    }
    
    loadConfig(configName = 'default') {
        // Load from available configs
        if (this.availableConfigs[configName]) {
            this.config = this.availableConfigs[configName];
        } else {
            // Fallback to default if config not found
            this.config = this.availableConfigs['default'];
        }
        
        // Set default team names from config
        this.team1Name = this.config.teamNames.default1;
        this.team2Name = this.config.teamNames.default2;
        this.questions = this.config.questions;
        
        // Update page title if specified in config
        if (this.config.title) {
            document.title = this.config.title;
            // Update main title on welcome screen
            const titleElement = document.querySelector('.title');
            if (titleElement) {
                titleElement.textContent = this.config.title;
            }
        }
        
        // Update placeholders and team input values
        this.updateTeamPlaceholders();
    }
    
    updateTeamPlaceholders() {
        const team1Input = document.getElementById('team1-name');
        const team2Input = document.getElementById('team2-name');
        
        if (team1Input) {
            team1Input.placeholder = `e.g., ${this.config.teamNames.default1}`;
            team1Input.value = ''; // Clear previous values
        }
        if (team2Input) {
            team2Input.placeholder = `e.g., ${this.config.teamNames.default2}`;
            team2Input.value = ''; // Clear previous values
        }
    }
    
    initializeGame() {
        this.bindEvents();
        this.updateDisplay();
    }
    
    bindEvents() {
        // Config selection event
        document.getElementById('config-select').addEventListener('change', (e) => {
            this.loadConfig(e.target.value);
        });
        
        // Welcome screen events
        document.getElementById('start-game').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('show-cheat-sheet').addEventListener('click', () => {
            window.open('admin.html', '_blank');
        });
        
        // Answer input events
        document.getElementById('submit-answer').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        
        // Game screen events
        document.getElementById('reveal-all').addEventListener('click', () => {
            this.revealAllAnswers();
        });
        
        document.getElementById('undo').addEventListener('click', () => {
            this.undoLastAction();
        });
        
        document.getElementById('next-round').addEventListener('click', () => {
            this.nextRound();
        });
        
        document.getElementById('end-game').addEventListener('click', () => {
            this.endGame();
        });
        
        // Results screen events
        document.getElementById('play-again').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('back-to-welcome').addEventListener('click', () => {
            this.showWelcomeScreen();
        });
        
        // Answer card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.answer-card') && !e.target.closest('.answer-card').classList.contains('revealed')) {
                this.revealAnswer(e.target.closest('.answer-card'));
            }
        });
    }
    
    startGame() {
        this.team1Name = document.getElementById('team1-name').value || this.config.teamNames.default1;
        this.team2Name = document.getElementById('team2-name').value || this.config.teamNames.default2;
        
        document.getElementById('team1-display').textContent = this.team1Name;
        document.getElementById('team2-display').textContent = this.team2Name;
        document.getElementById('final-team1').textContent = this.team1Name;
        document.getElementById('final-team2').textContent = this.team2Name;
        
        this.showGameScreen();
        this.loadQuestion();
        this.updateTeamIndicator();
        this.updateUndoButton(); // Initialize undo button state
    }
    
    showGameScreen() {
        document.getElementById('welcome-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        document.getElementById('results-screen').classList.remove('active');
    }
    
    showWelcomeScreen() {
        // Reset game state when going back to welcome
        this.currentRound = 0;
        this.team1Score = 0;
        this.team2Score = 0;
        this.revealedAnswers = 0;
        this.currentTeam = 1;
        this.actionHistory = [];
        
        // Update displays
        this.updateDisplay();
        this.updateUndoButton();
        
        // Show welcome screen
        document.getElementById('welcome-screen').classList.add('active');
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('results-screen').classList.remove('active');
    }
    
    showResultsScreen() {
        document.getElementById('welcome-screen').classList.remove('active');
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('results-screen').classList.add('active');
    }
    
    loadQuestion() {
        if (this.currentRound >= this.questions.length) {
            this.endGame();
            return;
        }
        
        const question = this.questions[this.currentRound];
        document.getElementById('current-question').textContent = question.question;
        document.getElementById('current-round').textContent = this.currentRound + 1;
        document.getElementById('total-rounds').textContent = this.questions.length;
        
        this.displayAnswers(question.answers);
        this.revealedAnswers = 0;
        
        // Only set team to 1 for the very first round (Round 0)
        if (this.currentRound === 0) {
            this.currentTeam = 1;
        }
        // For all other rounds, keep the current team (natural progression)
        
        this.updateTeamIndicator();
        this.clearFeedback();
        
        // Reset button states
        document.getElementById('reveal-all').style.display = 'inline-block';
        document.getElementById('next-round').style.display = 'none';
        document.getElementById('end-game').style.display = 'none';
        
        // Focus on input
        document.getElementById('answer-input').focus();
    }
    
    displayAnswers(answers) {
        const answersGrid = document.getElementById('answers-grid');
        answersGrid.innerHTML = '';
        
        answers.forEach((answer, index) => {
            const answerCard = document.createElement('div');
            answerCard.className = 'answer-card';
            answerCard.dataset.index = index;
            answerCard.dataset.points = answer.points;
            answerCard.dataset.answer = answer.text.toLowerCase();
            
            answerCard.innerHTML = `
                <div class="answer-number">${index + 1}</div>
                <div class="answer-text">???</div>
                <div class="answer-points">${answer.points}</div>
            `;
            
            answersGrid.appendChild(answerCard);
        });
    }
    
    checkAnswer() {
        const input = document.getElementById('answer-input');
        const userAnswer = input.value.trim().toLowerCase();
        
        if (!userAnswer) {
            this.showFeedback('Please enter an answer!', 'incorrect');
            this.playSound('error');
            return;
        }
        
        const currentAnswers = this.questions[this.currentRound].answers;
        let foundMatch = false;
        let matchedAnswer = null;
        let matchedIndex = -1;
        
        // Check for exact or partial matches
        for (let i = 0; i < currentAnswers.length; i++) {
            const answer = currentAnswers[i];
            const answerText = answer.text.toLowerCase();
            
            // Check for exact match
            if (answerText === userAnswer) {
                foundMatch = true;
                matchedAnswer = answer;
                matchedIndex = i;
                break;
            }
            
            // Improved partial match logic
            if (this.isValidPartialMatch(userAnswer, answerText)) {
                foundMatch = true;
                matchedAnswer = answer;
                matchedIndex = i;
                break;
            }
        }
        
        if (foundMatch) {
            // Check if answer is already revealed
            const answerCards = document.querySelectorAll('.answer-card');
            if (answerCards[matchedIndex] && !answerCards[matchedIndex].classList.contains('revealed')) {
                // Save state before processing correct answer
                this.saveState('Correct Answer Submission', { answer: userAnswer, matchedAnswer: matchedAnswer.text });
                this.revealAnswerInternal(answerCards[matchedIndex]); // Use internal version to avoid double state saving
                this.showFeedback(`Correct! "${matchedAnswer.text}" is worth ${matchedAnswer.points} points!`, 'correct');
                this.playSound('correct');
            } else {
                this.showFeedback('That answer has already been revealed!', 'incorrect');
                this.playSound('error');
            }
        } else {
            // Save state before switching teams for incorrect answer
            this.saveState('Incorrect Answer Submission', { answer: userAnswer });
            this.showFeedback('Sorry, that\'s not on the board!', 'incorrect');
            this.playSound('error');
            this.switchTeam();
        }
        
        // Clear input
        input.value = '';
        input.focus();
    }
    
    switchTeam() {
        this.currentTeam = this.currentTeam === 1 ? 2 : 1;
        this.updateTeamIndicator();
    }
    
    updateTeamIndicator() {
        const team1Name = document.getElementById('team1-display').textContent;
        const team2Name = document.getElementById('team2-display').textContent;
        const currentTeamName = this.currentTeam === 1 ? team1Name : team2Name;
        document.getElementById('current-team-indicator').textContent = `${currentTeamName}'s Turn`;
    }
    
    showFeedback(message, type) {
        const feedbackElement = document.getElementById('feedback-message');
        feedbackElement.textContent = message;
        feedbackElement.className = `feedback-message ${type}`;
        
        // Clear feedback after 3 seconds
        setTimeout(() => {
            this.clearFeedback();
        }, 3000);
    }
    
    clearFeedback() {
        const feedbackElement = document.getElementById('feedback-message');
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback-message';
    }
    
    revealAllAnswers() {
        // Save state before revealing all answers
        this.saveState('Reveal All Answers');
        
        this.playSound('harp');
        
        const answerCards = document.querySelectorAll('.answer-card');
        let delay = 0;
        answerCards.forEach((card, index) => {
            setTimeout(() => {
                this.revealAnswerNoPoints(card);
            }, delay);
            delay += 200; // Stagger the reveals
        });
    }
    
    revealAnswer(answerCard) {
        if (answerCard.classList.contains('revealed')) return;
        
        // Save state before revealing answer
        const index = parseInt(answerCard.dataset.index);
        const answer = this.questions[this.currentRound].answers[index];
        this.saveState('Manual Answer Reveal', { answer: answer.text, points: answer.points });
        
        this.revealAnswerInternal(answerCard);
    }
    
    revealAnswerInternal(answerCard) {
        if (answerCard.classList.contains('revealed')) return;
        
        const index = parseInt(answerCard.dataset.index);
        const points = parseInt(answerCard.dataset.points);
        const answer = this.questions[this.currentRound].answers[index];
        
        answerCard.classList.add('revealed');
        answerCard.querySelector('.answer-text').textContent = answer.text;
        this.revealedAnswers++;
        
        // Add points to current team
        if (this.currentTeam === 1) {
            this.team1Score += points;
        } else {
            this.team2Score += points;
        }
        
        this.updateDisplay();
        
        // Play chime sound for manual answer reveal
        this.playSound('chime');
        
        // Switch to the other team after revealing an answer
        this.switchTeam();
        
        // Check if all answers are revealed
        if (this.revealedAnswers >= this.questions[this.currentRound].answers.length) {
            this.roundComplete();
        }
    }
    
    revealAnswerNoPoints(answerCard) {
        if (answerCard.classList.contains('revealed')) return;
        
        const index = parseInt(answerCard.dataset.index);
        const answer = this.questions[this.currentRound].answers[index];
        
        answerCard.classList.add('revealed');
        answerCard.querySelector('.answer-text').textContent = answer.text;
        this.revealedAnswers++;
        
        // Check if all answers are revealed
        if (this.revealedAnswers >= this.questions[this.currentRound].answers.length) {
            this.roundComplete();
        }
    }
    
    roundComplete() {
        document.getElementById('reveal-all').style.display = 'none';
        
        if (this.currentRound < this.questions.length - 1) {
            document.getElementById('next-round').style.display = 'inline-block';
        } else {
            document.getElementById('end-game').style.display = 'inline-block';
        }
    }
    
    nextRound() {
        this.currentRound++;
        this.actionHistory = []; // Clear action history for new round
        
        // Don't change the current team - let it carry over from the previous round
        // The team that had the last turn in the previous round continues in the new round
        
        this.loadQuestion();
        this.updateTeamIndicator();
        this.updateUndoButton();
    }
    
    endGame() {
        this.showResultsScreen();
        this.displayFinalResults();
    }
    
    displayFinalResults() {
        document.getElementById('final-team1-score').textContent = this.team1Score;
        document.getElementById('final-team2-score').textContent = this.team2Score;
        
        const winnerAnnouncement = document.getElementById('winner-announcement');
        const team1Name = document.getElementById('team1-display').textContent;
        const team2Name = document.getElementById('team2-display').textContent;
        
        if (this.team1Score > this.team2Score) {
            winnerAnnouncement.textContent = `🎉 ${team1Name} Wins! 🎉`;
        } else if (this.team2Score > this.team1Score) {
            winnerAnnouncement.textContent = `🎉 ${team2Name} Wins! 🎉`;
        } else {
            winnerAnnouncement.textContent = "🤝 It's a Tie! 🤝";
        }
    }
    
    resetGame() {
        this.currentRound = 0;
        this.team1Score = 0;
        this.team2Score = 0;
        this.revealedAnswers = 0;
        this.currentTeam = 1; // Always start Round 1 with Team 1
        this.actionHistory = []; // Clear action history
        this.updateDisplay();
        this.showGameScreen();
        this.loadQuestion();
        this.updateTeamIndicator();
        this.updateUndoButton();
    }
    
    updateDisplay() {
        document.getElementById('team1-points').textContent = this.team1Score;
        document.getElementById('team2-points').textContent = this.team2Score;
    }
    
    // Improved partial matching logic
    isValidPartialMatch(userInput, answerText) {
        // Minimum length requirements
        if (userInput.length < 3) {
            return false; // Reject very short inputs like "ff"
        }
        
        // Split both into words for word-based matching
        const userWords = userInput.split(/\s+/).filter(word => word.length > 0);
        const answerWords = answerText.split(/\s+/).filter(word => word.length > 0);
        
        // Check if any user word matches any answer word (or vice versa)
        for (const userWord of userWords) {
            for (const answerWord of answerWords) {
                // Word contains another word (both directions)
                if (userWord.length >= 3 && answerWord.includes(userWord)) {
                    return true; // e.g., "powder" matches "Baby Powder"
                }
                if (answerWord.length >= 3 && userWord.includes(answerWord)) {
                    return true; // e.g., "bottles" matches "bottle"
                }
                // Word starts with another word
                if (userWord.length >= 3 && answerWord.startsWith(userWord)) {
                    return true; // e.g., "pac" matches "pacifier"
                }
                if (answerWord.length >= 3 && userWord.startsWith(answerWord)) {
                    return true; // e.g., "pacifiers" matches "pacifier"
                }
            }
        }
        
        // Check if user input is a significant portion of the answer
        if (userInput.length >= 4 && answerText.includes(userInput)) {
            return true; // e.g., "stuff" matches "Stuffed Animal"
        }
        
        return false;
    }
    
    // Save current state for undo
    saveState(action, details = {}) {
        // Capture which answer cards are currently revealed
        const revealedCards = [];
        const answerCards = document.querySelectorAll('.answer-card');
        answerCards.forEach((card, index) => {
            if (card.classList.contains('revealed')) {
                revealedCards.push({
                    index: index,
                    text: card.querySelector('.answer-text').textContent,
                    points: parseInt(card.dataset.points)
                });
            }
        });
        
        const state = {
            action: action,
            timestamp: Date.now(),
            team1Score: this.team1Score,
            team2Score: this.team2Score,
            currentTeam: this.currentTeam,
            revealedAnswers: this.revealedAnswers,
            currentRound: this.currentRound,
            revealedCards: revealedCards,
            details: details
        };
        
        this.actionHistory.push(state);
        
        // Keep only the last maxHistorySize actions
        if (this.actionHistory.length > this.maxHistorySize) {
            this.actionHistory.shift();
        }
        
        this.updateUndoButton();
    }
    
    // Restore state from history
    restoreState(state) {
        this.team1Score = state.team1Score;
        this.team2Score = state.team2Score;
        this.currentTeam = state.currentTeam;
        this.revealedAnswers = state.revealedAnswers;
        this.currentRound = state.currentRound;
        
        // Restore specific answer card states instead of reloading everything
        const answerCards = document.querySelectorAll('.answer-card');
        
        // First, reset all cards to unrevealed state
        answerCards.forEach((card, index) => {
            card.classList.remove('revealed');
            card.querySelector('.answer-text').textContent = '???';
        });
        
        // Then restore only the cards that should be revealed
        if (state.revealedCards) {
            state.revealedCards.forEach(revealedCard => {
                if (answerCards[revealedCard.index]) {
                    const card = answerCards[revealedCard.index];
                    card.classList.add('revealed');
                    card.querySelector('.answer-text').textContent = revealedCard.text;
                }
            });
        }
        
        this.updateDisplay();
        this.updateTeamIndicator();
    }
    
    // Undo the last action
    undoLastAction() {
        if (this.actionHistory.length === 0) {
            this.showFeedback('Nothing to undo!', 'incorrect');
            return;
        }
        
        const lastState = this.actionHistory.pop();
        
        // Debug logging
        console.log('Undoing action:', lastState.action);
        console.log('Current team before undo:', this.currentTeam);
        console.log('Restoring to team:', lastState.currentTeam);
        
        // Restore the previous state
        this.restoreState(lastState);
        
        // Debug logging after restore
        console.log('Current team after undo:', this.currentTeam);
        
        // Show feedback
        this.showFeedback(`Undid: ${lastState.action}`, 'correct');
        this.playSound('chime');
        
        this.updateUndoButton();
    }
    
    // Update undo button state
    updateUndoButton() {
        const undoButton = document.getElementById('undo');
        if (this.actionHistory.length === 0) {
            undoButton.disabled = true;
            undoButton.textContent = '↶ Undo (None)';
        } else {
            undoButton.disabled = false;
            undoButton.textContent = `↶ Undo (${this.actionHistory.length})`;
        }
    }
    
    playSound(type) {
        // Create audio context for generating sounds
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator for generating tones
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set volume
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        switch(type) {
            case 'correct':
                // Cash register sound - high pitched ding
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                break;
            case 'error':
                // Error sound - low pitched buzz
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                break;
            case 'harp':
                // Harp sound - multiple piano notes chord progression
                const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6 chord
                notes.forEach((frequency, index) => {
                    const noteOscillator = audioContext.createOscillator();
                    const noteGain = audioContext.createGain();
                    
                    noteOscillator.connect(noteGain);
                    noteGain.connect(audioContext.destination);
                    
                    noteOscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                    noteOscillator.type = 'sine';
                    
                    // Stagger the notes slightly for a more natural sound
                    const startTime = audioContext.currentTime + (index * 0.1);
                    noteGain.gain.setValueAtTime(0.05, startTime);
                    noteGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);
                    
                    noteOscillator.start(startTime);
                    noteOscillator.stop(startTime + 0.8);
                });
                return; // Exit early since we're handling multiple oscillators
                break;
            case 'chime':
                // Chime sound - bell-like tone
                oscillator.frequency.setValueAtTime(659, audioContext.currentTime); // E5
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                break;
        }
        
        // Start and stop the sound
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new BabyShowerFamilyFeud();
}); 