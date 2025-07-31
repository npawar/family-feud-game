// Wedding Shower Family Feud Questions Configuration
const weddingConfig = {
    title: "Wedding Shower Family Feud",
    teamNames: {
        default1: "Team Bride",
        default2: "Team Groom"
    },
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
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = weddingConfig;
} else {
    window.gameConfig = weddingConfig;
}