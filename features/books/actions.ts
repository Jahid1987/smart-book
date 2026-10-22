// src/app/admin/actions.ts
"use server";

import { sql } from "@/lib/db_connection";
import { revalidatePath } from "next/cache";

// ১. নতুন বই যোগ করার অ্যাকশন
export async function createBook(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const subject = formData.get("subject") as string;
  const class_level = formData.get("class_level") as string;
  const subject_code = (formData.get("subject_code") as string) || null;

  await sql`
    INSERT INTO public.books (title, slug, subject, class_level, subject_code, is_published)
    VALUES (${title}, ${slug}, ${subject}, ${class_level}, ${subject_code}, true)
  `;
  revalidatePath("/admin");
}

// ২. নতুন অধ্যায় যোগ করার অ্যাকশন
export async function createChapter(formData: FormData) {
  const book_id = Number(formData.get("book_id"));
  const serial = formData.get("serial") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const sort_order = Number(formData.get("sort_order") || 1);

  await sql`
    INSERT INTO public.chapters (book_id, serial, title, slug, sort_order, is_published)
    VALUES (${book_id}, ${serial}, ${title}, ${slug}, ${sort_order}, true)
  `;
  revalidatePath("/admin");
}

// ৩. নতুন Topic বা Subtopic যোগ করার অ্যাকশন
export async function createContentNode(formData: FormData) {
  const chapter_id = Number(formData.get("chapter_id"));
  const rawParentId = formData.get("parent_id") as string;
  
  // যদি parent_id খালি থাকে তবে এটি Main Topic (NULL), আর থাকলে Subtopic
  const parent_id = rawParentId ? Number(rawParentId) : null;
  const node_type = parent_id ? "subtopic" : "topic";

  const serial = formData.get("serial") as string;
  const title = formData.get("title") as string;
  const importance = (formData.get("importance") as string) || "medium";
  const content = formData.get("content") as string;
  const sort_order = Number(formData.get("sort_order") || 1);

  await sql`
    INSERT INTO public.content_nodes (
      chapter_id, parent_id, serial, title, node_type, importance, content, sort_order
    )
    VALUES (
      ${chapter_id}, ${parent_id}, ${serial}, ${title}, ${node_type}, ${importance}, ${content}, ${sort_order}
    )
  `;
  revalidatePath("/admin");
}