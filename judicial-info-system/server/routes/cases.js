import express from 'express';
import Case from '../models/Case.js';

const router = express.Router();

// List all cases
router.get('/', async (_req, res) => {
  const cases = await Case.find();
  res.json(cases);
});

// Get single case by id
router.get('/:id', async (req, res) => {
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  res.json(c);
});

// Register new case (Registrar or Police)
router.post('/', async (req, res) => {
  const { title, type, court, judge, lawyer, accused, description, registeredBy } = req.body;
  const nextIndex = await Case.countDocuments();
  const newId = `C${String(nextIndex + 1).padStart(3, '0')}`;
  const c = await Case.create({ id: newId, title, type, court, judge, lawyer, status: 'Pending', accused, description, registeredBy });
  res.status(201).json(c);
});

// Update case
router.patch('/:id', async (req, res) => {
  const c = await Case.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  res.json(c);
});

// Assign lawyer
router.post('/:id/assign-lawyer', async (req, res) => {
  const { lawyer } = req.body;
  const c = await Case.findOneAndUpdate({ id: req.params.id }, { lawyer }, { new: true });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  res.json(c);
});

// Schedule hearing
router.post('/:id/hearings', async (req, res) => {
  const { date } = req.body;
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  c.hearingDates.push(date);
  await c.save();
  res.json(c);
});

// Upload / add evidence
router.post('/:id/evidence', async (req, res) => {
  const { name } = req.body;
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  const evidenceItem = { id: `E${Date.now()}`, name, uploadedAt: new Date().toISOString().slice(0,10) };
  c.evidence.push(evidenceItem);
  await c.save();
  res.json(evidenceItem);
});

// Deliver judgement
router.post('/:id/judgement', async (req, res) => {
  const { text } = req.body;
  const c = await Case.findOneAndUpdate({ id: req.params.id }, { judgement: text, status: 'Resolved' }, { new: true });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  res.json(c);
});

// Submit case report
router.post('/:id/reports', async (req, res) => {
  const { report } = req.body;
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  c.reports.push(report);
  await c.save();
  res.json(c.reports);
});

// Upload documents (bulk simulated)
router.post('/:id/documents', async (req, res) => {
  const { documents } = req.body; // expect array
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  c.documents.push(...documents);
  await c.save();
  res.json(c.documents);
});

// Messages (communication)
router.post('/:id/messages', async (req, res) => {
  const { from, text } = req.body;
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  const message = { from, text, at: new Date().toISOString() };
  c.messages.push(message);
  await c.save();
  res.json(message);
});

// User request
router.post('/:id/requests', async (req, res) => {
  const { userId, request } = req.body;
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  const item = { userId, request, at: new Date().toISOString() };
  c.requests.push(item);
  await c.save();
  res.json(item);
});

// Registrar schedule
router.post('/:id/schedules', async (req, res) => {
  const { date, details } = req.body;
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  const sched = { date, details };
  c.schedules.push(sched);
  await c.save();
  res.json(sched);
});

export default router;
