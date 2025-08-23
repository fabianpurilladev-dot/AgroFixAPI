import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

// POST /mantenimientos
router.post('/', async (req, res) => {
  const { tipo, ...rest } = req.body;
  const tabla = tipo === 'preventivo' ? 'mantenimientos_preventivos' : 'mantenimientos_reactivos';

  const { error } = await supabase.from(tabla).insert([rest]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Mantenimiento registrado' });
});

// GET /mantenimientos
router.get('/', async (req, res) => {
  const { tipo } = req.query;
  let tabla = 'mantenimientos_preventivos';
  if (tipo === 'reactivo') tabla = 'mantenimientos_reactivos';

  const { data, error } = await supabase.from(tabla).select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// PUT /mantenimientos/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { tipo, ...rest } = req.body;
  const tabla = tipo === 'preventivo' ? 'mantenimientos_preventivos' : 'mantenimientos_reactivos';

  const { error } = await supabase.from(tabla).update(rest).eq(`id_${tipo}`, id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Mantenimiento actualizado' });
});

export default router;
