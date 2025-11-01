import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

// POST /mantenimientos
router.post('/', async (req, res) => {
  const { error } = await supabase.from('mantenimientos').insert([req.body]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Mantenimiento registrado' });
});

// GET /mantenimientos
router.get('/', async (req, res) => {
  const { tipo } = req.query;

  // Selección con join a la tabla de vehículos
  let query = supabase
    .from('mantenimientos')
    .select(`
      id_mantenimiento,
      tipo,
      tipo_mantenimiento,
      descripcion,
      fecha_programada,
      kilometraje_programado,
      fecha_falla,
      fecha_reparacion,
      estado,
      costo_estimado,
      costo,
      observaciones,
      vehiculos (
        placa,
        marca,
        modelo
      )
    `);

  if (tipo) {
    query = query.eq('tipo', tipo);
  }

  const { data, error } = await query;

  if (error) return res.status(400).json({ error: error.message });

  // Mapear la respuesta para reemplazar id_vehiculo por información legible
  const result = data.map((item) => ({
    ...item,
    vehiculo: `${item.vehiculos.marca} ${item.vehiculos.modelo} (${item.vehiculos.placa})`,
  }));

  res.json(result);
});


// PUT /mantenimientos/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('mantenimientos')
    .update(req.body)
    .eq('id_mantenimiento', id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Mantenimiento actualizado' });
});

export default router;