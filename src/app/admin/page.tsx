import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/admin/LoginForm";
import { RestaurantPicker } from "@/components/admin/RestaurantPicker";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className="mb-6 font-serif text-2xl font-bold">Panel del dueño</h1>
        <LoginForm />
      </main>
    );
  }

  const { data: restaurants } = await supabase.from("restaurants").select("*").order("name");

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-10">
      <RestaurantPicker restaurants={restaurants ?? []} />
    </main>
  );
}
