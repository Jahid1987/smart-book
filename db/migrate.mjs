// db/migrate.mjs
import fs from "fs";
import path from "path";
import { sql } from "../lib/db_connection.ts"; // আপনার ডাটাবেস সংযোগ ফাইল অনুযায়ী পরিবর্তন করুন

async function runMigrations() {
  try {
    // ১. কোন কোন ফাইল রান হয়েছে তা মনে রাখার জন্য একটি ট্র্যাকিং টেবিল (যদি না থাকে)
    await sql`
      CREATE TABLE IF NOT EXISTS public._migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // ২. ইতিমধ্যে রান হওয়া ফাইলগুলোর নাম ডাটাবেস থেকে আনা
    const executedRows = await sql`SELECT filename FROM public._migrations`;
    const executedFiles = new Set(executedRows.map((row) => row.filename));

    // ৩. আপনার ফোল্ডারের সব .sql ফাইল পড়া (আপনার ফোল্ডার পাথ অনুযায়ী দিন)
    const dbDir = path.join(process.cwd(), "db");
    const files = fs
      .readdirSync(dbDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    let newCount = 0;

    for (const file of files) {
      // যদি ফাইলটি আগে রান হয়ে থাকে, তবে স্কিপ (Skip) করবে!
      if (executedFiles.has(file)) {
        console.log(`⏭️  Skipped (আগেই রান হয়েছে): ${file}`);
        continue;
      }

      console.log(`⏳ নতুন মাইগ্রেশন রান হচ্ছে: ${file} ...`);
      const filePath = path.join(dbDir, file);
      const sqlContent = fs.readFileSync(filePath, "utf8");

      // ট্রানজেকশনের ভেতরে রান করা (যাতে ভুল থাকলে অর্ধেক রান না হয়)
      await sql.begin(async (tx) => {
        await tx.unsafe(sqlContent);
        await tx`INSERT INTO public._migrations (filename) VALUES (${file})`;
      });

      console.log(`✅ সফলভাবে সম্পন্ন: ${file}`);
      newCount++;
    }

    if (newCount === 0) {
      console.log("🎉 সব স্কিমা আপ-টু-ডেট আছে! নতুন কিছু রান করার নেই।");
    }
  } catch (error) {
    console.error("❌ মাইগ্রেশন ব্যর্থ হয়েছে:", error.message);
  } finally {
    await sql.end();
  }
}

runMigrations();
