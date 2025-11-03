import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

// POST /conductores
router.post('/', async (req, res) => {
  const { id_conductor, ...data } = req.body;
  const { error } = await supabase.from('conductores').insert([data]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Conductor registrado' });
});

// GET /conductores
router.get('/', async (_, res) => {
  const { data, error } = await supabase.from('conductores').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// PUT /conductores/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('conductores')
    .update(req.body)
    .eq('id_conductor', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Conductor actualizado' });
});
export default router;
