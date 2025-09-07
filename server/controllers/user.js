
const dbPromise = require('../db');

exports.getAllUsers = async (req, res) => {
  try {
    const db = await dbPromise;

    const [users] = await db.query("SELECT * FROM user");

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;

    const [user] = await db.query("SELECT * FROM user WHERE id = ?", [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    
    res.status(200).json(user[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const db = await dbPromise;
    const { user_name, email, password, user_role, college_id } = req.body;

    const [rows] = await db.query("SELECT MAX(id) as maxId FROM user");
    const newId = (rows[0].maxId || 0) + 1;
    
    const sql = "INSERT INTO user (id, user_name, email, password, user_role, college_id) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [newId, user_name, email, password, user_role, college_id]);
    
    res.status(201).json({ 
      message: "User created successfully", 
      userId: newId 
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;
    const { user_name, email, password, user_role, college_id } = req.body;
    const sql = "UPDATE user SET user_name = ?, email = ?, password = ?, user_role = ?, college_id = ? WHERE id = ?";
    const [result] = await db.query(sql, [user_name, email, password, user_role, college_id, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User updated successfully." });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;
    const sql = "DELETE FROM user WHERE id = ?";
    const [result] = await db.query(sql, [id]); 
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: err.message });
  }
};