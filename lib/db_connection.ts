// src/lib/db.ts
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

// Next.js-এ বারবার Hot Reload হওয়ার সময় যেন নতুন নতুন কানেকশন তৈরি হয়ে
// কানেকশন লিমিট শেষ না হয়ে যায়, তাই global অবজেক্টে ক্যাশ (Cache) করে রাখা হচ্ছে:
const globalForDb = globalThis as typeof globalThis & {
  sql?: ReturnType<typeof postgres>;
};

export const sql =
  globalForDb.sql ??
  postgres(connectionString, {
    max: 10,          // একসাথে সর্বোচ্চ ১০টি কানেকশন পুল (Pool) করে রাখবে
    idle_timeout: 20, // ২০ সেকেন্ড কাজ না থাকলে অকেজো কানেকশন বন্ধ করে দেবে
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.sql = sql;
}