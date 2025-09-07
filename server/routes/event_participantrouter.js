const express = require('express');
const router = express.Router();

const eventparticipantcontroller = require('../controllers/event_participant.js');

router.get('/', eventparticipantcontroller.getAlleventParticipants);
router.get('/:eventId', eventparticipantcontroller.getEventParticipantsByEvent);
router.post('/', eventparticipantcontroller.registerForEvent);
router.delete('/:id', eventparticipantcontroller.deleteEventParticipant);
router.put('/:id', eventparticipantcontroller.updateEventParticipant);
module.exports = router;