/**
 * Multicard payment gateway helper.
 *
 * Flow:
 *   1. getToken()       — POST /auth  → JWT (cached until expiry)
 *   2. createInvoice()  — POST /payment/invoice → checkout_url
 *   3. verifyCallbackSign() — verify md5(store_id + invoice_id + amount + secret)
 */

import { createHash } from "crypto";

// ─── Config ──────────────────────────────────────────────────────────────────

const API_URL    = process.env.MULTICARD_API_URL   ?? "https://dev-mesh.multicard.uz";
const APP_ID     = process.env.MULTICARD_APP_ID    ?? "";
const SECRET     = process.env.MULTICARD_SECRET    ?? "";
const STORE_ID   = Number(process.env.MULTICARD_STORE_ID ?? "6");

// ─── Token cache (server-side, per-process) ──────────────────────────────────

let cachedToken: string | null = null;
let tokenExpiry = 0; // unix ms

export async function getToken(): Promise<string> {
  // Return cached token if still valid (with 60 s margin)
  if (cachedToken && Date.now() < tokenExpiry - 60_000) {
    return cachedToken;
  }

  const res = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ application_id: APP_ID, secret: SECRET }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[multicard] auth failed:", res.status, text);
    throw new Error(`Multicard auth failed: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = data.token as string;

  // Parse expiry — the API returns an ISO date string
  if (data.expiry) {
    tokenExpiry = new Date(data.expiry).getTime();
  } else {
    // Fallback: cache for 50 minutes
    tokenExpiry = Date.now() + 50 * 60 * 1000;
  }

  return cachedToken;
}

// ─── Create invoice ──────────────────────────────────────────────────────────

export interface InvoiceParams {
  /** Our booking / order id */
  invoiceId: string;
  /** Amount in TIYIN (1 sum = 100 tiyin) */
  amount: number;
  /** Language: "ru" | "uz" | "en" */
  lang: string;
  /** URL to redirect customer on success */
  returnUrl: string;
  /** URL to redirect customer on error */
  returnErrorUrl: string;
  /** Server callback URL */
  callbackUrl: string;
}

export interface InvoiceResult {
  checkoutUrl: string;
  [key: string]: unknown;
}

export async function createInvoice(params: InvoiceParams): Promise<InvoiceResult> {
  const token = await getToken();

  const body = {
    store_id: STORE_ID,
    amount: params.amount,
    invoice_id: params.invoiceId,
    lang: params.lang === "uz" ? "uz" : params.lang === "en" ? "en" : "ru",
    return_url: params.returnUrl,
    return_error_url: params.returnErrorUrl,
    callback_url: params.callbackUrl,
    ofd: [
      {
        qty: 1,
        price: params.amount,
        mxik: "10604001001000000",
        total: params.amount,
        package_code: "1506113",
        name: "Аренда автомобиля",
      },
    ],
  };

  const res = await fetch(`${API_URL}/payment/invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[multicard] createInvoice failed:", res.status, text);
    throw new Error(`Multicard createInvoice failed: ${res.status}`);
  }

  const data = await res.json();

  if (!data.checkout_url) {
    console.error("[multicard] no checkout_url in response:", data);
    throw new Error("Multicard: missing checkout_url");
  }

  return { checkoutUrl: data.checkout_url, ...data };
}

// ─── Verify callback sign ────────────────────────────────────────────────────

export interface CallbackPayload {
  store_id: number;
  amount: number;
  invoice_id: string;
  billing_id: string;
  payment_time: string;
  phone: string;
  card_pan: string;
  ps: string;
  card_token: string;
  uuid: string;
  receipt_url: string;
  sign: string;
}

/**
 * Verify the callback signature.
 * sign = md5(store_id + invoice_id + amount + secret)
 *
 * All values are concatenated as strings without separators.
 */
export function verifyCallbackSign(data: CallbackPayload): boolean {
  const raw = `${data.store_id}${data.invoice_id}${data.amount}${SECRET}`;
  const expected = createHash("md5").update(raw).digest("hex");
  return expected === data.sign;
}
