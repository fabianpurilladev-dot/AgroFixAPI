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
  let query = supabase.from('mantenimientos_view').select('*');
  if (tipo) query = query.eq('tipo', tipo);
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  // opcional: mapear para anidar vehiculo o construir una cadena legible
  const result = data.map(item => ({
    ...item,
    vehiculo: item.marca && item.modelo && item.placa
      ? `${item.marca} ${item.modelo} (${item.placa})`
      : null
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