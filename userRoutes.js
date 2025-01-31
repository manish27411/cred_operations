const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const router = express.Router();

// GET all users
router.get("/", (req, res) => {
    return res.json(users);
});

// GET a specific user by ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
});

// POST a new user
router.post("/", (req, res) => {
    const newUser = req.body;
    users.push({ ...newUser, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to save user data" });
        }
        return res.status(201).json(newUser);
    });
});

// PUT (update) a user by ID
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    users[index] = { ...users[index], ...req.body };
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update user data" });
        }
        return res.json(users[index]);
    });
});

// DELETE a user by ID
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    const deletedUser = users.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving data" });
        }
        return res.status(200).json({ message: "User deleted", deletedUser });
    });
});

module.exports = router;