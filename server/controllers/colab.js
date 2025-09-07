const dbPromise = require('../db');

exports.getAllColabforClub = async (req, res) => {
    try {
        const db = await dbPromise;
        const { clubId } = req.params;
        const [colabs] = await db.query("SELECT * FROM collab_request WHERE to_club_id = ?", [clubId]);

        if (colabs.length === 0) {
            return res.status(404).json({ message: "No collaborations found for this club." });
        }
        res.status(200).json(colabs);
    } catch (err) {
        console.error("Error fetching collaborations by club:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllpendingColabforClub = async (req, res) => {
    try {
        const db = await dbPromise;
        const { clubId } = req.params;
        const [colabs] = await db.query("SELECT * FROM collab_request WHERE to_club_id = ? AND status = 'pending'", [clubId]);
        if (colabs.length === 0) {
            return res.status(404).json({ message: "No pending collaborations found for this club." });
        }
        res.status(200).json(colabs);
    } catch (err) {
        console.error("Error fetching pending collaborations by club:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.sendCollabRequest = async (req, res) => {
    try {
        const db = await dbPromise;
        const { from_club_id, to_club_id, event_id, status, request_date } = req.body;

        // Find the maximum existing request_id
        const [rows] = await db.query("SELECT MAX(request_id) as maxId FROM collab_request");
        const newId = (rows[0].maxId || 0) + 1;

        const sql = `
            INSERT INTO collab_request (request_id, from_club_id, to_club_id, event_id, status, request_date) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, [newId, from_club_id, to_club_id, event_id, status, request_date]);

        res.status(201).json({ 
            message: "Collaboration request sent successfully", 
            requestId: newId 
        });
    } catch (err) {
        console.error("Error sending collaboration request:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.acceptCollabRequest = async (req, res) => {
    try {
        const db = await dbPromise;
        const { id } = req.params; // Get the request_id from the URL parameters

        // The SQL query only updates the 'status' field
        const sql = `
            UPDATE collab_request 
            SET status = 'accepted'
            WHERE request_id = ?
        `;

        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Collaboration request not found." });
        }

        res.status(200).json({ message: "Collaboration request status updated to 'accepted'." });
    } catch (err) {
        console.error("Error accepting collaboration request:", err);
        res.status(500).json({ error: err.message });
    }
};