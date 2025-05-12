const config = require('../Components/ConfigIp');

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",   // Asegúrate de que tu base de datos está en localhost
    user: "root",        // Tu usuario de la base de datos
    password: "",        // Tu contraseña de la base de datos (si tiene)
    database: "coursedb" // Nombre de la base de datos
});

// Verificar conexión
db.connect((err) => {
    if (err) {
        console.error("Error de conexión a la base de datos: " + err.stack);
        return;
    }
    console.log("Conectado a la base de datos con el id: " + db.threadId);
});

// Create a new course
app.post("/courses", (req, res) => {
    const { courseName, description } = req.body;
    if (!courseName || !description) {
        return res.status(400).json({ message: "Course name and description are required." });
    }

    const sql = "INSERT INTO courses (courseName, description) VALUES (?, ?)";
    db.query(sql, [courseName, description], (err, result) => {
        if (err) return res.status(500).json({ message: "Error creating course." });
        return res.status(201).json({ message: "Course created successfully.", id: result.insertId });
    });
});

// Get all courses
app.get("/courses", (req, res) => {
    const sql = "SELECT * FROM courses";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ message: "Error retrieving courses." });
        return res.json(data);
    });
});


// Get a single course by ID
app.get("/courses/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM courses WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ message: "Error retrieving the course." });
        if (data.length === 0) return res.status(404).json({ message: "Course not found." });
        return res.json(data[0]);
    });
});

// Update a course
app.put("/courses/:id", (req, res) => {
    const { id } = req.params;
    const { courseName, description } = req.body;
    if (!courseName || !description) {
        return res.status(400).json({ message: "Course name and description are required." });
    }

    const sql = "UPDATE courses SET courseName = ?, description = ? WHERE id = ?";
    db.query(sql, [courseName, description, id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error updating course." });
        return res.json({ message: "Course updated successfully." });
    });
});

// Delete a course
app.delete("/courses/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM courses WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error deleting course." });
        return res.json({ message: "Course deleted successfully." });
    });
});

const PORT = 8080; // HARDCODEA EL PUERTO

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
