import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

// Query activities with optional filters: role, actorId, targetType, targetId, limit
router.get('/', async (req, res) => {
  const { role, actorId, targetType, targetId, limit = 100 } = req.query;
  const q = {};
  if (role) q.actorRole = role;
  if (actorId) q.actorId = actorId;
  if (targetType) q.targetType = targetType;
  if (targetId) q.targetId = targetId;
  const items = await Activity.find(q).sort({ at: -1 }).limit(Math.min(Number(limit)||100, 1000));
  res.json(items);
});

// Create custom activity (used for client-side events like payment success)
router.post('/', async (req, res) => {
  try {
    const { actorId='Unknown', actorRole='System', action, targetType='', targetId='', details={} } = req.body || {};
    if (!action) return res.status(400).json({ error: 'action required' });
    const act = await Activity.create({ actorId, actorRole, action, targetType, targetId, details });
    res.status(201).json(act);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to create activity' });
  }
});

export default router;
