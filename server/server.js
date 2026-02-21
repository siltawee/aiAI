const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Username already exists" });
    }
    res.json({ message: "User registered successfully" });
  });
});

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, result) => {
    if (result.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ message: "Login successful", username: user.username });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));

/* ===== GET USER PROFILE ===== */
app.get("/user/:username", (req, res) => {
  const username = req.params.username;

  db.query(
    "SELECT username, email FROM users WHERE username=?",
    [username],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(result[0]);
    }
  );
});

/* ===== UPDATE USER PROFILE ===== */
app.put("/user/:username", (req, res) => {
  const username = req.params.username;
  const { email, password } = req.body;

  const bcrypt = require("bcrypt");

  if (password) {
    bcrypt.hash(password, 10, (err, hash) => {
      db.query(
        "UPDATE users SET email=?, password=? WHERE username=?",
        [email, hash, username],
        () => res.json({ message: "Profile updated" })
      );
    });
  } else {
    db.query(
      "UPDATE users SET email=? WHERE username=?",
      [email, username],
      () => res.json({ message: "Profile updated" })
    );
  }
});
