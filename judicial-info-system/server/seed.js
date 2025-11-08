import 'dotenv/config';
import mongoose from 'mongoose';
import Case from './models/Case.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

async function run() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');
  await mongoose.connect(MONGODB_URI);

  const existing = await Case.countDocuments();
  if (existing > 0) {
    console.log('Cases already seeded. Skipping.');
    return process.exit(0);
  }

  const sampleCases = [
    { id: 'C001', title: 'Robbery at Main Street', type: 'Criminal', court: 'High Court', judge: 'Judge A', lawyer: 'Lawyer X', status: 'Pending', accused: ['John Doe', 'Jane Smith'], evidence: [], hearingDates: ['2025-11-15'], registeredBy: 'R00001', description: 'Armed robbery case focusing on two suspects.' },
    { id: 'C002', title: 'Property Dispute', type: 'Civil', court: 'District Court', judge: 'Judge B', lawyer: 'Lawyer Y', status: 'Ongoing', accused: ['Alice Brown'], evidence: [], hearingDates: ['2025-11-20'], registeredBy: 'R00001', description: 'Land ownership disagreement between parties.' },
    { id: 'C003', title: 'Traffic Violation', type: 'Criminal', court: 'Magistrate Court', judge: 'Judge C', lawyer: 'Lawyer Z', status: 'Resolved', accused: ['Bob White'], evidence: [], hearingDates: ['2025-10-30'], registeredBy: 'R00001', description: 'Case regarding repeated speeding violations.' },
  ];

  await Case.insertMany(sampleCases);
  console.log('Seeded cases:', sampleCases.length);

  const adminExists = await User.findOne({ email: 'admin@example.com' });
  if (!adminExists) {
    const passwordHash = await bcrypt.hash('AdminPass123!', 10);
    await User.create({ fullName: 'System Admin', email: 'admin@example.com', passwordHash, role: 'Registrar', bio: 'Auto seeded', id: 'R00001' });
    console.log('Seeded admin user (password: AdminPass123!).');
  }

  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
