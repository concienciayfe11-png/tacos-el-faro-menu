import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? null;
  return NextResponse.json({
    url_present: !!url,
    url_value: url,
    key_present: !!key,
    key_length: key?.length ?? 0,
    key_prefix: key?.slice(0, 12) ?? null,
    vercel_env: process.env.VERCEL_ENV ?? null,
  });
}
