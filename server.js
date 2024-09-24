const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let songs = [
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

// Get all songs
app.get("/api/songs", (req, res) => {
  res.json(songs);
});

// Create a new song
app.post("/api/songs", (req, res) => {
  const newSong = req.body;
  songs.push(newSong);
  res.status(201).json(newSong);
});

// Update a song
app.put("/api/songs/:id", (req, res) => {
  const { id } = req.params;
  const updatedSong = req.body;
  songs = songs.map((song) => (song.songid === id ? updatedSong : song));
  res.json(updatedSong);
});

// Delete a song
app.delete("/api/songs/:id", (req, res) => {
  const { id } = req.params;
  songs = songs.filter((song) => song.songid !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
