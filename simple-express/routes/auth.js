const express = require("express");
const router = express.Router();


router.get("/register", async (req, res) => {
    res.render("auth/register");
});

router.post("/register", async (req, res) => {
    res.send("this is post register");
});

router.get("/login", async (req, res) => {
    res.render("auth/login");
});

// router.post("/login", async (req, res) => {
//     res.send("this is post login");
// });

module.exports = router;