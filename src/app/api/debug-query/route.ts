import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error, status, statusText } = await supabase
      .from("restaurants")
      .select("*")
      .eq("slug", "tacos-el-faro")
      .maybeSingle();

    return NextResponse.json({ data, error, status, statusText });
  } catch (e) {
    return NextResponse.json(
      { caught_error: e instanceof Error ? e.message : String(e), stack: e instanceof Error ? e.stack : null },
      { status: 500 }
    );
  }
}
