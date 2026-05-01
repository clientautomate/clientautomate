"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    async function confirm() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
    confirm();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-gray-500">Confirming your account...</p>
      </div>
    </div>
  );
}
