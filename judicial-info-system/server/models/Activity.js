import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  actorId: { type: String, default: 'Unknown' },
  actorRole: { type: String, default: 'Unknown' },
  action: { type: String, required: true },
  targetType: { type: String, default: '' },
  targetId: { type: String, default: '' },
  details: { type: Object, default: {} },
  at: { type: Date, default: () => new Date() },
});

ActivitySchema.index({ at: -1 });
ActivitySchema.index({ actorRole: 1, actorId: 1, action: 1 });
ActivitySchema.index({ targetType: 1, targetId: 1 });

export default mongoose.model('Activity', ActivitySchema);
