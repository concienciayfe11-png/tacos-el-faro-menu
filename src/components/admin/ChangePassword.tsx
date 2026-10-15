"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PasswordInput } from "./PasswordInput";

export function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
    setPassword("");
    setConfirm("");
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-sm text-stone-500 underline">
        Cambiar contraseña
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <PasswordInput value={password} onChange={setPassword} placeholder="Nueva contraseña" required minLength={8} />
      <PasswordInput value={confirm} onChange={setConfirm} placeholder="Repetir contraseña" required minLength={8} />
      <button
        type="submit"
        disabled={loading}
        className="min-h-11 rounded-md bg-stone-900 px-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Guardando…" : "Guardar"}
      </button>
      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setError(null);
          setSuccess(false);
        }}
        className="text-sm text-stone-500 underline"
      >
        Cancelar
      </button>
      {error && <p className="w-full text-sm text-red-600">{error}</p>}
      {success && <p className="w-full text-sm text-green-600">Contraseña actualizada ✓</p>}
    </form>
  );
}
