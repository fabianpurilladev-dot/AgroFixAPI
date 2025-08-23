import sql from "db.js";

async function testConnection() {
  try {
    const result = await sql`select now()`
    console.log("Conexión exitosa:", result[0])
  } catch (err) {
    console.error("Error al conectar a la BD:", err)
  } finally {
    await sql.end({ timeout: 5 })
  }
}

testConnection()