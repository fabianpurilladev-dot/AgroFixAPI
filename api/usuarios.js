import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

// GET /usuarios/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('usuarios')
    .select('*, conductores(*)')
    .eq('id_usuario', id)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// PUT /usuarios/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { error } = await supabase
    .from('usuarios')
    .update(updates)
    .eq('id_usuario', id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Usuario actualizado correctamente' });
});

export default router;
