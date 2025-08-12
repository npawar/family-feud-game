const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Game session management
class GameSessionManager {
  constructor() {
    this.sessions = new Map();
  }

  generateGameCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  createSession(adminSocketId) {
    const gameCode = this.generateGameCode();
    const session = {
      gameCode,
      adminSocketId,
      players: new Set(),
      gameState: {
        currentRound: 0,
        team1Score: 0,
        team2Score: 0,
        team1Name: 'Team Forest',
        team2Name: 'Team Meadow',
        currentTeam: 1,
        revealedAnswers: 0,
        currentQuestionIndex: 0,
        config: 'default',
        isGameStarted: false,
        questions: null
      },
      createdAt: new Date()
    };
    
    this.sessions.set(gameCode, session);
    console.log(`Created new game session: ${gameCode}`);
    return session;
  }

  getSession(gameCode) {
    return this.sessions.get(gameCode);
  }

  addPlayer(gameCode, socketId) {
    const session = this.sessions.get(gameCode);
    if (session) {
      session.players.add(socketId);
      console.log(`Player ${socketId} joined game ${gameCode}`);
      return true;
    }
    return false;
  }

  removePlayer(gameCode, socketId) {
    const session = this.sessions.get(gameCode);
    if (session) {
      session.players.delete(socketId);
      console.log(`Player ${socketId} left game ${gameCode}`);
    }
  }

  updateGameState(gameCode, updates) {
    const session = this.sessions.get(gameCode);
    if (session) {
      Object.assign(session.gameState, updates);
      return session.gameState;
    }
    return null;
  }

  deleteSession(gameCode) {
    const deleted = this.sessions.delete(gameCode);
    if (deleted) {
      console.log(`Deleted game session: ${gameCode}`);
    }
    return deleted;
  }

  cleanupExpiredSessions() {
    const now = new Date();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    for (const [gameCode, session] of this.sessions.entries()) {
      if (now - session.createdAt > maxAge) {
        this.deleteSession(gameCode);
      }
    }
  }
}

const gameManager = new GameSessionManager();

// Clean up expired sessions every hour
setInterval(() => {
  gameManager.cleanupExpiredSessions();
}, 60 * 60 * 1000);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Admin creates a new game
  socket.on('createGame', (callback) => {
    const session = gameManager.createSession(socket.id);
    socket.join(session.gameCode);
    socket.gameCode = session.gameCode;
    socket.isAdmin = true;
    
    callback({
      success: true,
      gameCode: session.gameCode,
      gameState: session.gameState
    });
  });

  // Player joins existing game
  socket.on('joinGame', (data, callback) => {
    const { gameCode } = data;
    const session = gameManager.getSession(gameCode);
    
    if (!session) {
      callback({
        success: false,
        error: 'Game not found'
      });
      return;
    }

    socket.join(gameCode);
    socket.gameCode = gameCode;
    socket.isAdmin = false;
    gameManager.addPlayer(gameCode, socket.id);

    callback({
      success: true,
      gameCode,
      gameState: session.gameState
    });

    // Notify admin that a player joined
    socket.to(session.adminSocketId).emit('playerJoined', {
      playerId: socket.id,
      playerCount: session.players.size
    });
  });

  // Admin updates game state
  socket.on('updateGameState', (updates) => {
    if (!socket.isAdmin || !socket.gameCode) {
      return;
    }

    const newGameState = gameManager.updateGameState(socket.gameCode, updates);
    if (newGameState) {
      // Broadcast to all players in the game
      socket.to(socket.gameCode).emit('gameStateUpdated', newGameState);
    }
  });

  // Admin starts the game
  socket.on('startGame', (gameData) => {
    if (!socket.isAdmin || !socket.gameCode) {
      return;
    }

    const updates = {
      isGameStarted: true,
      team1Name: gameData.team1Name || 'Team Forest',
      team2Name: gameData.team2Name || 'Team Meadow',
      config: gameData.config || 'default',
      questions: gameData.questions
    };

    const newGameState = gameManager.updateGameState(socket.gameCode, updates);
    if (newGameState) {
      // Broadcast to all players
      io.to(socket.gameCode).emit('gameStarted', newGameState);
    }
  });

  // Admin reveals an answer
  socket.on('revealAnswer', (answerData) => {
    if (!socket.isAdmin || !socket.gameCode) {
      return;
    }

    // Broadcast to all players
    socket.to(socket.gameCode).emit('answerRevealed', answerData);
  });

  // Admin updates scores
  socket.on('updateScore', (scoreData) => {
    if (!socket.isAdmin || !socket.gameCode) {
      return;
    }

    const updates = {
      team1Score: scoreData.team1Score,
      team2Score: scoreData.team2Score,
      currentTeam: scoreData.currentTeam
    };

    const newGameState = gameManager.updateGameState(socket.gameCode, updates);
    if (newGameState) {
      socket.to(socket.gameCode).emit('scoreUpdated', newGameState);
    }
  });

  // Admin changes round
  socket.on('changeRound', (roundData) => {
    if (!socket.isAdmin || !socket.gameCode) {
      return;
    }

    const updates = {
      currentRound: roundData.currentRound,
      currentQuestionIndex: roundData.currentQuestionIndex,
      revealedAnswers: 0 // Reset for new round
    };

    const newGameState = gameManager.updateGameState(socket.gameCode, updates);
    if (newGameState) {
      socket.to(socket.gameCode).emit('roundChanged', newGameState);
    }
  });

  // Admin undo action
  socket.on('undoAction', (undoData) => {
    if (!socket.isAdmin || !socket.gameCode) {
      return;
    }

    // Update the session game state
    const updates = undoData.gameState;
    const newGameState = gameManager.updateGameState(socket.gameCode, updates);
    
    if (newGameState) {
      // Broadcast the undo action with specific revealed answers data
      socket.to(socket.gameCode).emit('undoActionReceived', {
        gameState: newGameState,
        revealedAnswers: undoData.revealedAnswers
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    if (socket.gameCode) {
      const session = gameManager.getSession(socket.gameCode);
      
      if (socket.isAdmin) {
        // Admin disconnected - notify players and optionally end game
        socket.to(socket.gameCode).emit('adminDisconnected');
        // Optionally delete the session after a timeout
        setTimeout(() => {
          gameManager.deleteSession(socket.gameCode);
        }, 5 * 60 * 1000); // 5 minutes
      } else {
        // Player disconnected
        gameManager.removePlayer(socket.gameCode, socket.id);
        if (session) {
          socket.to(session.adminSocketId).emit('playerLeft', {
            playerId: socket.id,
            playerCount: session.players.size
          });
        }
      }
    }
  });
});

// API endpoints
app.get('/api/session/:gameCode', (req, res) => {
  const session = gameManager.getSession(req.params.gameCode);
  if (session) {
    res.json({
      exists: true,
      gameState: session.gameState,
      playerCount: session.players.size
    });
  } else {
    res.json({ exists: false });
  }
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, 'player.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to play!`);
});