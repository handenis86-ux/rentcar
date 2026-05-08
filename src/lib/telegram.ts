// Telegram notifier for booking & lead alerts.
// Silently no-ops if TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing,
// so the action never fails when env vars aren't configured.

const ESCAPE_RE = /[&<>]/g;
const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };

export function escapeHtml(s: string): string {
  return s.replace(ESCAPE_RE, (c) => ESCAPES[c]);
}

export async function notifyAdmin(html: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[telegram] sendMessage failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[telegram] fetch error:", err);
  }
}
