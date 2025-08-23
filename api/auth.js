import express from 'express';
import supabase from '../supabaseClient.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// POST /auth/register
router.post('/register', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(password, salt);

  const { error } = await supabase.from('usuarios').insert([
    { nombre, email, password_hash, rol }
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Usuario registrado correctamente' });
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) return res.status(400).json({ error: 'Usuario no encontrado' });

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

  res.json({ message: 'Login exitoso', user: { id: user.id_usuario, rol: user.rol } });
});

export default router;