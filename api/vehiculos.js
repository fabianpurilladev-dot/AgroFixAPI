import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

// POST /vehiculos
router.post('/', async (req, res) => {
  const { id_vehiculo, ...data } = req.body;
  const { error } = await supabase.from('vehiculos').insert([data]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Vehículo registrado' });
});

// GET /vehiculos
router.get('/', async (_, res) => {
  const { data, error } = await supabase.from('vehiculos').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// PUT /vehiculos/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('vehiculos').update(req.body).eq('id_vehiculo', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Vehículo actualizado' });
});

export default router;
