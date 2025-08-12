# 🎮 Multiplayer Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Open Your Browser**
   - Admin/Host: `http://localhost:3000`
   - Players: `http://localhost:3000/player`

## How to Use Multiplayer

### For the Game Host (You):

1. **Open the admin interface** at `http://localhost:3000`
2. **Click "Host Multiplayer Game"** - you'll get a 6-character game code
3. **Share the game code** with your players
4. **Set up teams and theme** as usual
5. **Click "Start Game"** - all connected players will see the game begin
6. **Play normally** - your actions (revealing answers, updating scores) will be broadcast to all players in real-time

### For Players:

1. **Open the player interface** at `http://localhost:3000/player` on their phones
2. **Enter the game code** shared by the host
3. **Watch the game** - they'll see live updates as you play
4. **Read-only experience** - they can follow along but can't control the game

## Features

✅ **Real-time sync** - Players see answers revealed instantly  
✅ **Live scoring** - Score updates appear on all devices  
✅ **Team turn indicators** - Players know whose turn it is  
✅ **Automatic reconnection** - Handles network issues gracefully  
✅ **Mobile friendly** - Works great on phones and tablets  
✅ **Game codes** - Easy 6-character codes for joining  
✅ **Session management** - Automatic cleanup of old games  

## Network Setup Options

### Option 1: Local Network (Same WiFi)
- Everyone connects to your computer's IP address
- Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Players use: `http://YOUR_IP:3000/player`

### Option 2: Public Access (Advanced)
- Deploy to services like Heroku, Railway, or Vercel
- Use ngrok for temporary public access during your event

## Troubleshooting

**Players can't connect?**
- Make sure they're on the same WiFi network
- Check your computer's firewall settings
- Try using your computer's IP address instead of localhost

**Game code not working?**
- Game codes expire after 24 hours
- Make sure to create a new game before each event
- Check that the server is running

**Real-time updates not working?**
- Check browser console for errors
- Refresh the player pages
- Restart the server if needed

## Single Player Mode

You can still use the game in single player mode:
- Click "Single Player" instead of "Host Multiplayer Game"
- Game works exactly as before
- No network connection required

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

## Support

If you have issues, check the server console for error messages. The multiplayer system is designed to be robust and handle network issues gracefully.