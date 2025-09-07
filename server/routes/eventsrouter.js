const express = require('express');
const router = express.Router();

const eventcontroller = require('../controllers/events.js');
router.get('/', eventcontroller.getAllEvents);
router.get('/ID/:clubId', eventcontroller.getEventByClub);
router.get('/upcoming', eventcontroller.getUpcomingEvents);
router.post('/', eventcontroller.createEvent);
router.put('/:id', eventcontroller.updateEvent);
router.delete('/:id', eventcontroller.deleteEvent);
module.exports = router;