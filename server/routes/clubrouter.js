const express = require('express');
const router = express.Router();

const clubController = require('../controllers/clubs.js');

router.get('/', clubController.getAllClubs);
router.get('/:collegeId', clubController.getClubsByCollege);
router.post('/', clubController.createClub);
module.exports = router;