"use client";

import Link from "next/link";
import type { Restaurant } from "@/types/database";
import { createClient } from "@/lib/supabase/client";

type Props = {
  restaurants: Restaurant[];
};

export function RestaurantPicker({ restaurants }: Props) {
  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin";
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">Tus restaurantes</h1>
        <button onClick={logout} className="text-sm text-stone-500 underline">
          Salir
        </button>
      </div>
      {restaurants.length === 0 && (
        <p className="text-sm text-stone-500">
          Todavía no hay restaurantes. Crea uno directo en la tabla <code>restaurants</code> de Supabase.
        </p>
      )}
      <ul className="space-y-2">
        {restaurants.map((r) => (
          <li key={r.id}>
            <Link
              href={`/admin/${r.id}`}
              className="block rounded-lg border border-stone-200 px-4 py-3 hover:border-stone-400"
            >
              <span className="font-medium">{r.name}</span>
              <span className="ml-2 text-sm text-stone-400">/{r.slug}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
