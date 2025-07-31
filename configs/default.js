// Default Baby Shower Family Feud Questions Configuration
const defaultConfig = {
    title: "Baby Shower Family Feud",
    teamNames: {
        default1: "Team Forest",
        default2: "Team Meadow"
    },
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
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = defaultConfig;
} else {
    window.gameConfig = defaultConfig;
}