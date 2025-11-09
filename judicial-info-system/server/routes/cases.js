import express from 'express';
import Case from '../models/Case.js';
import Activity from '../models/Activity.js';

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
  await Activity.create({ actorId: registeredBy || 'Unknown', actorRole: 'Registrar', action: 'CASE_REGISTER', targetType: 'Case', targetId: c.id, details: { title, type, court } });
  res.status(201).json(c);
});

// Update case
router.patch('/:id', async (req, res) => {
  const c = await Case.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  await Activity.create({ actorId: req.body.updatedBy || 'Unknown', actorRole: req.body.updatedByRole || 'Registrar', action: 'CASE_UPDATE', targetType: 'Case', targetId: c.id, details: req.body });
  res.json(c);
});

// Assign lawyer
router.post('/:id/assign-lawyer', async (req, res) => {
  const { lawyer } = req.body;
  const c = await Case.findOneAndUpdate({ id: req.params.id }, { lawyer }, { new: true });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  await Activity.create({ actorId: 'Judge', actorRole: 'Judge', action: 'LAWYER_ASSIGNED', targetType: 'Case', targetId: c.id, details: { lawyer } });
  res.json(c);
});

// Schedule hearing
router.post('/:id/hearings', async (req, res) => {
  const { date } = req.body;
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  c.hearingDates.push(date);
  await c.save();
  await Activity.create({ actorId: 'Judge', actorRole: 'Judge', action: 'HEARING_ADDED', targetType: 'Case', targetId: c.id, details: { date } });
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
  await Activity.create({ actorId: 'Police', actorRole: 'Police', action: 'EVIDENCE_ADDED', targetType: 'Case', targetId: c.id, details: evidenceItem });
  res.json(evidenceItem);
});

// Deliver judgement
router.post('/:id/judgement', async (req, res) => {
  const { text } = req.body;
  const c = await Case.findOneAndUpdate({ id: req.params.id }, { judgement: text, status: 'Resolved' }, { new: true });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  await Activity.create({ actorId: 'Judge', actorRole: 'Judge', action: 'JUDGEMENT_DELIVERED', targetType: 'Case', targetId: c.id, details: { status: c.status } });
  res.json(c);
});

// Submit case report
router.post('/:id/reports', async (req, res) => {
  const { report } = req.body;
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  c.reports.push(report);
  await c.save();
  await Activity.create({ actorId: 'Lawyer', actorRole: 'Lawyer', action: 'REPORT_SUBMITTED', targetType: 'Case', targetId: c.id, details: { size: (report||'').length } });
  res.json(c.reports);
});

// Download latest report (simple JSON -> prompts browser download)
router.get('/:id/reports/download', async (req, res) => {
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  if (!c.reports || c.reports.length === 0) {
    return res.status(404).json({ error: 'No reports available for this case' });
  }
  const latest = c.reports[c.reports.length - 1];
  const payload = {
    caseId: c.id,
    title: c.title,
    status: c.status,
    judge: c.judge,
    lawyer: c.lawyer,
    latestReport: latest,
    generatedAt: new Date().toISOString(),
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=${c.id}-report.json`);
  res.send(JSON.stringify(payload, null, 2));
});

// Download full case summary (details for user dashboard)
router.get('/:id/download', async (req, res) => {
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  const summary = {
    caseId: c.id,
    title: c.title,
    type: c.type,
    court: c.court,
    judge: c.judge,
    lawyer: c.lawyer,
    status: c.status,
    description: c.description,
    accused: c.accused,
    hearingDates: c.hearingDates,
    evidenceCount: c.evidence.length,
    reportsCount: c.reports.length,
    hasJudgement: Boolean(c.judgement),
    registeredBy: c.registeredBy || null,
    generatedAt: new Date().toISOString(),
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=${c.id}-summary.json`);
  res.send(JSON.stringify(summary, null, 2));
});

// Upload documents (bulk simulated)
router.post('/:id/documents', async (req, res) => {
  const { documents } = req.body; // expect array
  const c = await Case.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ error: 'Case not found' });
  c.documents.push(...documents);
  await c.save();
  await Activity.create({ actorId: 'Lawyer', actorRole: 'Lawyer', action: 'DOCUMENTS_UPLOADED', targetType: 'Case', targetId: c.id, details: { count: (documents||[]).length } });
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
  await Activity.create({ actorId: from || 'User', actorRole: 'User', action: 'MESSAGE_SENT', targetType: 'Case', targetId: c.id, details: { from } });
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
  await Activity.create({ actorId: userId || 'User', actorRole: 'User', action: 'REQUEST_SUBMITTED', targetType: 'Case', targetId: c.id, details: { request } });
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
  await Activity.create({ actorId: 'Registrar', actorRole: 'Registrar', action: 'SCHEDULE_ADDED', targetType: 'Case', targetId: c.id, details: sched });
  res.json(sched);
});

export default router;
