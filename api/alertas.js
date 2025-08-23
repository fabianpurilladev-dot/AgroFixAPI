import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

// GET /alertas
router.get('/', async (_, res) => {
  const { data, error } = await supabase.from('alertas').select('*').order('fecha_alerta', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// PUT /alertas/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('alertas').update(req.body).eq('id_alerta', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Alerta actualizada' });
});

export default router;
