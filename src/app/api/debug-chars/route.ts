import { NextResponse } from "next/server";

function findBadChars(label: string, value: string | undefined) {
  if (!value) return { label, present: false };
  const bad: { index: number; code: number; char: string }[] = [];
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code > 255) {
      bad.push({ index: i, code, char: value[i] });
    }
  }
  return {
    label,
    present: true,
    length: value.length,
    bad_chars: bad,
    context_around_first_bad:
      bad.length > 0
        ? JSON.stringify(value.slice(Math.max(0, bad[0].index - 3), bad[0].index + 4))
        : null,
  };
}

export async function GET() {
  return NextResponse.json({
    url: findBadChars("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    key: findBadChars("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  });
}
