const dbPromise = require('../db');


exports.getAllEvents = async (req, res) => {
    try {
        const db = await dbPromise;

        const [events] = await db.query("SELECT * FROM events");
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getEventByClub = async (req, res) => {
    try {
        const db = await dbPromise;
        const { clubId } = req.params;
        const [events] = await db.query("SELECT * FROM events WHERE club_id = ?", [clubId]);

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found for this club." });
        }
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching events by club:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getUpcomingEvents = async (req, res) => {
  try {
    const db = await dbPromise;
    const currentDate = new Date().toISOString().slice(0, 10); // Format as YYYY-MM-DD

    const [events] = await db.query("SELECT * FROM events WHERE event_date >= ?", [currentDate]);

    if (events.length === 0) {
      return res.status(404).json({ message: "No upcoming events found." });
    }

    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching upcoming events:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const db = await dbPromise;
    const { event_name, event_date, event_start_time, event_end_time, location, description, club_id, created_by, visibility } = req.body;

    if (!event_name || !event_date || !club_id || !created_by) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    
    const [rows] = await db.query("SELECT MAX(event_id) as maxId FROM events");
    const newId = (rows[0].maxId || 0) + 1;
    
    const sql = "INSERT INTO events (event_id, event_name, event_date, event_start_time, event_end_time, location, description, club_id, created_by, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [newId, event_name, event_date, event_start_time, event_end_time, location, description, club_id, created_by, visibility]);

    res.status(201).json({
      message: "Event created successfully",
      eventId: newId 
    });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const db = await dbPromise;
    const { eventId } = req.params;
    const { event_name, event_date, event_start_time, event_end_time, location, description, club_id, created_by, visibility } = req.body;
    const sql = "UPDATE events SET event_name = ?, event_date = ?, event_start_time = ?, event_end_time = ?, location = ?, description = ?, club_id = ?, created_by = ?, visibility = ? WHERE event_id = ?";
    const [result] = await db.query(sql, [event_name, event_date, event_start_time, event_end_time, location, description, club_id, created_by, visibility, eventId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json({ message: "Event updated successfully." });
  }catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
    try {
        const db = await dbPromise;
        const { eventId } = req.params;
        const sql = "DELETE FROM events WHERE event_id = ?";
        const [result] = await db.query(sql, [eventId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Event not found." });
        }
        res.status(200).json({ message: "Event deleted successfully." });
    } catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).json({ error: err.message });
    }
};