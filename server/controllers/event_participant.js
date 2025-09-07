const dbPromise = require('../db');

exports.getAlleventParticipants = async (req, res) => {
  try {
    const db = await dbPromise;
    const [participants] = await db.query("SELECT * FROM event_participant");
    res.status(200).json(participants);
  } catch (err) {
    console.error("Error fetching event participants:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getEventParticipantsByEvent = async (req, res) => {
    try {
        const db = await dbPromise;
        const { eventId } = req.params;
        const [participants] = await db.query("SELECT * FROM event_participant WHERE event_id = ?", [eventId]);
        if (participants.length === 0) {
            return res.status(404).json({ message: "No participants found for this event." });
        }
        res.status(200).json(participants);
    } catch (err) {
        console.error("Error fetching event participants by event:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.registerForEvent = async (req, res) => {
  try {
    const db = await dbPromise;
    const { event_id, user_id, participation_status, feedback } = req.body;

    if (!event_id || !user_id) {
      return res.status(400).json({ error: "Missing required fields: event_id and user_id." });
    }

    // Check if the user is already registered for the event
    const [existingParticipant] = await db.query("SELECT participant_id FROM event_participant WHERE event_id = ? AND user_id = ?", [event_id, user_id]);

    if (existingParticipant.length > 0) {
      return res.status(409).json({ error: "User is already registered for this event." });
    }

    // Step 1: Find the current maximum participant_id in the table
    const [rows] = await db.query("SELECT MAX(participant_id) as maxId FROM event_participant");
    const newId = (rows[0].maxId || 0) + 1;

    // Step 2: Insert the new participant with the manually assigned ID
    const sql = "INSERT INTO event_participant (participant_id, event_id, user_id, participation_status, feedback) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [newId, event_id, user_id, participation_status, feedback]);

    res.status(201).json({
      message: "Successfully registered for the event",
      participantId: newId
    });
  } catch (err) {
    console.error("Error registering for event:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateEventParticipant = async (req, res) => {
    try {
        const db = await dbPromise;
        const { participantId } = req.params;
        const { participation_status, feedback } = req.body;
        const sql = "UPDATE event_participant SET participation_status = ?, feedback = ? WHERE participant_id = ?";
        const [result] = await db.query(sql, [participation_status, feedback, participantId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Participant not found." });
        }
        res.status(200).json({ message: "Participant updated successfully." });
    } catch (err) {
        console.error("Error updating participant:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEventParticipant = async (req, res) => {
    try {
        const db = await dbPromise;
        const { participantId } = req.params;
        const sql = "DELETE FROM event_participant WHERE participant_id = ?";
        const [result] = await db.query(sql, [participantId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Participant not found." });
        }
        res.status(200).json({ message: "Participant deleted successfully." });
    } catch (err) {
        console.error("Error deleting participant:", err);
        res.status(500).json({ error: err.message });
    }
};