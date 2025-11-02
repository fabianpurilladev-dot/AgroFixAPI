import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

const TODAY = new Date().toISOString().split('T')[0]; // fecha actual en YYYY-MM-DD

// GET /alertas
router.get('/', async (_, res) => {
  try {
    const alerts = [];

    // 1. Licencias próximas a vencer (en 30 días)
    const licenseLimitDate = new Date();
    licenseLimitDate.setDate(licenseLimitDate.getDate() + 30);

    const { data: conductores, error: conductoresError } = await supabase
      .from('conductores')
      .select('*')
      .lte('licencia_vencimiento', licenseLimitDate.toISOString().split('T')[0]);

    if (conductoresError) throw conductoresError;

    conductores?.forEach((c) => {
      alerts.push({
        tipo: 'licencia_vencida',
        mensaje: `El conductor con DNI ${c.dni} tiene la licencia próxima a vencer el ${c.licencia_vencimiento}`,
        fecha_alerta: c.licencia_vencimiento,
      });
    });

    // 2. Mantenimientos preventivos próximos o pasados
    const maintenanceLimitDate = new Date();
    maintenanceLimitDate.setDate(maintenanceLimitDate.getDate() + 15);

    const { data: mantenimientos, error: mantenimientosError } = await supabase
      .from('mantenimientos')
      .select('*')
      .eq('tipo', 'preventivo')
      .lte('fecha_programada', maintenanceLimitDate.toISOString().split('T')[0]);

    if (mantenimientosError) throw mantenimientosError;

    mantenimientos?.forEach((m) => {
      alerts.push({
        tipo: 'mantenimiento_pendiente',
        mensaje: `Mantenimiento pendiente del vehículo ID ${m.id_vehiculo}: ${m.tipo_mantenimiento} programado para el ${m.fecha_programada}`,
        fecha_alerta: m.fecha_programada,
      });
    });

    // Combine and sort alerts by date
    alerts.sort((a, b) => new Date(b.fecha_alerta) - new Date(a.fecha_alerta));

    res.json(alerts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
