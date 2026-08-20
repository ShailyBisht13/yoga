/**
 * Creates (or updates the password of) an admin user.
 * Run with:  npm run create-admin -- admin@example.com yourpassword
 */
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db.js';
import Admin from '../src/models/Admin.js';
import mongoose from 'mongoose';

async function main() {
  const [, , email, password] = process.argv;

  if (!email || !password) {
    console.error('Usage: npm run create-admin -- <email> <password>');
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 10);
  const normalizedEmail = email.toLowerCase().trim();

  const admin = await Admin.findOneAndUpdate(
    { email: normalizedEmail },
    { email: normalizedEmail, passwordHash },
    { upsert: true, new: true }
  );

  console.log(`Admin ready: ${admin.email}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
