import express from 'express';
import authRoutes from './api/auth.js';
import usuarioRoutes from './api/usuarios.js';
import vehiculoRoutes from './api/vehiculos.js';
import mantenimientoRoutes from './api/mantenimientos.js';
import alertaRoutes from './api/alertas.js';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/vehiculos', vehiculoRoutes);
app.use('/mantenimientos', mantenimientoRoutes);
app.use('/alertas', alertaRoutes);

app.get('/', (req, res) => res.send('API AgroFix funcionando 🚜'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
