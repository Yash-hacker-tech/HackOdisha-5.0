const dbPromise = require('../db');

exports.getAllClubs = async (req, res) => {
  try {
    const db = await dbPromise;

    const [clubs] = await db.query("SELECT * FROM club");
    res.status(200).json(clubs);
  } catch (err) {
    console.error("Error fetching clubs:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getClubsByCollege = async (req, res) => {
  try {
    const db = await dbPromise;
    const { collegeId } = req.params;

    const [clubs] = await db.query("SELECT * FROM club WHERE college_id = ?", [collegeId]);

    if (clubs.length === 0) {
      return res.status(404).json({ message: "No clubs found for this college." });
    }

    res.status(200).json(clubs);
  } catch (err) {
    console.error("Error fetching clubs by college:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createClub = async (req, res) => {
  try {
    const db = await dbPromise;
    const { club_name, domain, college_id,created_by } = req.body;
    const [rows] = await db.query("SELECT MAX(club_id) as maxId FROM club");
    const newId = (rows[0].maxId || 0) + 1;
    const sql = "INSERT INTO club (club_id, club_name, domain, college_id, created_by) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [newId, club_name, domain, college_id,created_by]);
    res.status(201).json({ 
      message: "Club created successfully", 
      clubId: newId 
    });
  } catch (err) {
    console.error("Error creating club:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateClub = async (req, res) => {
  try {
    const db = await dbPromise;
    const { clubId } = req.params;
    const { club_name, domain, college_id, created_by } = req.body; // Include created_by if needed

    const sql = "UPDATE club SET club_name = ?, domain = ?, college_id = ?, created_by = ? WHERE club_id = ?";
    const [result] = await db.query(sql, [club_name, domain, college_id, created_by, clubId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Club not found." });
    }
    res.status(200).json({ message: "Club updated successfully." });
  } catch (err) {
    console.error("Error updating club:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClub = async (req, res) => {
  try {
    const db = await dbPromise;
    const { clubId } = req.params;
    const sql = "DELETE FROM club WHERE club_id = ?";
    const [result] = await db.query(sql, [clubId]); // Use clubId from req.params
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Club not found." });
    }
    res.status(200).json({ message: "Club deleted successfully." });
    } catch (err) {
    console.error("Error deleting club:", err);
    res.status(500).json({ error: err.message });
  }
};