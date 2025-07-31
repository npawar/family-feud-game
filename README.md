# 👶 Baby Shower Family Feud 👶

A fun, interactive Family Feud-style game perfect for baby showers! Test your baby knowledge with friends and family with a beautiful nature-inspired design featuring adorable baby animal decorations.

## 🎮 How to Play

1. **Setup**: Enter team names (or use the default "Team Forest" and "Team Meadow")
2. **Gameplay**: 
   - Read the question aloud to both teams
   - **Type your answer** in the input field and click "Submit Answer" or press Enter
   - **Click on answer cards** to manually reveal them (points go to current team)
   - The game will check if your typed answer matches any of the board answers
   - If correct, the answer is revealed and points are awarded to the current team
   - If incorrect, the turn passes to the other team
   - Continue until all answers are revealed
3. **Scoring**: Higher points for more popular answers
4. **Winner**: Team with the most points after all 5 rounds wins!

## 🎯 Game Features

- **Answer Input System**: Type your guesses and the game checks if they're correct!
- **Manual Answer Clicking**: Click any answer card to reveal it and award points to current team
- **Smart Matching**: The game recognizes exact matches and partial matches
- **Team Turn Indicator**: Shows which team's turn it is
- **Instant Feedback**: Get immediate feedback on whether your answer is correct
- **Sound Effects**: Cash register sound for correct answers, error sound for wrong answers
- **Reveal All Button**: End the round early by revealing all remaining answers (no points awarded)
- **Separate Admin Page**: Complete cheat sheet with navigation controls
- **Modern Design**: Beautiful green and brown nature theme with baby animal decorations
- **5 Baby-Themed Rounds** with questions like:
  - "Name something you'd find in a baby's diaper bag"
  - "Name a popular baby food flavor"
  - "Name something that helps babies sleep"
  - "Name a common baby milestone"
  - "Name something parents worry about with newborns"

- **Responsive**: Works on desktop, tablet, and mobile devices
- **Score Tracking**: Automatic point calculation and team score display

## 🎲 Answer Input System

### How It Works:
1. **Type Your Guess**: Enter your answer in the text field
2. **Submit**: Click "Submit Answer" or press Enter
3. **Smart Checking**: The game checks for:
   - Exact matches (e.g., "diapers" matches "Diapers")
   - Partial matches (e.g., "baby" matches "Baby Powder")
4. **Feedback**: Get immediate feedback on whether your answer is correct
5. **Points**: If correct, the answer is revealed and points are awarded
6. **Turn Switch**: Turns alternate between teams

### Manual Answer Clicking:
- **Click any answer card** to reveal it manually
- **Points are awarded** to the current team
- **Turn switches** to the other team
- **Perfect for flexible scoring** when players give answers that don't match exactly

### Answer Matching Examples:
- "diapers" → matches "Diapers" ✅
- "baby powder" → matches "Baby Powder" ✅
- "powder" → matches "Baby Powder" ✅
- "pacifier" → matches "Pacifier" ✅
- "wrong answer" → no match ❌

## 🔍 Admin Cheat Sheet (admin.html)

### Perfect for Game Hosts:
- **Separate Page**: Opens in new window/tab
- **Navigation Controls**: Previous/Next round buttons
- **Show All Mode**: View all rounds at once
- **Same Layout**: 4x2 grid like the main game
- **Non-Clickable**: Answers are displayed but not interactive
- **Easy Access**: "Admin Cheat Sheet" button from welcome screen

### How to Use:
1. Click "Admin Cheat Sheet" from the welcome screen
2. Navigate between rounds using Previous/Next buttons
3. Use "Show All Rounds" to see all questions and answers
4. Use "Show Single Round" to return to round-by-round view
5. Close the window when done

### Features:
- **Round Navigation**: Easy switching between rounds
- **Show All Mode**: View all 5 rounds at once
- **Same Styling**: Matches the main game's beautiful design
- **Responsive**: Works on all devices

## 🔊 Sound Effects

The game includes three types of sound effects:
- **Cash Register Sound**: Plays when a correct answer is given
- **Error Sound**: Plays when an incorrect answer is given
- **Harp Sound**: Plays when "Reveal All" is clicked

All sounds are embedded in the code and play at 30% volume for a pleasant experience.

## 🎨 Design Features

### Baby Animal Decorations:
- **Floating baby animals** in the background (chicks, bunnies, bears, koalas, foxes, frogs, pigs, dogs)
- **Large animals** at the bottom (giraffes, elephants, hippos, kangaroos)
- **Paw print decorations** in the corners of game screens
- **Subtle animations** with floating effects
- **Responsive design** - decorations hide on mobile devices

### Color Scheme:
- **Primary green**: `#8FBC8F` (Dark Sea Green)
- **Secondary brown**: `#D2B48C` (Tan)
- **Dark green**: `#2F4F2F` (Dark Olive Green)
- **Light brown**: `#556B2F` (Dark Olive Green)

## 🚀 How to Run

1. **Simple Setup**: Just open `index.html` in any modern web browser
2. **No Installation Required**: Works offline - perfect for baby shower venues
3. **Share**: You can host this on any web server or use it locally
4. **Admin Access**: Open `admin.html` for the cheat sheet

## 🎨 Customization

### Adding New Questions
Edit the `questions` array in both `script.js` and `admin.js`:

```javascript
{
    question: "Your new question here?",
    answers: [
        { text: "Answer 1", points: 25 },
        { text: "Answer 2", points: 20 },
        // ... more answers
    ]
}
```

### Changing Colors
The game uses a beautiful nature-inspired color scheme:
- Primary green: `#8FBC8F` (Dark Sea Green)
- Secondary brown: `#D2B48C` (Tan)
- Dark green: `#2F4F2F` (Dark Olive Green)
- Light brown: `#556B2F` (Dark Olive Green)

## 📱 Mobile Friendly

The game is fully responsive and works great on:
- Smartphones
- Tablets
- Laptops
- Desktop computers

## 🎉 Perfect for Baby Showers

- **No Setup Required**: Just open and play
- **Baby-Themed Questions**: All questions relate to babies and parenting
- **Team Building**: Encourages interaction between guests
- **Fun for All Ages**: Accessible to everyone at the shower
- **Beautiful Design**: Nature-inspired theme with baby animal decorations
- **Interactive Input**: Makes the game more engaging and fun
- **Admin Controls**: Easy management for the game host
- **Sound Effects**: Adds excitement and feedback

## 🎵 Optional Enhancements

The code includes placeholders for:
- Additional sound effects
- Confetti animations
- Additional questions

You can easily add these features by implementing the placeholder functions.

## 📄 Files Included

- `index.html` - Main game interface
- `admin.html` - Admin cheat sheet page
- `styles.css` - Beautiful nature-themed styling with baby animal decorations
- `script.js` - Main game logic and questions
- `admin.js` - Admin page logic
- `README.md` - This instruction file

## 🎊 Have Fun!

This game is designed to bring laughter and fun to your baby shower. The new features make it even more interactive and easy to manage for the perfect baby shower experience!

---

*Created with ❤️ for baby showers everywhere* 