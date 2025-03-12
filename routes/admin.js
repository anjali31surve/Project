const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

const db = require ("../database/database.ejs");



// Route for the admin dashboard
router.get("/dashboard", (req, res) => {
    res.render("layout", { component: "dashboard.ejs" });
});

// Route for pet listings
router.get("/pet-listings", (req, res) => {
    const sql = "SELECT name, category, breed, age, description, image_url FROM pets"; // Modify according to your DB schema
    
    db.all(sql, [], (err, pets) => {
        console.log(pets)
        if (err) {
            console.error(err.message);
            return res.status(500).send("Database error");
        }
        res.render("layout", { component: "pet-listings", pets });
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




