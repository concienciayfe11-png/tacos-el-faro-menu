import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    const res = await fetch(`${url}/rest/v1/restaurants?select=*&slug=eq.tacos-el-faro`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });
    const body = await res.json();
    return NextResponse.json({ status: res.status, body });
  } catch (e) {
    return NextResponse.json(
      { caught_error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
