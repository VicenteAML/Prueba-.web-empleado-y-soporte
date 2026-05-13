const express = require('express')
const db = require('./db')
const app = express()
const port = 3000

app.use(express.json())

// TICKETS_SOPORTE
app.post('/tickets_soporte', async (req, res) => {
  const { asunto, descripcion, prioridad, fecha_creacion, estado, canal, tiempo_resolucion_horas } = req.body
  if (!asunto || !descripcion || !prioridad || !fecha_creacion || !estado || !canal) {
    return res.status(400).json({ error: 'Campos obligatorios: asunto, descripcion, prioridad, fecha_creacion, estado, canal' })
  }
  if (tiempo_resolucion_horas !== undefined && tiempo_resolucion_horas < 0) {
    return res.status(400).json({ error: 'tiempo_resolucion_horas debe ser >= 0' })
  }
  try {
    const [result] = await db.query(
      'INSERT INTO tickets_soporte (asunto, descripcion, prioridad, fecha_creacion, estado, canal, tiempo_resolucion_horas) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [asunto, descripcion, prioridad, fecha_creacion, estado, canal, tiempo_resolucion_horas || null]
    )
    res.status(201).json({ id: result.insertId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/tickets_soporte', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tickets_soporte')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/tickets_soporte/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tickets_soporte WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/tickets_soporte/:id', async (req, res) => {
  const { asunto, descripcion, prioridad, fecha_creacion, estado, canal, tiempo_resolucion_horas } = req.body
  if (!asunto || !descripcion || !prioridad || !fecha_creacion || !estado || !canal) {
    return res.status(400).json({ error: 'Campos obligatorios: asunto, descripcion, prioridad, fecha_creacion, estado, canal' })
  }
  if (tiempo_resolucion_horas !== undefined && tiempo_resolucion_horas < 0) {
    return res.status(400).json({ error: 'tiempo_resolucion_horas debe ser >= 0' })
  }
  try {
    const [result] = await db.query(
      'UPDATE tickets_soporte SET asunto=?, descripcion=?, prioridad=?, fecha_creacion=?, estado=?, canal=?, tiempo_resolucion_horas=? WHERE id=?',
      [asunto, descripcion, prioridad, fecha_creacion, estado, canal, tiempo_resolucion_horas || null, req.params.id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' })
    res.json({ mensaje: 'Actualizado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete('/tickets_soporte/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM tickets_soporte WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' })
    res.json({ mensaje: 'Eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// EMPLEADOS_RRHH
app.post('/empleados_rrhh', async (req, res) => {
  const { nombres, cargo, salario, fecha_ingreso, departamento } = req.body
  if (!nombres || !cargo || salario === undefined || !fecha_ingreso || !departamento) {
    return res.status(400).json({ error: 'Campos obligatorios: nombres, cargo, salario, fecha_ingreso, departamento' })
  }
  try {
    const [result] = await db.query(
      'INSERT INTO empleados_rrhh (nombres, cargo, salario, fecha_ingreso, departamento) VALUES (?, ?, ?, ?, ?)',
      [nombres, cargo, salario, fecha_ingreso, departamento]
    )
    res.status(201).json({ id: result.insertId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/empleados_rrhh', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM empleados_rrhh')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/empleados_rrhh/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM empleados_rrhh WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/empleados_rrhh/:id', async (req, res) => {
  const { nombres, cargo, salario, fecha_ingreso, departamento } = req.body
  if (!nombres || !cargo || salario === undefined || !fecha_ingreso || !departamento) {
    return res.status(400).json({ error: 'Campos obligatorios: nombres, cargo, salario, fecha_ingreso, departamento' })
  }
  try {
    const [result] = await db.query(
      'UPDATE empleados_rrhh SET nombres=?, cargo=?, salario=?, fecha_ingreso=?, departamento=? WHERE id=?',
      [nombres, cargo, salario, fecha_ingreso, departamento, req.params.id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' })
    res.json({ mensaje: 'Actualizado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete('/empleados_rrhh/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM empleados_rrhh WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' })
    res.json({ mensaje: 'Eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`API corriendo en puerto ${port}`)
})