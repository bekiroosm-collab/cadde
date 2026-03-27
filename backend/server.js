const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const matchRoutes = require('./routes/matchRoutes');
const teamRoutes = require('./routes/teamRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Make io accessible in routes
app.set('io', io);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinMatch', (matchId) => {
    socket.join(matchId);
    console.log(`User joined match room: ${matchId}`);
  });

  socket.on('leaveMatch', (matchId) => {
    socket.leave(matchId);
    console.log(`User left match room: ${matchId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Export for testing
