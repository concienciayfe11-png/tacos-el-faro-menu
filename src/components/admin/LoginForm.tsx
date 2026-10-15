"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PasswordInput } from "./PasswordInput";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-11 w-full rounded-md border border-stone-300 px-3"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">Contraseña</label>
        <PasswordInput
          value={password}
          onChange={setPassword}
          required
          className="min-h-11 w-full rounded-md border border-stone-300 py-2 pl-3 pr-10"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="min-h-11 w-full rounded-md bg-stone-900 font-medium text-white disabled:opacity-50"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
