const express = require("express");
const router = express.Router();

const db = require ("../database/database.ejs");



// Route for the admin dashboard
router.get("/dashboard", (req, res) => {
    res.render("layout", { component: "dashboard.ejs" });
});

// Route for pet listings
router.get("/pet-listings", (req, res) => {
    const sql = `SELECT * FROM pets`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log("Fetched pets:", rows); // ✅ Check if rows contain data
        res.render("layout", { component: "pet-listings", pets: rows });
    });
});


// Route for adoption requests
router.get("/adoption-requests", (req, res) => {
    res.render("layout", { component: "adoption-requests.ejs" });
});

// Route for donations
router.get("/donations", (req, res) => {
    res.render("layout", { component: "donations.ejs" });
});

// Route for analytics
router.get("/analytics", (req, res) => {
    res.render("layout", { component: "analytics.ejs" });
});

// Route for messaging
router.get("/messaging", (req, res) => {
    res.render("layout", { component: "messaging.ejs" });
});

// Route for get involved
router.get("/get-involved", (req, res) => {
    res.render("layout", { component: "get-involved.ejs" });
});

// Route for settings
router.get("/settings", (req, res) => {
    res.render("layout", { component: "settings.ejs" });
});

// Route for user management
router.get("/user-management", (req, res) => {
    res.render("layout", { component: "user-management.ejs" });
});

module.exports = router;