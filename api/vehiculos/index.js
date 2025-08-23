// /api/vehiculos/index.js
import { pool } from "../../../lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { rows } = await pool.query("SELECT * FROM vehiculos ORDER BY id_vehiculo ASC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor", details: error.message });
  }
}