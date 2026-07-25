"use server";

const API = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

interface SubscribeResult {
  success: boolean;
  message?: string;
}

export async function subscribeNewsletterAction(
  email: string,
): Promise<SubscribeResult> {
  if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
    return { success: false, message: "Email non valida" };
  }

  try {
    const res = await fetch(`${API}/api/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        success: false,
        message: data?.message ?? "Errore durante l'iscrizione",
      };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Errore di connessione. Riprova." };
  }
}
