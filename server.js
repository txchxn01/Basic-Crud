const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const session = require('express-session');

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
}));

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let song = [
  {
    songid: "1",
    song: "Homesick",
    band: "Wave to Earth",
  },
  {
    songid: "2",
    song: "Starlight",
    band: "Echoes of Dawn",
  },
  {
    songid: "3",
    song: "Lost in Time",
    band: "Silent Horizons",
  },
  {
    songid: "4",
    song: "Whispers",
    band: "Moonlit Shadows",
  },
  {
    songid: "5",
    song: "Chasing Dreams",
    band: "Radiant Skies",
  },
  {
    songid: "6",
    song: "Eternal Waves",
    band: "Sonic Voyage",
  },
  {
    songid: "7",
    song: "Fading Echoes",
    band: "Nebula Sound",
  },
  {
    songid: "8",
    song: "Midnight Run",
    band: "Starlit Journey",
  },
  {
    songid: "9",
    song: "Distant Shores",
    band: "The Ocean's Call",
  },
  {
    songid: "10",
    song: "Rise Again",
    band: "Boundless Spirit",
  },
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === 'admin' && password === '1234') {
        req.session.user = username;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ message: 'Logout successful' });
  });
});

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.status(403).json({ message: 'You must be logged in to perform this action' });
        alert("Please login");
    }
}
app.get('/api/song', (req, res) => {
  res.json(song);
});
app.post("/api/songs", isAuthenticated, (req, res) => {
    const newSong = req.body;
    song.push(newSong);
    res.status(201).json(newSong);
});

app.put("/api/songs/:id", isAuthenticated, (req, res) => {
    const { id } = req.params;
    const updatedSong = req.body;
    song = song.map((song) => (song.songid === id ? updatedSong : song));
    res.json(updatedSong);
});

app.delete("/api/songs/:id", isAuthenticated, (req, res) => {
    const { id } = req.params;
    song = song.filter((song) => song.songid !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
