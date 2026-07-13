export const ADMIN_SESSION_COOKIE = "frdm_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("ADMIN_PASSWORD non configurata");
  }
  return secret;
}

export async function checkAdminPassword(password: string): Promise<boolean> {
  return password === getSecret();
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS;
  const key = await getKey(getSecret());
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(String(expires))
  );
  return `${expires}.${toHex(signature)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expiresStr, signature] = token.split(".");
  if (!expiresStr || !signature) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  try {
    const key = await getKey(getSecret());
    const expectedSignature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(expiresStr)
    );
    return toHex(expectedSignature) === signature;
  } catch {
    return false;
  }
}
