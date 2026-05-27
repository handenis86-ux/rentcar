import { google, searchconsole_v1 } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { authenticate } from "@google-cloud/local-auth";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, ".env");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=");
      if (key && value && !process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

const siteUrl = process.env.GSC_SITE_URL;
if (!siteUrl) {
  console.error("Error: GSC_SITE_URL not set in .env");
  process.exit(1);
}

const SECRETS_DIR =
  process.env.SECRETS_DIR || "D:\\projects\\rentcar2\\.secrets";
const CLIENT_PATH = join(SECRETS_DIR, "oauth-client.json");
const TOKEN_PATH = join(SECRETS_DIR, "oauth-token.json");

const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
];

let cachedAuth: OAuth2Client | null = null;

async function getOAuthClient(): Promise<OAuth2Client> {
  if (cachedAuth) return cachedAuth;

  if (!existsSync(CLIENT_PATH)) {
    console.error(`OAuth client JSON not found at ${CLIENT_PATH}`);
    process.exit(1);
  }

  const credentials = JSON.parse(readFileSync(CLIENT_PATH, "utf-8"));
  const installed = credentials.installed || credentials.web;
  const { client_id, client_secret, redirect_uris } = installed;

  if (existsSync(TOKEN_PATH)) {
    const client = new OAuth2Client(
      client_id,
      client_secret,
      redirect_uris?.[0]
    );
    client.setCredentials(JSON.parse(readFileSync(TOKEN_PATH, "utf-8")));
    cachedAuth = client;
    return client;
  }

  console.log("Opening browser for OAuth authorization…\n");
  const client = (await authenticate({
    keyfilePath: CLIENT_PATH,
    scopes: SCOPES,
  })) as unknown as OAuth2Client;

  writeFileSync(TOKEN_PATH, JSON.stringify(client.credentials, null, 2));
  console.log(`Token saved at ${TOKEN_PATH}\n`);
  cachedAuth = client;
  return client;
}

export async function getSCClient(): Promise<searchconsole_v1.Searchconsole> {
  const auth = await getOAuthClient();
  return google.searchconsole({ version: "v1", auth });
}

export const SITE = siteUrl;

export function getDateRange(days: number) {
  const end = new Date();
  end.setDate(end.getDate() - 2);
  const start = new Date(end);
  start.setDate(end.getDate() - days + 1);
  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

export const fmtN = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(n));

export const fmtPct = (n: number) => `${(n * 100).toFixed(2)}%`;

export const fmtPos = (n: number) => n.toFixed(1);

export const RENTAL_INTENT_PATTERNS = [
  /аренд[аы]?\s*(авто|машин)/i,
  /прокат\s*(авто|машин)/i,
  /rent\s*a?\s*car/i,
  /car\s*rental/i,
  /hire\s*car/i,
  /авто\s*на\s*прокат/i,
  /ijar[ao]/i,
  /mashina\s*ijarasi/i,
  /avtomobil\s*ijarasi/i,
  /ташкент.*авто/i,
  /tashkent.*car/i,
  /uzbekistan.*rent/i,
  /самарканд.*авто/i,
  /samarkand.*car/i,
  /бухар.*авто/i,
  /bukhara.*car/i,
];
