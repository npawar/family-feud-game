# Game Configuration Files

This directory contains different question and answer configurations for the Family Feud game.

## Available Configurations

### default.js
- **Theme**: Baby Shower
- **Teams**: Team Forest vs Team Meadow
- **Questions**: 5 baby-themed questions

### wedding.js
- **Theme**: Wedding Shower
- **Teams**: Team Bride vs Team Groom
- **Questions**: 5 wedding-themed questions

## How to Switch Configurations

### Method 1: Replace the script tag in HTML
Edit `index.html` and `admin.html`:

```html
<!-- For Baby Shower (default) -->
<script src="configs/default.js"></script>

<!-- For Wedding Shower -->
<script src="configs/wedding.js"></script>
```

### Method 2: Create your own config
1. Copy `default.js` to a new file (e.g., `birthday.js`)
2. Modify the questions, answers, and team names
3. Update the HTML files to use your new config

## Configuration Format

```javascript
const configName = {
    title: "Your Game Title",
    teamNames: {
        default1: "Team Name 1",
        default2: "Team Name 2"
    },
    questions: [
        {
            question: "Your question here?",
            answers: [
                { text: "Answer 1", points: 25 },
                { text: "Answer 2", points: 20 },
                // ... up to 8 answers
            ]
        }
        // ... up to 5 questions
    ]
};
```

## Requirements
- Each question should have **exactly 8 answers**
- Points should be in descending order (highest first)
- Total of **5 questions** for a complete game
- All text should be family-friendly

## Tips for Creating Configs
- Make questions specific to your event theme
- Ensure answers are things people would actually say
- Test point values - most popular answers get higher points
- Keep team names relevant to your theme