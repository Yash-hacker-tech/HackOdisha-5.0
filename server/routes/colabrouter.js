const express = require('express');
const router = express.Router();

const colabcontroller = require('../controllers/colab.js');
router.get('/:clubId', colabcontroller.getAllColabforClub);
router.get('/pending/:clubId', colabcontroller.getAllpendingColabforClub);
router.post('/', colabcontroller.sendCollabRequest);
router.put('/:id', colabcontroller.acceptCollabRequest);
module.exports = router;