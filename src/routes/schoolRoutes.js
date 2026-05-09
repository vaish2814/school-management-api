const express = require("express");

const {
    createSchool,
    fetchSchools
} = require("../controllers/schoolController");

const router = express.Router();

router.post("/addSchool", createSchool);

router.get("/listSchools", fetchSchools);

module.exports = router;